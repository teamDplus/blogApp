//登録情報を確認するモーダル
const SignupCheckModal = ({ isOpen, onClose, onConfirm, email, password }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal__content">
                <h2>登録情報の確認</h2>
                <p>以下の情報で登録しますか？</p>
                <p><strong>メールアドレス:</strong> {email}</p>
                <p><strong>パスワード:</strong> {password}</p>
                <button onClick={onConfirm} className="modal__button--yes">はい</button>
                <button onClick={onClose} className="modal__button--no">いいえ</button>
            </div>
        </div>
    );
};
export default SignupCheckModal