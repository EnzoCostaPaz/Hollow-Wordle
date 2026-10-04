import { Image } from 'expo-image';
import React from 'react';
import { ImageStyle, StyleProp } from 'react-native';

// PNG extraído do LogoProjeto.svg (o SVG exportado do Canva só embrulha esta imagem)
const LOGO = require('@/assets/images/logo.png');
const PROPORCAO = 880 / 342;

interface LogoProps {
    largura: number;
    style?: StyleProp<ImageStyle>;
}

export function Logo({ largura, style }: LogoProps) {
    return (
        <Image
            source={LOGO}
            style={[{ width: largura, height: largura / PROPORCAO }, style]}
            contentFit="contain"
            accessibilityLabel="Hollow Wordle"
        />
    );
}
