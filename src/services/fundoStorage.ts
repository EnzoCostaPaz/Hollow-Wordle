import AsyncStorage from '@react-native-async-storage/async-storage';

// Lembra qual fundo o jogador escolheu. Guarda só o id; a imagem vem de constants/fundos.ts.
const FUNDO_KEY = '@hollow-wordle:fundo';

export async function carregarFundoId(): Promise<string | null> {
    try {
        return await AsyncStorage.getItem(FUNDO_KEY);
    } catch (error) {
        console.error('Erro ao carregar o fundo:', error);
        return null;
    }
}

export async function salvarFundoId(id: string): Promise<void> {
    try {
        await AsyncStorage.setItem(FUNDO_KEY, id);
    } catch (error) {
        console.error('Erro ao salvar o fundo:', error);
    }
}
