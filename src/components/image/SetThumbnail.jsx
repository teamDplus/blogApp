import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db, } from "../../utils/firebase";
import { UploadImageToStorage } from "../image/UploadImageToStorage";

//サムネイル画像の設定
export const SetThumbnail = async (fileObject, docRef) => {
    console.log(fileObject);
    let thumbnailStorageUrl = "";
    const defaultThumbnailUrl = "https://firebasestorage.googleapis.com/v0/b/blogapp-c1052.appspot.com/o/postImages%2Fdefault%2FnoImage.PNG?alt=media&token=c7febf2c-b45e-4469-b1ce-2b232f8bd56d"

    //サムネイル画像が選択された場合
    if (fileObject) {
        //ストレージ保存先のパスを指定
        const storageFilePath = "postImages/" + docRef.id + "/thumbnail/";
        //ストレージに画像を保存、URLを取得する（非同期処理でアップロード完了を待つ）
        thumbnailStorageUrl = await UploadImageToStorage(fileObject, storageFilePath);
    }
    //選択されていない場合
    else {
        // ドキュメントを取得してthumbnailUrlが存在するか確認
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            // thumbnailUrlが既に存在する場合は処理を抜ける
            //下書きから投稿する際にdefaultThumbnailUrlに変更されてしまうため
            if (data.thumbnailUrl) {
                return
            }
        }

        //NO IMAGE画像を設定
        thumbnailStorageUrl = defaultThumbnailUrl;
    }
    // ドキュメントの参照を取得し、thumbnailUrlを追加
    const postDocRef = doc(db, "posts", docRef.id);
    //ポストのstorageにサムネイル画像のurlを追加する
    await updateDoc(postDocRef, {
        thumbnailUrl: thumbnailStorageUrl,
    });
}