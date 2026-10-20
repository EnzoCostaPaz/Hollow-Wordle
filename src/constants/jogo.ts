import { Platform } from 'react-native';

export const MAX_TENTATIVAS = 6;
export const MIN_LETRAS = 3;
export const MAX_LETRAS = 12;

// Animação das letras ao enviar um palpite: cada letra vira um pouco depois da anterior
export const ATRASO_POR_LETRA_MS = 90;
export const DURACAO_VIRADA_MS = 280;
export const PAUSA_ANTES_DO_MODAL_MS = 600;

export function tempoDeRevelacao(quantidadeDeLetras: number) {
    return Math.max(0, quantidadeDeLetras - 1) * ATRASO_POR_LETRA_MS + DURACAO_VIRADA_MS;
}

// O driver nativo roda a animação fora da thread do JS; na web ele não existe
export const USE_NATIVE_DRIVER = Platform.OS !== 'web';
