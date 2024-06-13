const UploadImage = ({ newProfilePicture, setNewProfilePicture, setFileObject }) => {
    const onFileInputChange = (e) => {
        if (!e.target.files) return;
        //アップロードしたファイル情報を取得
        const fileObject = e.target.files[0];
        setFileObject(fileObject);
        if (fileObject) {
            //ここではstorageには保存せず画面に表示
            setNewProfilePicture(window.URL.createObjectURL(fileObject));
        }
    }

    return (
        <>
            <img src={newProfilePicture} alt="" />
            <div className="changeUserInfo__profilePicture">
                <label htmlFor="profilePicture" className="">プロフィール画像</label>
                <input onChange={onFileInputChange} accept=".png, .jpg, .jpeg" type="file" name="profilePicture" id="profilePicture" className="" placeholder="" required="" />
            </div>
        </>
    )
}
export default UploadImage;