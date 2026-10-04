import { StatusLetra } from '@/@types/jogo';

// Mesma regra do Wordle, mas aceitando palpites de tamanho diferente da resposta
// (os nomes dos personagens têm tamanhos variados).
export function avaliarPalpite(palpite: string, resposta: string): StatusLetra[] {
    const status: StatusLetra[] = Array.from({ length: palpite.length }, () => 'ausente');
    const letrasRestantes = new Map<string, number>();

    // 1ª passada: letras na posição exata. As letras da resposta que sobram vão para o "estoque".
    for (let i = 0; i < resposta.length; i++) {
        if (palpite[i] === resposta[i]) {
            status[i] = 'correta';
        } else {
            letrasRestantes.set(resposta[i], (letrasRestantes.get(resposta[i]) ?? 0) + 1);
        }
    }

    // 2ª passada: letras que existem em outra posição, sem marcar a mesma letra mais vezes
    // do que ela aparece na resposta.
    for (let i = 0; i < palpite.length; i++) {
        if (status[i] === 'correta') continue;
        const quantidade = letrasRestantes.get(palpite[i]) ?? 0;
        if (quantidade > 0) {
            status[i] = 'presente';
            letrasRestantes.set(palpite[i], quantidade - 1);
        }
    }

    return status;
}
