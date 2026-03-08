import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    background-color: #003B49;
    font-family: 'Inter', sans-serif;
`;

export const WelcomeSection = styled.section`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
    text-align: center;

    h1 {
        font-size: 2.5rem;
        color: #FFF;
        margin-bottom: 10px;
        max-width: 400px;    
    }

    p {
        color: #2B94A7;
        font-weight: bold;
        margin-bottom: 30px;
    }
`;

export const FormSection = styled.section`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
`;

export const LogoNeki = styled.img`
    width: 200px;
    margin-bottom: 40px;
    `;

 export const Mascote = styled.img`
    width: 350px;
`;   

export const FormCard = styled.form`
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;

    h2{
        color: #FFF;
        font-size: 1.8rem;
        margin-bottom: 10px;
        
    }
`;

export const Input = styled.input`
    width: 100%;
    padding: 16px;
    border-radius: 8px;
    border: none;
    background-color: #2B94A7;
    color: #FFF;
    font-size: 1rem;

    &::placeholder {
        color: rgba(255, 255, 255, 0.7)
    }
`;

export const CheckBoxContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    color: #FFF;
    font-size: 0.9rem;
    margin-top: 5px;

    input{
        cursor: pointer;
    }
`;

export const Button = styled.button` 
    width: 70%;
    padding: 16px;
    border-radius: 8px;
    border: none;
    background-color: #FFF;
    color: #003B49;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 10px;
    transition: filter 0.2s;

    &:hover {
        filter: brightness(0.9);
    }
`;

export const SecondaryButton = styled.button`{
    background: none;
    border: 1px solid #FFF;
    color: #FFF;
    padding: 12px;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 10px;
    font-weight: bold;

    &:hover{
        background-color: rgba(255, 255, 255, 0.1)
    }
`;





