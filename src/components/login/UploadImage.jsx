import { render } from "@testing-library/react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { useState } from "react";


const UploadImage = ({ setNewProfilePicture }) => {
    const [loading, setLoading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const [uploadedSrc, setUploadedSrc] = useState("");

    const uploadFileToStorage = (e) => {
        const storage = getStorage();
        //firebaseStorage内に保存するファイルパスを指定
        const imageFile = e.target.files[0];
        const storageRef = ref(storage, "images/" + imageFile.name);

        //firebaseStorageに画像を保存
        const uploadImage = uploadBytesResumable(storageRef, imageFile);

        // アップロードの進行状態を取得
        uploadImage.on("state_changed", (snapshot) => {
            //アップロード中は「アップロード中…を表示」
            setLoading(true);
        },
        (error) => {
            console.log(error);
        },
        () => {
            // アップロード完了時にダウンロードURLを取得し、画面に表示する
            getDownloadURL(uploadImage.snapshot.ref).then((url) => {
                setUploadedSrc(url);
                setNewProfilePicture(url);
                setLoading(false);
                setIsUploaded(true);
            }).catch((error) => {
                console.log(error);
                setLoading(false);
            });
        })

    }

    return (
        <>
            {loading ? (
                <p>アップロード中…</p>
            ) : (
                isUploaded && (
                    <img src={uploadedSrc} alt="" />
                )
            )}
            <div className="changeUserInfo__profilePicture">
                <label htmlFor="profilePicture" className="">プロフィール画像</label>
                <input onChange={uploadFileToStorage} accept=".png, .jpg, .jpeg" type="file" name="profilePicture" id="profilePicture" className="" placeholder="" required="" />
            </div>
        </>
    )
}
export default UploadImage;