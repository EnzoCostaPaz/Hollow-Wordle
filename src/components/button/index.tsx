import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';

import { Colors } from '@/constants/colors';

import { styles } from './styles';

interface ButtonProps {
    titulo: string;
    onPress: () => void;
    variante?: 'primario' | 'secundario'; // primário = preenchido; secundário = só a borda
    carregando?: boolean; // mostra o indicador de espera e bloqueia novos toques
}

export function Button({ titulo, onPress, variante = 'primario', carregando = false }: ButtonProps) {
    const secundario = variante === 'secundario';

    return (
        <Pressable
            onPress={onPress}
            disabled={carregando}
            accessibilityRole="button"
            style={({ pressed }) => [
                styles.botao,
                secundario && styles.botaoSecundario,
                (pressed || carregando) && styles.pressionado,
            ]}>
            {carregando ? (
                <ActivityIndicator color={secundario ? Colors.texto : Colors.botao.texto} />
            ) : (
                <Text style={[styles.texto, secundario && styles.textoSecundario]}>{titulo}</Text>
            )}
        </Pressable>
    );
}
