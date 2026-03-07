import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.tsx'

const Cadastro = () => <div style={{color: 'white', padding: '20px'}}>Tela de Cadastro em breve</div>;
const Home = () => <div style={{color: 'white', padding: '20px'}}>Login realizado com sucesso.</div>;

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
