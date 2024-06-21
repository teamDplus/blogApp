import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../../css/components/LinkPost.css";

function LinkPost() {
  const pathname = useLocation().pathname;
  const [showTooltip, setShowTooltip] = useState(false);

  // CopyLinkが押されたらクリップボードにURLをコピー
  const CopyLink = async () => {
    await global.navigator.clipboard.writeText(pathname);
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 1000);
  };

  return (
    <div className="LinkPost">
      <div onClick={CopyLink}>
        <p className="LinkPost__byebye">記事を共有する</p>
      </div>
      {showTooltip && <div className="LinkPost__tooltip">コピーされました</div>}
    </div>
  );
}

export default LinkPost;
