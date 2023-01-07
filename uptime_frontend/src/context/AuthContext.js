import { createContext, useState, useEffect, useRef} from 'react'

//import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    
    let [authTokens, setAuthtokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null)
    const navigate = useNavigate()


    let [searchurl, setSearchurl] = useState('block')
    let [yoururls, setYoururls] = useState('none')
    let [deletedurls, setDeletedurls] = useState('none')
    let [deletedlist, setDeletedlist] = useState([])

    let signupUser = async (e) =>{
        
        e.preventDefault();
        console.log('signup form submitted');
        let response = await fetch('http://127.0.0.1:8000/register/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'email':e.target.email.value, 'password':e.target.password.value})
        })
        let data = await response.json()
        
        if(response.status === 200){

            setAuthtokens(data.token);
            setUser(data.username) 
           
            
            console.log(authTokens)
            
           
            localStorage.setItem('authTokens', JSON.stringify(data.token))
            localStorage.setItem('user', JSON.stringify(data.username))
            navigate('/')
        }
        else{
            alert('something went wrong')
        }
    }


    let loginUser = async (e) =>{
        
        e.preventDefault();
        console.log('login form submitted');
        let response = await fetch('http://127.0.0.1:8000/login/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'email':e.target.email.value, 'password':e.target.password.value})
        })
        let data = await response.json()
        
        if(response.status === 200){

            setAuthtokens(data.token);
            setUser(data.username) 
           
            
            console.log(authTokens)
            
           
            localStorage.setItem('authTokens', JSON.stringify(data.token))
            localStorage.setItem('user', JSON.stringify(data.username))
            navigate('/')
        }
        else{
            alert('something went wrong')
        }
    }

    let logoutUser = () => {
        setAuthtokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        localStorage.removeItem('user')
        navigate('/login')
    }


    let searchUrl = ()=> {
        setSearchurl('block')
        setYoururls('none')
        setDeletedurls('none')
        console.log("searchurl -"+ searchurl)
    }

    let yourUrls = ()=> {
        setSearchurl('none')
        setYoururls('block')
        setDeletedurls('none')
        console.log("searchurl -"+yoururls)
    }



    

    let deletedUrlsList = async()=>{
        let response = await fetch('http://127.0.0.1:8000/deletedurls/', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': 'Token ' + String(authTokens)
            },
          })   
          
          let data = await response.json()
          console.log(data)
          setDeletedlist(data)

          setDeletedurls('block')
          setSearchurl('none')
          setYoururls('none')
          console.log("deletedurls -"+deletedurls)
          
      } 



   
    let contextData = {
        authTokens:authTokens,
        user:user,
        searchurl:searchurl,
        yoururls:yoururls,
        deletedurls:deletedurls,
        deletedlist: deletedlist,
        loginUser:loginUser,
        logoutUser:logoutUser,
        signupUser:signupUser,
        searchUrl:searchUrl,
        yourUrls:yourUrls,
        
        deletedUrlsList:deletedUrlsList,
    }

    return(
        <AuthContext.Provider value = {contextData}>
            {children}
        </AuthContext.Provider>
    )
}