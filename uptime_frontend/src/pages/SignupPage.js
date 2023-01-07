import React, { useContext } from 'react'
import AuthContext from './../context/AuthContext';
import HomePage from './HomePage';
import { Link } from 'react-router-dom'


const SignupPage = () => {

  let {authTokens,signupUser} = useContext(AuthContext)

  return (
    <>
      {  !authTokens ? 
        <form onSubmit={signupUser} className='formContainer' >
          <div className='container'>
            <h1 style={{textAlign: 'center'}}>Sign Up</h1>

            <hr />

            <label htmlFor="usernmae"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="username" required />

            <label htmlFor="email"><b>Email</b></label>
            <input type="email" placeholder="Enter Email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" required />

            <label htmlFor="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password(minimum characters-8)" name="password" pattern=".{8,}" title="Eight or more characters" required />

            <div>
              <button type="submit" className='signupbtn'>Sign Up</button>
              <Link to="/login" className='loginbtn'>Login</Link> 
            </div>
          </div>
        </form> : <HomePage />


        
        
      }



    
      
    </>
    
  )
}

export default SignupPage