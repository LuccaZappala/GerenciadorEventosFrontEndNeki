import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.tsx'
import Home from './pages/Home.tsx';
import Cadastro from './pages/Cadastro';


function App() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login />} />

    <Route path="/cadastro" element={<Cadastro />} />
    <Route path="/home" element={<Home />} />

    <Route path="*" element={<Navigate to="/" />} />

    </Routes>
    </BrowserRouter>
  );
}

export default App
