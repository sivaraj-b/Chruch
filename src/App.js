
import {  Route, Router, Routes } from 'react-router-dom';
import './App.css';
import {Form,Admin, Dashbord} from './Container'

function App() {
  return (
   <Routes>
      <Route path="/" element={<Admin/>} />
      <Route path="/form" element={<Form/>} />
      <Route path='/dashboard'  element={<Dashbord/>}/>
   </Routes>
  );
}

export default App;
