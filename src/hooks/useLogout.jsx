// hooks/useLogout.js
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';

const useLogout = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('サインアウトしました。');
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return { handleSignOut }; 
};

export default useLogout;
