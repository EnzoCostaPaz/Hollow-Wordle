import React from 'react';
import {
    KeyboardAvoidingView,
    Pressable,
    ScrollView,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Background } from '@/components/background';
import { Logo } from '@/components/logo';

import { styles } from './styles';

// Estrutura compartilhada pelas telas de Login e Cadastro: fundo, logo, cartão com título,
// os campos (children) e o link para a outra tela.
interface AuthScreenProps {
    titulo: string;
    children: React.ReactNode;
    erro?: string | null; // mensagem exibida logo abaixo do título
    textoRodape: string; // ex.: "Não tem conta?"
    linkRodape: string; // ex.: "Cadastre-se"
    aoPressionarRodape: () => void;
}

export function AuthScreen({
    titulo,
    children,
    erro,
    textoRodape,
    linkRodape,
    aoPressionarRodape,
}: AuthScreenProps) {
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();

    return (
        <View style={styles.tela}>
            <Background />

            <KeyboardAvoidingView style={styles.flex} behavior="padding">
                <ScrollView
                    contentContainerStyle={[
                        styles.conteudo,
                        { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 },
                    ]}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}>
                    <Logo largura={Math.min(240, width - 64)} />

                    <View style={styles.cartao}>
                        <Text style={styles.titulo}>{titulo}</Text>
                        {erro ? (
                            <Text style={styles.erro} accessibilityRole="alert">
                                {erro}
                            </Text>
                        ) : null}
                        {children}
                    </View>

                    <Pressable onPress={aoPressionarRodape} accessibilityRole="link">
                        <Text style={styles.rodape}>
                            {textoRodape} <Text style={styles.rodapeLink}>{linkRodape}</Text>
                        </Text>
                    </Pressable>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
