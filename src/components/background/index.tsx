import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';

import { useFundo } from '@/contexts/fundo';

// Imagem de fundo escolhida pelo jogador (ver constants/fundos.ts), a mesma na web e no app
export function Background() {
    const { fundo } = useFundo();

    return (
        <Image
            source={fundo.imagem}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            transition={300}
        />
    );
}
