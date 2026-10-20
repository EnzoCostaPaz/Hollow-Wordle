import React, { useEffect, useState } from 'react';
import { Animated, View } from 'react-native';

import { PalpiteAvaliado, StatusLetra } from '@/@types/jogo';
import { Tile } from '@/components/tile';
import { USE_NATIVE_DRIVER } from '@/constants/jogo';

import { styles } from './styles';

interface BoardProps {
    palpites: PalpiteAvaliado[];
    entrada: string;
    mostrarEntrada: boolean;
    largura: number; // espaço horizontal disponível
    tamanhoMaximo: number; // tamanho da peça quando sobra espaço
    espaco: number; // espaço entre as peças, no tamanho máximo
    espacoLinhas: number;
    avisoId: number;
}

// Cada palpite vira uma linha com a quantidade de letras que foi digitada (sem grade fixa),
// como no mockup: ZOTE tem 4 peças, CORNIFER tem 8.
export function Board({
    palpites,
    entrada,
    mostrarEntrada,
    largura,
    tamanhoMaximo,
    espaco,
    espacoLinhas,
    avisoId,
}: BoardProps) {
    // As peças só diminuem quando a linha mais comprida não cabe na largura
    const maiorLinha = Math.max(1, entrada.length + 1, ...palpites.map((palpite) => palpite.palavra.length));
    const proporcaoEspaco = espaco / tamanhoMaximo;
    const tamanho = Math.min(
        tamanhoMaximo,
        Math.floor(largura / (maiorLinha + (maiorLinha - 1) * proporcaoEspaco))
    );
    const espacoAtual = Math.round(tamanho * proporcaoEspaco);

    // Palpites e linha de digitação ficam na mesma lista, com a posição como key: quando
    // o palpite é enviado, a linha digitada vira a linha do palpite e as peças animam.
    const linhas: { letras: string; status?: StatusLetra[]; ativa: boolean }[] = palpites.map(
        (palpite) => ({ letras: palpite.palavra, status: palpite.status, ativa: false })
    );
    if (mostrarEntrada) {
        linhas.push({ letras: entrada, ativa: true });
    }

    return (
        <View style={[styles.tabuleiro, { gap: espacoLinhas }]}>
            {linhas.map((linha, index) => (
                <Linha
                    key={index}
                    letras={linha.letras}
                    status={linha.status}
                    ativa={linha.ativa}
                    tamanho={tamanho}
                    espaco={espacoAtual}
                    avisoId={avisoId}
                />
            ))}
        </View>
    );
}

interface LinhaProps {
    letras: string;
    status?: StatusLetra[];
    ativa: boolean;
    tamanho: number;
    espaco: number;
    avisoId: number;
}

function Linha({ letras, status, ativa, tamanho, espaco, avisoId }: LinhaProps) {
    const [tremor] = useState(() => new Animated.Value(0));
    const [avisoInicial] = useState(avisoId);

    // Treme a linha quando o palpite é recusado (curto demais ou repetido)
    useEffect(() => {
        if (!ativa || avisoId === avisoInicial) return;
        const passo = (valor: number) =>
            Animated.timing(tremor, { toValue: valor, duration: 45, useNativeDriver: USE_NATIVE_DRIVER });
        const animacao = Animated.sequence([passo(-9), passo(9), passo(-7), passo(7), passo(-3), passo(0)]);
        animacao.start();
        return () => {
            // se o palpite for enviado no meio do tremor, a linha não pode ficar torta
            animacao.stop();
            tremor.setValue(0);
        };
    }, [ativa, avisoId, avisoInicial, tremor]);

    return (
        <Animated.View
            style={[styles.linha, { gap: espaco, minHeight: tamanho, transform: [{ translateX: tremor }] }]}>
            {letras.split('').map((letra, index) => (
                <Tile key={index} letra={letra} status={status?.[index]} tamanho={tamanho} indice={index} />
            ))}
            {ativa && <Cursor tamanho={tamanho} espaco={espaco} />}
        </Animated.View>
    );
}

// Barrinha piscando depois da última letra, indicando onde o próximo caractere vai entrar
function Cursor({ tamanho, espaco }: { tamanho: number; espaco: number }) {
    const [opacidade] = useState(() => new Animated.Value(1));

    useEffect(() => {
        const piscar = Animated.loop(
            Animated.sequence([
                Animated.timing(opacidade, { toValue: 0, duration: 380, delay: 420, useNativeDriver: USE_NATIVE_DRIVER }),
                Animated.timing(opacidade, { toValue: 1, duration: 180, delay: 200, useNativeDriver: USE_NATIVE_DRIVER }),
            ])
        );
        piscar.start();
        return () => piscar.stop();
    }, [opacidade]);

    const altura = Math.round(tamanho * 0.62);

    // Posição absoluta: o cursor não empurra as letras, então a palavra continua centralizada
    return (
        <Animated.View
            style={[
                styles.cursor,
                { height: altura, top: (tamanho - altura) / 2, right: -(espaco / 2 + 1.5), opacity: opacidade },
            ]}
        />
    );
}
