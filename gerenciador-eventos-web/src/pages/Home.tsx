import React, { useState, useEffect } from 'react';
import api from '../services/api';
import type { Evento } from '../types';
import * as S from './Home.style';
import logoImg from '../assets/logotipoNeki.jpg';

const Home: React.FC = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEvento, setCurrentEvento] = useState<Partial<Evento>>({});

  const [showImagePreview, setShowImagePreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const adminNome = localStorage.getItem('usuarioNome') || 'Administrador';

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

  const { nome, data, localizacao, imagemUrl } = currentEvento;

  const isNomeValido = nome && nome.trim() !== '';
  const isDataValida = data && data.trim() !== '';
  const isLocalValido = localizacao && localizacao.trim() !== '';
  const isImagemValida = currentEvento.id ? true : (imagemUrl && imagemUrl.trim() !== '');

  if (!isNomeValido || !isDataValida || !isLocalValido || !isImagemValida) {
    alert("Por favor, preencha todos os campos obrigatórios (Nome, Data, Localização e Imagem).");
    return; 
  }

  try {
    const eventoFinal = {
      titulo: nome?.trim(),           
      localizacao: localizacao?.trim(),
      data: data,
      imagem: imagemUrl,    
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
    alert("Erro ao salvar o evento. Verifique os dados e tente novamente.");
  }
};

const handleImageClick = (img: string) => {
  setSelectedImage(img);
  setShowImagePreview(true);
};

  return (
    <S.Container>
      <S.Header>
        <img src={logoImg} alt="Logo Neki" />
        <S.AdminGreeting>
            Bem-vindo, <span>{adminNome}!</span>
        </S.AdminGreeting>
        <button onClick={() => { 
          localStorage.removeItem('@NekiEvents:token'); 
          localStorage.removeItem('@NekiEvents:adminId');
          localStorage.setItem('usuarioNome', ''); 

    window.location.href='/'; 
}}>
  Sair
</button>
      </S.Header>

      <S.Main>
        <S.TitleContainer>
          <h1>Meus Eventos</h1>
          <button onClick={() => { setCurrentEvento({}); setShowModal(true); }}>+ ADICIONAR EVENTO</button>
        </S.TitleContainer>

        <S.Grid>
  {eventos.map(ev => (
    <S.Card key={ev.id}>
      
        <S.CardImage 
          src={ev.imagem || ev.imagemUrl} 
          alt={ev.titulo || ev.nome} 
          onClick={() => handleImageClick(ev.imagem || ev.imagemUrl)}
          style={{ cursor: 'pointer' }} 
        />
        
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
      <h2>{currentEvento.id ? 'Editar Evento' : 'Novo Evento'}</h2>

      {!currentEvento.id && (
        <input 
          placeholder="Nome do Evento" 
          value={currentEvento.nome || ''} 
          onChange={e => setCurrentEvento({...currentEvento, nome: e.target.value})} 
        />
      )}

      <input 
        type="date" 
        value={currentEvento.data || ''} 
        onChange={e => setCurrentEvento({...currentEvento, data: e.target.value})} 
      />
      <input 
        placeholder="Localização" 
        value={currentEvento.localizacao || ''} 
        onChange={e => setCurrentEvento({...currentEvento, localizacao: e.target.value})} 
      />

      {!currentEvento.id && (
        <div style={{ marginTop: '10px' }}>
          <label style={{ color: '#FFF', display: 'block', marginBottom: '5px' }}>Anexar Imagem:</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setCurrentEvento({...currentEvento, imagemUrl: reader.result as string});
                };
                reader.readAsDataURL(file);
              }
            }} 
          />
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button onClick={handleSave}>SALVAR</button>
        <button onClick={() => setShowModal(false)}>Cancelar</button>
      </div>
    </S.ModalContent>
  </S.ModalOverlay>
)}

{showImagePreview && (
  <S.ModalOverlay onClick={() => setShowImagePreview(false)}>
    <S.ModalContent style={{ background: 'transparent', boxShadow: 'none', padding: 0 }}>
      <img 
        src={selectedImage} 
        alt="Preview" 
        style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: '8px' }} 
      />
      <p style={{ color: '#FFF', textAlign: 'center', marginTop: '10px' }}>Clique fora para fechar</p>
    </S.ModalContent>
  </S.ModalOverlay>
)}
    </S.Container>
  );
};

export default Home;