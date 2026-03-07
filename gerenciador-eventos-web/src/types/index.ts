export interface Evento {
    id: number;
    titulo?: string;
    nome?: string;
    data: string;
    localizacao: string;
    imagem?: string;
    imagemUrl: string;
}

export interface AuthResponse{
    token: string;
    nome?: string;
}