import React, {useContext} from 'react'
import AuthContext from './../context/AuthContext';
import HomePage from './HomePage';
import { Link } from 'react-router-dom';

const LoginPage = () => {

    let {authTokens,loginUser} = useContext(AuthContext)

  return (
    <>
    <div>{
      !authTokens ? 
      <form onSubmit={loginUser} className='formContainer' >
          <div className='container'>
            <h1 style={{textAlign: 'center'}}>Login</h1>

            <hr />

            <label htmlFor="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" required />

            <label htmlFor="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" required />

            <div>
              <button type="submit" className='loginbtn'>Login</button>
              <Link to="/signup" className='signupbtn'>Sign up</Link> 
            </div>
          </div>
        </form> : <HomePage />
    }
        
    </div>

    
    </>
    
  )
}

export default LoginPage