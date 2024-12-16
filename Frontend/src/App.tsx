
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Landing_page from './pages/Landing_page';
import User_Login from './pages/User_Login';
import User_Register from './pages/User_Register';

function App() {
  return (
   <Routes>
      <Route path='/' element={<Landing_page/>} />
      <Route path='/login' element={<User_Login/>} />
      <Route path='/user_Register' element={<User_Register/>} />
   </Routes>
  );  
}

export default App;