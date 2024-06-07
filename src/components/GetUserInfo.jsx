import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";
import ChangeUserInfoModal from "./ChangeUserInfoModal"
import "../css/components/GetUserInfo.css"

//ログイン中のユーザ情報を取得
const GetUserInfo = () => {
    const [displayName, setDisplayName] = useState('');
    const [nickName, setNickName] = useState('');
    const [userId, setUserId] = useState('');
    const [isSetModalOpen, setIsSetModalOpen] = useState(false);
    const [textNoNickName, setTextNoNickName] = useState(false);

    useEffect(() => {
        // 表示名の設定（nickNameが登録されていれば表示、されていなければname:ユーザ名を表示）
        const getDisplayName = async () => {
            // ログインユーザの取得
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                // uidから該当するユーザ情報をデータベース名:userから取得
                const q = query(collection(db, 'users'), where('userId', '==', user.uid));
                const querySnapshot = await getDocs(q);


                querySnapshot.forEach((doc) => {
                    //nickNameを取得
                    setNickName(doc.data().nickName);
                    //ユーザidを取得
                    setUserId(doc.data().userId);
                    // nickNameが登録されていればnickNameを表示
                    if (doc.data().nickName != null) {
                        setDisplayName(doc.data().nickName);
                        setTextNoNickName(false)
                    }
                    // nickNameが登録されていない場合、name:ユーザ名を表示
                    // 現在はnameがなければuserIdを表示、サインアップでnameを自動登録(初期値userId)されるようにしたら修正
                    else if (doc.data().name != null) {
                        setDisplayName(doc.data().nickName);
                        setTextNoNickName(false)
                    }
                    else {
                        setDisplayName(doc.data().userId);
                        //ニックネームの設定を促すメッセージを表示
                        setTextNoNickName(true)
                    }
                });
            }
        };

        getDisplayName();
    }, []);

    // 「ユーザ情報の変更」をクリックしたときに変更内容を入力するモーダルを表示
    const openSetModal = (e) => {
        e.preventDefault();
        setIsSetModalOpen(true);
    };
    // 入力用モーダルを閉じる
    const closeSetModal = () => {
        setIsSetModalOpen(false);
    };

    return (
        <div className="mypage__user">
            <div className='mypage__user--displayName'>{displayName}</div>
            {textNoNickName != "" && (
                <div className='mypage__user--noNickName'>ニックネームが登録されていません</div>
            )}
            <div className='mypage__user--changeUserInfo'>
                <button onClick={openSetModal}>ユーザ情報の変更</button>
            </div>
            <ChangeUserInfoModal
                isSetModalOpen={isSetModalOpen}
                nickName={nickName}
                onSetModalClose={closeSetModal}
                userId={userId}
                setDisplayName={setDisplayName}
                setTextNoNickName={setTextNoNickName}
            />
        </div>
    )
};

export default GetUserInfo;