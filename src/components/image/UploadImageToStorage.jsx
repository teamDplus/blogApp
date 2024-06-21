import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

//新しいプロフィール画像をStorageに保存する
export const UploadImageToStorage = (fileObject, storageFilePath) => {
    return new Promise((resolve, reject) => {
        if (!fileObject) return;
        const storage = getStorage();
        //storageの保存先を指定
        const storageRef = ref(storage, storageFilePath + fileObject.name);
        //firebaseStorageに画像を保存
        const uploadImage = uploadBytesResumable(storageRef, fileObject);

        // アップロードの進行状態を取得
        uploadImage.on("state_changed", (snapshot) => {
        },
            (error) => {
                console.log(error);
                reject(error);
            },
            () => {
                // アップロード完了時にダウンロードURLを取得し、画面に表示する
                getDownloadURL(uploadImage.snapshot.ref)
                .then((url) => {
                  resolve(url);
                })
                .catch((error) => {
                  console.log(error);
                  reject(error);
                });
            })
    });
};