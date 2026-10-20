// src/app/(auth)/index.tsx — tela inicial ("/"): leva para o Login e para o Cadastro
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Background } from '@/components/background';
import { Button } from '@/components/button';
import { Logo } from '@/components/logo';
import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/fonts';

export default function Home() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();

    return (
        <View style={styles.tela}>
            <Background />

            <ScrollView
                contentContainerStyle={[
                    styles.conteudo,
                    { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 },
                ]}
                showsVerticalScrollIndicator={false}>
                <Logo largura={Math.min(300, width - 64)} />

                <Text style={styles.subtitulo}>Entre ou crie sua conta para jogar.</Text>

                <View style={styles.acoes}>
                    <Button titulo="Entrar" onPress={() => router.push('/login')} />
                    <Button
                        titulo="Criar conta"
                        variante="secundario"
                        onPress={() => router.push('/cadastro')}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: Colors.fundo,
    },
    conteudo: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    subtitulo: {
        marginTop: 28,
        fontFamily: Fonts.medium,
        fontSize: 15,
        color: Colors.texto,
        textAlign: 'center',
    },
    acoes: {
        width: '100%',
        maxWidth: 360,
        marginTop: 36,
        gap: 12,
    },
});
