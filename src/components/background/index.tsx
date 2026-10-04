import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';

const FUNDO = require('@/assets/images/fundo.png');

// Imagem estática de fundo, a mesma na web e no app
export function Background() {
    return <Image source={FUNDO} style={StyleSheet.absoluteFill} contentFit="cover" />;
}
