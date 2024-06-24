import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../../context/AppContext';

export const FollowButton = ({link,text,className}) => {
    const { user } = useContext(AppContext);

  return (
    <Link to={user ? link : "/login"} className={className}>
        <p>{text}</p>
    </Link>
  )
}
