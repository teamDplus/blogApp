import React, { useContext } from 'react'
import '../css/components/Header.css';
import { Link } from 'react-router-dom';
import AppContext from '../context/AppContext';

const Header = () => {
    const {user,loading} = useContext(AppContext);

    return (
    <div className='header'>
        <div className='header__inner'>
            <h1>Header</h1>
            <div className='header__links'>    
                <Link to={user ? `/${user.uid}` : "/login"} className="header__button">
                    <div className='header__button-img'>
                        <img src="./homeIcon.svg" alt=""/>
                    </div>
                    <p className='header__button-text'>マイページ</p>
                </Link>
                <Link to={user ? `/${user.uid}/post` : "/login"} className="header__button">
                    <div className='header__button-img'>
                        <img src="./postIcon.svg" alt=""/>
                    </div>
                    <p className='header__button-text'>ブログを投稿する</p>
                </Link>
                <Link to={user ? `/${user.uid}/drafts` : "/login"} className="header__button">
                    <div className='header__button-img'>
                        <img src="./draftsIcon.png" alt=""/>
                    </div>
                    <p className='header__button-text'>下書き一覧</p>
                </Link>
                <Link to={user ? `/${user.uid}/likes` : "/login"} className="header__button">
                    <div className='header__button-img'>
                        <img src="./likes.svg" alt=""/>
                    </div>
                    <p className='header__button-text'>いいね！履歴</p>
                </Link>
                <Link to="/" className="header__button">
                    <div className='header__button-img'>
                        <img src="./peopleIcon.svg" alt=""/>
                    </div>
                    <p className='header__button-text'>みんなの投稿</p>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Header