import { StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';

export const styles = StyleSheet.create({
    tabuleiro: {
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    linha: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    cursor: {
        position: 'absolute',
        width: 3,
        borderRadius: 2,
        backgroundColor: Colors.texto,
    },
});
