import React from 'react';
import { Link } from 'react-router-dom';
import useFollowData from '../../hooks/useFollowData';

const FollowList = ({ followType }) => {
    const users = useFollowData(followType);

    return (
        <div className='follow'>
            <h1>{followType === "following" ? "フォロー一覧" : "フォロワー一覧"}</h1>
            <div className='follow__users'>
                {users.length > 0 ? (
                    users.map((user) => (
                        <Link to={`/${user.userId}`} className='follow__user' key={user.userId}>
                            <img src={user.profilePictureUrl} alt="" />
                            <p>{user.userName}</p>
                        </Link>
                    ))
                ) : (
                    <p>{followType === "following" ? "フォローしているユーザーはいません" : "フォロワーはいません"}</p>
                )}
            </div>
        </div>
    );
};

export default FollowList;
