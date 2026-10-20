import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

import { Colors } from '@/constants/colors';

import { styles } from './styles';

// Campo de texto com rótulo. Aceita todas as props do TextInput (secureTextEntry, keyboardType...)
interface FieldProps extends TextInputProps {
    rotulo: string;
}

export function Field({ rotulo, style, ...props }: FieldProps) {
    return (
        <View style={styles.grupo}>
            <Text style={styles.rotulo}>{rotulo}</Text>
            <TextInput
                style={[styles.entrada, style]}
                placeholderTextColor={Colors.campo.placeholder}
                accessibilityLabel={rotulo}
                {...props}
            />
        </View>
    );
}
