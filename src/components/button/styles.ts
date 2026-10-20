import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/fonts';

export const styles = StyleSheet.create({
    botao: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        borderRadius: 999,
        backgroundColor: Colors.botao.fundo,
    },
    botaoSecundario: {
        borderWidth: 1,
        borderColor: Colors.botao.borda,
        backgroundColor: 'transparent',
    },
    texto: {
        fontFamily: Fonts.semiBold,
        fontSize: 15,
        color: Colors.botao.texto,
    },
    textoSecundario: {
        color: Colors.texto,
    },
    pressionado: {
        opacity: 0.7,
    },
});
