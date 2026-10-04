import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/fonts';

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: Colors.modal.overlay,
    },
    cartao: {
        backgroundColor: Colors.modal.fundo,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Colors.modal.borda,
        overflow: 'hidden',
    },
    conteudo: {
        alignItems: 'center',
        padding: 24,
        paddingTop: 28,
    },
    fechar: {
        position: 'absolute',
        top: 8,
        right: 10,
        zIndex: 2,
        padding: 8,
    },
    fecharTexto: {
        fontSize: 18,
        color: Colors.textoSuave,
    },
    titulo: {
        fontFamily: Fonts.titulo,
        fontSize: 26,
        color: Colors.texto,
        textAlign: 'center',
    },
    subtitulo: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: Colors.textoSuave,
        textAlign: 'center',
        marginTop: 4,
    },
    moldura: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        height: 170,
        marginTop: 18,
        padding: 12,
        borderRadius: 12,
        backgroundColor: Colors.modal.cartao,
    },
    foto: {
        width: '100%',
        height: '100%',
    },
    nome: {
        fontFamily: Fonts.titulo,
        fontSize: 24,
        color: Colors.texto,
        marginTop: 14,
    },
    descricao: {
        fontFamily: Fonts.regular,
        fontSize: 14,
        lineHeight: 21,
        color: Colors.textoSuave,
        textAlign: 'center',
        marginTop: 6,
    },
    divisor: {
        alignSelf: 'stretch',
        height: 1,
        marginVertical: 18,
        backgroundColor: Colors.modal.borda,
    },
    secao: {
        fontFamily: Fonts.semiBold,
        fontSize: 16,
        color: Colors.texto,
        marginBottom: 10,
    },
    metricas: {
        flexDirection: 'row',
        alignSelf: 'stretch',
    },
    metrica: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 2,
    },
    metricaValor: {
        fontFamily: Fonts.semiBold,
        fontSize: 26,
        color: Colors.texto,
    },
    metricaRotulo: {
        fontFamily: Fonts.regular,
        fontSize: 11.5,
        lineHeight: 15,
        color: Colors.textoSuave,
        textAlign: 'center',
    },
    botao: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        marginTop: 22,
        borderRadius: 12,
        backgroundColor: Colors.botao.fundo,
    },
    botaoTexto: {
        fontFamily: Fonts.semiBold,
        fontSize: 16,
        color: Colors.botao.texto,
    },
    botaoSecundario: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        height: 46,
        marginTop: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.botao.borda,
    },
    botaoSecundarioTexto: {
        fontFamily: Fonts.semiBold,
        fontSize: 15,
        color: Colors.texto,
    },
    pressionado: {
        opacity: 0.7,
    },
});
