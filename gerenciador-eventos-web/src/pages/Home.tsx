import React, { useState, useEffect } from 'react';
import api from '../services/api';
import type { Evento } from '../types';
import * as S from './Home.style';
import logoImg from '../assets/logotipoNeki.jpg';

const Home: React.FC = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEvento, setCurrentEvento] = useState<Partial<Evento>>({});

  const fetchEventos = async () => {
  try {
    const adminId = localStorage.getItem('@NekiEvents:adminId');

    if (!adminId) {
        console.error("Admin ID não encontrado");
        return;
    }

    const { data } = await api.get(`/eventos/admin/${adminId}`);

    const eventos = data.map((ev: any) => ({
      ...ev,
      nome: ev.titulo || ev.nome,
      imagemUrl: ev.imagem || ev.imagemUrl
    }));

    setEventos(eventos);
    console.log("Eventos carregados com sucesso!");

  } catch (err: any) {
    console.error("Erro ao buscar eventos:", err.response?.status, err.response?.data);
    if (err.response?.status === 405) {
        alert("Erro 405: A rota no Java não aceita GET. Verifique o Controller.");
    }
  }
};

  useEffect(() => {
    setTimeout(() => fetchEventos(), 0);
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Excluir evento?")) {
      await api.delete(`/eventos/${id}`);
      fetchEventos();
    }
  };

 const handleSave = async () => {
    const adminId = localStorage.getItem('@NekiEvents:adminId');
    
    if (!adminId) {
      alert("Sessão inválida. Por favor, faça login novamente.");
      return;
    }

    try {
      const eventoFinal = {
        titulo: currentEvento.nome,           
        localizacao: currentEvento.localizacao,
        data: currentEvento.data,
        imagem: currentEvento.imagemUrl,    
        idAdministrador: Number(adminId)       
      };

      if (currentEvento.id) {
        await api.put(`/eventos/${currentEvento.id}`, eventoFinal);
      } else {
        await api.post('/eventos', eventoFinal);
      }

      setShowModal(false);
      fetchEventos();
      alert("Salvo com sucesso!");
    } catch (error: any) {
      console.error("Erro no Java:", error.response?.data);
      alert("Erro ao salvar. Verifique se todos os campos estão preenchidos.");
    }
  };

  return (
    <S.Container>
      <S.Header>
        <img src={logoImg} alt="Logo Neki" />
        <button onClick={() => { localStorage.clear(); window.location.href='/'; }}>Sair</button>
      </S.Header>

      <S.Main>
        <S.TitleContainer>
          <h1>Meus Eventos</h1>
          <button onClick={() => { setCurrentEvento({}); setShowModal(true); }}>+ ADICIONAR EVENTO</button>
        </S.TitleContainer>

        <S.Grid>
  {eventos.map(ev => (
    <S.Card key={ev.id}>
      <img src={ev.imagem || ev.imagemUrl} alt={ev.titulo || ev.nome} />
      <S.CardInfo>
        <h3>{ev.titulo || ev.nome}</h3>
        <p>📅 {ev.data} | 📍 {ev.localizacao}</p>
      </S.CardInfo>
      <S.CardActions>
        <button onClick={() => { 
          setCurrentEvento({
            id: ev.id,
            nome: ev.titulo || ev.nome,
            data: ev.data,
            localizacao: ev.localizacao,
            imagemUrl: ev.imagem || ev.imagemUrl
          }); 
          setShowModal(true); 
        }}>Editar</button>
        <button onClick={() => handleDelete(ev.id)}>Excluir</button>
      </S.CardActions>
    </S.Card>
  ))}
</S.Grid>
      </S.Main>

      {showModal && (
        <S.ModalOverlay>
          <S.ModalContent>
            <h2>{currentEvento.id ? 'Editar' : 'Novo'}</h2>
            <input placeholder="Nome" value={currentEvento.nome || ''} onChange={e => setCurrentEvento({...currentEvento, nome: e.target.value})} />
            <input type="date" value={currentEvento.data || ''} onChange={e => setCurrentEvento({...currentEvento, data: e.target.value})} />
            <input placeholder="Local" value={currentEvento.localizacao || ''} onChange={e => setCurrentEvento({...currentEvento, localizacao: e.target.value})} />
            <input placeholder="URL Imagem" value={currentEvento.imagemUrl || ''} onChange={e => setCurrentEvento({...currentEvento, imagemUrl: e.target.value})} />
            <button onClick={handleSave}>SALVAR</button>
            <button onClick={() => setShowModal(false)}>Cancelar</button>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
};

export default Home;