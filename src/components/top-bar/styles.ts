import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/fonts';

export const styles = StyleSheet.create({
    barra: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
    },
    usuario: {
        flexShrink: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    // bolinha verde: indica que há uma conta logada
    indicador: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.letra.correta,
    },
    usuarioTexto: {
        flexShrink: 1,
        fontFamily: Fonts.medium,
        fontSize: 13,
        color: Colors.texto,
    },
    acoes: {
        flexDirection: 'row',
        gap: 8,
    },
    botao: {
        paddingHorizontal: 14,
        paddingVertical: 7,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: Colors.botao.borda,
    },
    botaoTexto: {
        fontFamily: Fonts.semiBold,
        fontSize: 13,
        color: Colors.texto,
    },
    pressionado: {
        opacity: 0.7,
    },
});
