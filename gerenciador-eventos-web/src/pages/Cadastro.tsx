import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import * as S from './Login.styles';
import logoImg from '../assets/logotipoNekiBranca.png';

const Cadastro: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const navigate = useNavigate();

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      await api.post('/administradores/cadastrar', { nome, email, senha });
      alert("Cadastro realizado com sucesso!");
      navigate('/');
    } catch (error) {
      alert("Erro ao cadastrar. Verifique os dados.");
    }
  };

  return (
    <S.Container style={{ justifyContent: 'center', alignItems: 'center' }}>
      <S.FormSection style={{ flex: 'none', width: '100%', maxWidth: '400px' }}>
        <S.LogoNeki src={logoImg} alt="Logo Neki" />
        
        <S.FormCard onSubmit={handleCadastro}>
          <h2>Cadastro</h2>
          <S.Input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} required />
          <S.Input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required />
          <S.Input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required />
          <S.Input type="password" placeholder="Confirmar Senha" value={confirmarSenha} onChange={e => setConfirmarSenha(e.target.value)} required />
          
          <S.Button type="submit">CADASTRAR</S.Button>
          <S.SecondaryButton type="button" onClick={() => navigate('/')}>VOLTAR</S.SecondaryButton>
        </S.FormCard>
      </S.FormSection>
    </S.Container>
  );
};

export default Cadastro;