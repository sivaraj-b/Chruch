
import {  Route, Router, Routes } from 'react-router-dom';
import './App.css';
import {Form,Admin} from './Container'

function App() {
  return (
   <Routes>
      <Route path="/" element={<Admin/>} />
      <Route path="/form" element={<Form/>} />

   </Routes>
  );
}

export default App;
