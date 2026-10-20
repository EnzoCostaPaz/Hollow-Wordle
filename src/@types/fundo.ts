export interface Fundo {
    id: string; // guardado no armazenamento para lembrar a escolha; não mude depois de criado
    nome: string;
    imagem: number; // o que o require('...png') devolve
}
