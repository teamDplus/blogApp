// 隣接するdata（a,b）のcreatedAt比較し、新しい投稿であれば前に配置、古ければ後ろに配置
const sortPosts = (postsData, sortType) => {
    return postsData.sort((a, b) => {
      const dateA = a.createdAt ? a.createdAt.toDate() : new Date(0); // もしcreatedAtが存在しない場合、デフォルト値を設定
      const dateB = b.createdAt ? b.createdAt.toDate() : new Date(0); // もしcreatedAtが存在しない場合、デフォルト値を設定
      return sortType === "new" ? dateB - dateA : dateA - dateB;
    });
  };
  
  export default sortPosts;