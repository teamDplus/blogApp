import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../context/AppContext';

export const HeaderButton = ({icon,text,link}) => {
    const { user } = useContext(AppContext);

  return (
    <Link to={user ? link : "/login"} className="header__button">
        <div className="header__button-img">
            <img src={icon} alt="" />
        </div>
        <p className="header__button-text">{text}</p>
    </Link>
  )
}
