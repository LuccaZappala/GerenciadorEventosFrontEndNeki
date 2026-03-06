export interface Evento {
    id: number;
    nome: string;
    data: string;
    localizacao: string;
    imagemUrl: string;
}

export interface AuthResponse{
    token: string;
    nome?: string;
}