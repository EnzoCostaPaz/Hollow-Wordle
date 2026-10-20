import React from 'react';
import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native';

import { useFundo } from '@/contexts/fundo';
import { useSessao } from '@/contexts/sessao';

import { styles } from './styles';

// Barra do topo das telas do jogo: mostra quem está logado e tem os botões de trocar o fundo
// e de sair. Cada tela passa o style com a posição que quer (no fluxo da tela ou por cima).
interface TopBarProps {
    style?: StyleProp<ViewStyle>;
}

export function TopBar({ style }: TopBarProps) {
    const { sessao, encerrarSessao } = useSessao();
    const { proximoFundo } = useFundo();

    return (
        <View style={[styles.barra, style]}>
            <View style={styles.usuario}>
                <View style={styles.indicador} />
                <Text style={styles.usuarioTexto} numberOfLines={1}>
                    Olá, {sessao?.username}
                </Text>
            </View>

            <View style={styles.acoes}>
                <Pressable
                    onPress={proximoFundo}
                    accessibilityRole="button"
                    accessibilityLabel="Trocar o fundo"
                    style={({ pressed }) => [styles.botao, pressed && styles.pressionado]}>
                    <Text style={styles.botaoTexto}>Trocar fundo</Text>
                </Pressable>
                <Pressable
                    onPress={encerrarSessao}
                    accessibilityRole="button"
                    accessibilityLabel="Sair da conta"
                    style={({ pressed }) => [styles.botao, pressed && styles.pressionado]}>
                    <Text style={styles.botaoTexto}>Sair</Text>
                </Pressable>
            </View>
        </View>
    );
}
