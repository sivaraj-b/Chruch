
import {  Route, Router, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import {Form,Admin, Dashbord, Child} from './Container'
import Details from './Components/Details/Details';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('parentId');
      localStorage.removeItem('tempData');
      
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);




  return (
   <Routes>
      <Route path="/" element={<Admin/>} />
      <Route path='/dashboard'  element={<Dashbord/>}/>
      <Route path="/form" element={<Form/>} />
      <Route path='/child/:parent/:childId' element={<Child/>}/>
   </Routes>
  );
}

export default App;
