import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/fonts';

export const styles = StyleSheet.create({
    peca: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    camada: {
        ...StyleSheet.absoluteFill,
    },
    digitando: {
        backgroundColor: Colors.letra.digitando,
        borderWidth: 2,
        borderColor: Colors.letra.bordaDigitando,
    },
    letra: {
        color: Colors.texto,
        fontFamily: Fonts.letra,
        includeFontPadding: false,
        textAlignVertical: 'center',
    },
});
