import AsyncStorage from '@react-native-async-storage/async-storage';

import { Sessao } from '@/@types/usuario';

// Guarda a sessão do usuário. No celular fica no armazenamento do app; na web usa o localStorage.
const SESSAO_KEY = '@hollow-wordle:sessao';

export async function salvarSessao(sessao: Sessao): Promise<void> {
    try {
        await AsyncStorage.setItem(SESSAO_KEY, JSON.stringify(sessao));
    } catch (error) {
        console.error('Erro ao salvar a sessão:', error);
    }
}

export async function carregarSessao(): Promise<Sessao | null> {
    try {
        const raw = await AsyncStorage.getItem(SESSAO_KEY);
        return raw ? (JSON.parse(raw) as Sessao) : null;
    } catch (error) {
        console.error('Erro ao carregar a sessão:', error);
        return null;
    }
}

export async function limparSessao(): Promise<void> {
    try {
        await AsyncStorage.removeItem(SESSAO_KEY);
    } catch (error) {
        console.error('Erro ao limpar a sessão:', error);
    }
}
