import React, { useEffect, useState } from 'react';
import { Animated, Easing, Text } from 'react-native';

import { StatusLetra } from '@/@types/jogo';
import { Colors } from '@/constants/colors';
import { ATRASO_POR_LETRA_MS, DURACAO_VIRADA_MS, USE_NATIVE_DRIVER } from '@/constants/jogo';

import { styles } from './styles';

const COR_DO_STATUS: Record<StatusLetra, string> = {
    correta: Colors.letra.correta,
    presente: Colors.letra.presente,
    ausente: Colors.letra.ausente,
};

const DESCRICAO_DO_STATUS: Record<StatusLetra, string> = {
    correta: 'posição correta',
    presente: 'em outra posição',
    ausente: 'não está no nome',
};

interface TileProps {
    letra: string;
    status?: StatusLetra; // sem status = letra ainda sendo digitada
    tamanho: number;
    indice: number; // posição na palavra, usada para virar uma letra depois da outra
}

export function Tile({ letra, status, tamanho, indice }: TileProps) {
    // 0 = mostra a peça "digitando"; 1 = mostra a cor do resultado
    const [virada] = useState(() => new Animated.Value(status ? 1 : 0));
    const [escala] = useState(() => new Animated.Value(status ? 1 : 0.8));
    // peças que já aparecem com resultado (ex.: tela recriada) não precisam animar
    const [nasceuRevelada] = useState(status !== undefined);

    // "pulinho" quando a letra é digitada
    useEffect(() => {
        if (nasceuRevelada) return;
        Animated.spring(escala, {
            toValue: 1,
            friction: 5,
            tension: 300,
            useNativeDriver: USE_NATIVE_DRIVER,
        }).start();
    }, [escala, nasceuRevelada]);

    // Vira a peça quando o palpite é enviado; a cor troca no meio do giro
    useEffect(() => {
        if (!status || nasceuRevelada) return;
        const animacao = Animated.sequence([
            Animated.delay(indice * ATRASO_POR_LETRA_MS),
            Animated.timing(virada, {
                toValue: 1,
                duration: DURACAO_VIRADA_MS,
                easing: Easing.inOut(Easing.quad),
                useNativeDriver: USE_NATIVE_DRIVER,
            }),
        ]);
        animacao.start();
        return () => animacao.stop();
    }, [status, indice, virada, nasceuRevelada]);

    const scaleY = virada.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 0, 1] });
    const opacidadeDigitando = virada.interpolate({
        inputRange: [0, 0.5, 0.501, 1],
        outputRange: [1, 1, 0, 0],
    });
    const opacidadeResultado = virada.interpolate({
        inputRange: [0, 0.5, 0.501, 1],
        outputRange: [0, 0, 1, 1],
    });
    const raio = Math.round(tamanho * 0.11);

    return (
        <Animated.View
            accessible
            accessibilityLabel={status ? `${letra}, ${DESCRICAO_DO_STATUS[status]}` : letra}
            style={[
                styles.peca,
                { width: tamanho, height: tamanho, transform: [{ scale: escala }, { scaleY }] },
            ]}>
            <Animated.View
                style={[styles.camada, styles.digitando, { borderRadius: raio, opacity: opacidadeDigitando }]}
            />
            {status && (
                <Animated.View
                    style={[
                        styles.camada,
                        { borderRadius: raio, backgroundColor: COR_DO_STATUS[status], opacity: opacidadeResultado },
                    ]}
                />
            )}
            <Text style={[styles.letra, { fontSize: Math.round(tamanho * 0.46) }]}>{letra}</Text>
        </Animated.View>
    );
}
