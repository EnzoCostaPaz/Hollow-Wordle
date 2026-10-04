import { Vibration } from 'react-native';

// Padrões em milissegundos: [espera, vibra, espera, vibra, ...].
// No Android a duração de cada pulso é respeitada; no iOS cada pulso tem duração fixa.
const PADRAO_ACERTO = [0, 60, 70, 60, 70, 240]; // três pulsos, o último longo: comemoração
const PADRAO_ERRO = [0, 160]; // um pulso seco
const PADRAO_DERROTA = [0, 120, 90, 420]; // errou a última tentativa
const DURACAO_INVALIDO = 35; // toque curtinho: palavra curta demais ou repetida

// Chamado a cada palavra enviada, esteja ela certa ou não
export function vibrarPalpite(acertou: boolean, fimDeJogo: boolean) {
    if (acertou) {
        Vibration.vibrate(PADRAO_ACERTO);
    } else if (fimDeJogo) {
        Vibration.vibrate(PADRAO_DERROTA);
    } else {
        Vibration.vibrate(PADRAO_ERRO);
    }
}

export function vibrarPalpiteInvalido() {
    Vibration.vibrate(DURACAO_INVALIDO);
}
