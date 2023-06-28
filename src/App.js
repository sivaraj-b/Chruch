
import {  Route, Router, Routes } from 'react-router-dom';
import './App.css';
import {Form} from './Container'

function App() {
  return (
   <Routes>
      <Route path="/" element={<Form/>} />
   </Routes>
  );
}

export default App;
