import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/fonts';

export const styles = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: Colors.fundo,
    },
    flex: {
        flex: 1,
    },
    conteudo: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    cartao: {
        width: '100%',
        maxWidth: 420,
        marginTop: 28,
        padding: 24,
        gap: 16,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: Colors.container.borda,
        backgroundColor: Colors.container.fundo,
    },
    titulo: {
        fontFamily: Fonts.titulo,
        fontSize: 26,
        color: Colors.texto,
        textAlign: 'center',
    },
    erro: {
        fontFamily: Fonts.medium,
        fontSize: 13,
        color: Colors.erro,
        textAlign: 'center',
    },
    rodape: {
        marginTop: 24,
        fontFamily: Fonts.regular,
        fontSize: 14,
        color: Colors.textoSuave,
        textAlign: 'center',
    },
    rodapeLink: {
        fontFamily: Fonts.semiBold,
        color: Colors.texto,
    },
});
