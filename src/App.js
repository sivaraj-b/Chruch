
import {  Route, Router, Routes } from 'react-router-dom';
import './App.css';
import {Form,Admin, Dashbord, Child} from './Container'

function App() {
  return (
   <Routes>
      <Route path="/" element={<Admin/>} />
      <Route path='/dashboard'  element={<Dashbord/>}/>
      <Route path="/form" element={<Form/>} />
      <Route path='/child/:parent' element={<Child/>}/>
   </Routes>
  );
}

export default App;
