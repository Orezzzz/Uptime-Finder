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
            <input type="text" placeholder="Enter Email" name="username" required />

            <label htmlFor="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" required />

            <label htmlFor="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" required />

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