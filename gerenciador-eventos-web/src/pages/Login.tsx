import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'

import * as S from './Login.styles';
import mascoteImg from '../assets/mascoteNeki.png'
import logoImg from '../assets/logotipoNekiBranca.png'



const Login: React.FC = () => {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[rememberMe, setRememberMe] = useState(false);
    const Navigate = useNavigate(); 

    useEffect(() => {
    const savedEmail = localStorage.getItem('@NekiEvents: email');
    const savedPass = localStorage.getItem('@NekiEvents: password');

    if (savedEmail && savedPass) {
        setTimeout(() => {
            setEmail(savedEmail);
            setPassword(savedPass);
            setRememberMe(true);
        }, 0);
    }
}, []);

    const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/administradores/login', {
        email: email,
        senha: password
      });

      const token = response.data.token;
      const id = response.data.id || response.data.administrador?.id || response.data.admin?.id;

      if (token && id) {
        localStorage.setItem('@NekiEvents:token', token);
        localStorage.setItem('@NekiEvents:adminId', String(id));

        if (rememberMe) {
          localStorage.setItem('@NekiEvents:email', email);
          localStorage.setItem('@NekiEvents:password', password);
        } else {
          localStorage.removeItem('@NekiEvents:email');
          localStorage.removeItem('@NekiEvents:password');
        }
        Navigate('/home');
      } else {
        alert("Erro: O servidor não retornou o ID do usuário corretamente.");
      }
    } catch (error) {
      console.error(error);
      alert('Falha no login. Verifique email e senha.');
    }
  };

    return(

        <S.Container>
            <S.WelcomeSection>
                <h1>BEM VINDO(A)! CADASTRE SEUS EVENTOS NO NEKI EVENTOS!</h1>
                <p>FAÇA LOGIN OU CADASTRE-SE</p>
                <S.Mascote src={mascoteImg} alt="Mascote Neki"/>
            </S.WelcomeSection>

            <S.FormSection>
                <S.LogoNeki src={logoImg} alt="Logo Neki" />

                <S.FormCard onSubmit={handleLogin}>
                    <h2>Login</h2>

                    <S.Input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />

                    <S.Input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />

                    <S.CheckBoxContainer>
                        <input
                        type="checkbox"
                        id="remember"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label htmlFor="remember">Gravar Senha</label>
                    </S.CheckBoxContainer>

                    <S.Button type="submit">ENTRAR</S.Button>

                    <S.SecondaryButton type="button" onClick={() => Navigate('/cadastro')}>
                        CADASTRAR-SE
                    </S.SecondaryButton>


                </S.FormCard>
            </S.FormSection>
        </S.Container>

    );

};

export default Login;