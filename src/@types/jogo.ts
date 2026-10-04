// correta: letra certa na posição certa | presente: existe em outra posição | ausente: não existe
export type StatusLetra = 'correta' | 'presente' | 'ausente';

export interface PalpiteAvaliado {
    palavra: string;
    status: StatusLetra[];
}

export type StatusJogo = 'jogando' | 'vitoria' | 'derrota';

export type ResultadoPalpite =
    | { tipo: 'invalido'; motivo: string }
    | { tipo: 'aceito'; acertou: boolean; fimDeJogo: boolean };

export interface Estatisticas {
    jogos: number;
    vitorias: number;
    sequenciaAtual: number;
    melhorSequencia: number;
    
    // ids dos personagens que o jogador já acertou
    descobertos: string[];
}
