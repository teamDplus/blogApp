import { useState } from 'react';

const UploadImage = ({ newProfilePicture, setNewProfilePicture, setFileObject }) => {
    const [isErrorProfilePicture, setIsErrorProfilePicture] = useState(false);
    const [errorProfilePicture, setErrorProfilePicture] = useState("");

    const onFileInputChange = (e) => {
        if (!e.target.files) return;
        //アップロードしたファイル情報を取得
        const fileObject = e.target.files[0];
        setFileObject(fileObject);
        if (fileObject) {
            const sizeLimit = 1024 * 1024 * 5; // 制限サイズ:5MB
            //ファイルサイズが5MB以上の場合
            if (fileObject.size > sizeLimit) {
                setNewProfilePicture(""); // エラーがある場合は画像を表示しない
                setIsErrorProfilePicture(true); //エラーを表示
                setErrorProfilePicture('ファイルサイズは5MB以下にしてください'); //エラーメッセージの設定
            }
            //ファイルサイズが5MB以下の場合
            else {
                //ここではstorageには保存せず画面に表示
                setNewProfilePicture(window.URL.createObjectURL(fileObject));
                setIsErrorProfilePicture(false);
            }
        }
    }

    return (
        <>
            <img src={newProfilePicture} alt="" />
            <div className="changeUserInfo__profilePicture">
                <label htmlFor="profilePicture" className="">プロフィール画像</label>
                <input
                    onChange={onFileInputChange}
                    accept=".png, .jpg, .jpeg"
                    type="file"
                    name="profilePicture"
                    id="profilePicture"
                    className=""
                    placeholder=""
                    required=""
                />
                {isErrorProfilePicture && <span className="validation-message">{errorProfilePicture}</span>}
            </div>
        </>
    )
}
export default UploadImage;