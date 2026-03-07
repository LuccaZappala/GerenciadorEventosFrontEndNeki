import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column; 
  width: 100vw;           
  min-height: 100vh;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  height: 80px;
  background-color: #FFFFFF;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0px 2px 10px rgba(0,0,0,0.1);

  img {
    height: 50px;
  }

  button {
    background-color: #003B49;
    color: white;
    border: none;
    padding: 10px 25px;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
  }
`;

export const Main = styled.main`
  flex: 1;
  width: 100%;
  max-width: 1200px;   
  margin: 0 auto;    
  padding: 40px 5%;
  box-sizing: border-box;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 40px;

  h1 {
    color: #003B49;
    font-size: 32px;
    margin: 0;
  }

  button {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    font-size: 16px;
    
    &:hover {
      background-color: #218838;
    }
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  width: 100%;
`;

export const Card = styled.div`

  background: white;

  border-radius: 8px;

  overflow: hidden;

  box-shadow: 0 4px 6px rgba(0,0,0,0.1);

  display: flex;

  flex-direction: column;

`;


export const CardInfo = styled.div`

  padding: 15px;

  h3 { margin: 0 0 10px 0; color: #333; }

  p { margin: 5px 0; color: #666; font-size: 14px; }

`;


export const CardActions = styled.div`

  display: flex;

  border-top: 1px solid #eee;

  button {

    flex: 1;

    padding: 10px;

    border: none;

    cursor: pointer;

    background: none;

    font-weight: bold;

    &.edit { color: #007bff; }

    &.delete { color: #dc3545; }

    &:hover { background: #f9f9f9; }

  }

`;

export const ModalOverlay = styled.div`

  position: fixed;

  top: 0; left: 0; width: 100%; height: 100%;

  background: rgba(0,0,0,0.5);

  display: flex;

  justify-content: center;

  align-items: center;

`;

export const ModalContent = styled.div`

  background: white;

  padding: 30px;

  border-radius: 8px;

  width: 400px;

  display: flex;

  flex-direction: column;

  gap: 15px;

  

  input {

    padding: 10px;

    border: 1px solid #ccc;

    border-radius: 4px;

  }



  button.save { background: #28a745; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer; }

  button.close { background: #6c757d; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer; }

`;