import { Navigate, Outlet, } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext'

const PrivateRoutes = () => {

    let {authTokens} = useContext(AuthContext)
    
    console.log('pirvate route works!')
    
    return( !authTokens ? <Navigate to="/login" /> : <Outlet />
    )
}

export default PrivateRoutes