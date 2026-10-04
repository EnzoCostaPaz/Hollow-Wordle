import AsyncStorage from '@react-native-async-storage/async-storage';

import { Estatisticas } from '@/@types/jogo';

// No celular fica salvo no armazenamento do app; na web o AsyncStorage usa o localStorage.
const ESTATISTICAS_KEY = '@hollow-wordle:estatisticas';

export const ESTATISTICAS_INICIAIS: Estatisticas = {
    jogos: 0,
    vitorias: 0,
    sequenciaAtual: 0,
    melhorSequencia: 0,
    descobertos: [],
};

export async function carregarEstatisticas(): Promise<Estatisticas> {
    try {
        const raw = await AsyncStorage.getItem(ESTATISTICAS_KEY);
        return raw ? { ...ESTATISTICAS_INICIAIS, ...JSON.parse(raw) } : ESTATISTICAS_INICIAIS;
    } catch (error) {
        console.error('Erro ao carregar as estatísticas:', error);
        return ESTATISTICAS_INICIAIS;
    }
}

// Soma o resultado de uma partida terminada às estatísticas salvas e devolve o novo total.
export async function registrarPartida(vitoria: boolean, personagemId: string): Promise<Estatisticas> {
    const atuais = await carregarEstatisticas();
    const sequenciaAtual = vitoria ? atuais.sequenciaAtual + 1 : 0;
    const descobertos =
        vitoria && !atuais.descobertos.includes(personagemId)
            ? [...atuais.descobertos, personagemId]
            : atuais.descobertos;

    const novas: Estatisticas = {
        jogos: atuais.jogos + 1,
        vitorias: atuais.vitorias + (vitoria ? 1 : 0),
        sequenciaAtual,
        melhorSequencia: Math.max(atuais.melhorSequencia, sequenciaAtual),
        descobertos,
    };

    try {
        await AsyncStorage.setItem(ESTATISTICAS_KEY, JSON.stringify(novas));
    } catch (error) {
        console.error('Erro ao salvar as estatísticas:', error);
    }
    return novas;
}

export function porcentagemDeVitorias(estatisticas: Estatisticas): number {
    if (estatisticas.jogos === 0) return 0;
    return Math.round((estatisticas.vitorias / estatisticas.jogos) * 100);
}
