import './pageStyles/signup.css';
import './pageStyles/header.css';
import './pageStyles/homepage.css';
import './pageStyles/homepageyoururls.css';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import PrivateRoutes from './utis/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import SignupPage from './pages/SignupPage';
 
function App() {
  return (
    <div className="App">
      <Router>
      <AuthProvider>
      <Header />
        <Routes>
         <Route element={<PrivateRoutes />}>
            <Route exact path='/' element={<HomePage/>}/>
          </Route>
          <Route element={<LoginPage />} path='/login'/>
          <Route element={<SignupPage />} path='/signup'/>
        </Routes>
      </AuthProvider>
      </Router>
    </div>
     
  );
}
 
export default App;