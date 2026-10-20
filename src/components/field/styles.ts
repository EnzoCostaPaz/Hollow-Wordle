import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/fonts';

export const styles = StyleSheet.create({
    grupo: {
        alignSelf: 'stretch',
    },
    rotulo: {
        marginBottom: 6,
        fontFamily: Fonts.medium,
        fontSize: 13,
        color: Colors.textoSuave,
    },
    entrada: {
        height: 48,
        paddingHorizontal: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.campo.borda,
        backgroundColor: Colors.campo.fundo,
        fontFamily: Fonts.regular,
        fontSize: 15,
        color: Colors.texto,
    },
});
