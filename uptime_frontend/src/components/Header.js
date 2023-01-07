import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {
    let {user, logoutUser, searchUrl, yourUrls, deletedUrlsList} =useContext(AuthContext)
    
  return (
    <div>
        {
          user &&(
            <header className="header">
              <h1 className="username"><a href="#">Hello, {user}</a></h1>
                <ul className="main-nav">
                    <li><a onClick={searchUrl} href="#">Search url</a></li>
                    <li><a onClick={yourUrls}>Your urls</a></li>
                    <li><a onClick={deletedUrlsList}>deleted urls</a></li>
                    <li><a onClick={logoutUser} href="#">Logout</a></li>
                </ul>
            </header> 
          )
        }
       
    </div>
  )
}

export default Header