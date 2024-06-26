// 隣接するdata（a,b）のcreatedAt比較し、新しい投稿であれば前に配置、古ければ後ろに配置
const sortPosts = (postsData, sortType) => {
  return postsData.sort((a, b) => {
    //新しい順・古い順が選択されている場合
    if (sortType === "new" || sortType === "old") {
      const dateA = a.createdAt ? a.createdAt.toDate() : new Date(0); // もしcreatedAtが存在しない場合、デフォルト値を設定
      const dateB = b.createdAt ? b.createdAt.toDate() : new Date(0); // もしcreatedAtが存在しない場合、デフォルト値を設定
      return sortType === "new" ? dateB - dateA : dateA - dateB;
    }

    //いいね順が選択されている場合
    else {
      const dateA = a.likers ? a.likers.length : 0; // likersの数（いいね数）によって並び替える、値がない場合は0
      const dateB = b.likers ? b.likers.length : 0;
      return dateB - dateA;
    }
  })
}

export default sortPosts;