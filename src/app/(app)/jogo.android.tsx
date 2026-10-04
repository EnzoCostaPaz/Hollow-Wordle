// src/app/(app)/jogo.android.tsx — interface do aplicativo
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    useWindowDimensions,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Background } from '@/components/background';
import { Board } from '@/components/board';
import { Logo } from '@/components/logo';
import { ResultModal } from '@/components/result-modal';
import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/fonts';
import { MAX_LETRAS } from '@/constants/jogo';
import { useHollowWordle } from '@/hooks/useHollowWordle';
import { vibrarPalpite, vibrarPalpiteInvalido } from '@/services/vibracao';

export default function JogoAndroid() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const campoRef = useRef<TextInput>(null);
    const scrollRef = useRef<ScrollView>(null);
    const alturaDoScroll = useRef(0);
    const fimDoTabuleiro = useRef(0);

    // Vibra a cada palavra enviada, certa ou errada, quando as letras terminam de virar
    const jogo = useHollowWordle({
        aoRevelarPalpite: ({ acertou, fimDeJogo }) => vibrarPalpite(acertou, fimDeJogo),
    });

    const terminou = jogo.status !== 'jogando';

    // Abre o teclado sozinho no começo de cada partida
    useEffect(() => {
        if (!jogo.personagem || terminou) return;
        const timer = setTimeout(() => campoRef.current?.focus(), 350);
        return () => clearTimeout(timer);
    }, [jogo.personagem, terminou]);

    // Mantém a linha que está sendo digitada logo acima do teclado, mostrando o máximo
    // possível do topo (logo e dica). Roda quando o teclado abre/fecha (a área visível muda
    // de altura) ou quando uma linha nova entra no tabuleiro.
    function manterTabuleiroVisivel() {
        const destino = fimDoTabuleiro.current + 12 - alturaDoScroll.current;
        scrollRef.current?.scrollTo({ y: Math.max(0, destino), animated: true });
    }

    function enviar() {
        const resultado = jogo.enviarPalpite();
        if (resultado.tipo === 'aceito' && resultado.fimDeJogo) {
            Keyboard.dismiss();
            return;
        }
        if (resultado.tipo === 'invalido') vibrarPalpiteInvalido();
        // mantém o teclado aberto para o próximo palpite (garantia caso algo tire o foco ao enviar)
        requestAnimationFrame(() => campoRef.current?.focus());
    }

    function abrirDiretorio() {
        jogo.fecharModal();
        router.push('/diretorio');
    }

    if (!jogo.personagem) {
        return (
            <View style={styles.tela}>
                <Background />
                <ActivityIndicator size="large" color={Colors.texto} style={styles.flex} />
            </View>
        );
    }

    return (
        <View style={styles.tela}>
            <Background />

            <KeyboardAvoidingView style={styles.flex} behavior="padding">
                <ScrollView
                    ref={scrollRef}
                    onLayout={(evento) => {
                        alturaDoScroll.current = evento.nativeEvent.layout.height;
                        manterTabuleiroVisivel();
                    }}
                    contentContainerStyle={[
                        styles.conteudo,
                        { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 },
                    ]}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}>
                    <View
                        style={styles.areaDoJogo}
                        onLayout={(evento) => {
                            const { y, height } = evento.nativeEvent.layout;
                            fimDoTabuleiro.current = y + height;
                            manterTabuleiroVisivel();
                        }}>
                        <Logo largura={Math.min(300, width - 64)} />
                        <Text style={styles.dica}>“{jogo.personagem.dica}”</Text>

                        <View style={styles.tabuleiro}>
                            {jogo.mensagem && (
                                <View style={styles.aviso}>
                                    <Text style={styles.avisoTexto}>{jogo.mensagem}</Text>
                                </View>
                            )}
                            <Board
                                palpites={jogo.palpites}
                                entrada={jogo.entrada}
                                mostrarEntrada={!terminou}
                                largura={width - 32}
                                tamanhoMaximo={36}
                                espaco={5}
                                espacoLinhas={6}
                                avisoId={jogo.avisoId}
                            />
                        </View>

                        {/* Campo invisível por cima do logo, da dica e do tabuleiro: tocar em
                            qualquer parte dessa área abre o teclado do celular */}
                        <TextInput
                            ref={campoRef}
                            style={styles.campoInvisivel}
                            value={jogo.entrada}
                            onChangeText={jogo.definirEntrada}
                            onSubmitEditing={enviar}
                            submitBehavior="submit"
                            editable={!terminou}
                            maxLength={MAX_LETRAS}
                            autoCapitalize="characters"
                            autoCorrect={false}
                            autoComplete="off"
                            spellCheck={false}
                            keyboardType="visible-password"
                            importantForAutofill="no"
                            returnKeyType="send"
                            caretHidden
                            contextMenuHidden
                            accessibilityLabel="Digite o nome do personagem"
                        />
                    </View>

                    <Text style={styles.tentativas}>Tentativas Restantes: {jogo.tentativasRestantes}</Text>

                    {jogo.palpites.length === 0 && (
                        <Text style={styles.ajuda}>Toque no tabuleiro, digite o nome e envie</Text>
                    )}

                    {terminou && (
                        <Pressable
                            style={({ pressed }) => [styles.botao, pressed && styles.pressionado]}
                            onPress={jogo.novoJogo}>
                            <Text style={styles.botaoTexto}>Jogar novamente</Text>
                        </Pressable>
                    )}

                    <Pressable
                        style={({ pressed }) => [styles.botaoDiretorio, pressed && styles.pressionado]}
                        onPress={abrirDiretorio}
                        accessibilityRole="button">
                        <Text style={styles.botaoDiretorioTexto}>Diretório</Text>
                    </Pressable>
                </ScrollView>
            </KeyboardAvoidingView>

            <ResultModal
                visivel={jogo.modalVisivel}
                vitoria={jogo.status === 'vitoria'}
                tentativasUsadas={jogo.palpites.length}
                personagem={jogo.personagem}
                estatisticas={jogo.estatisticas}
                onJogarNovamente={jogo.novoJogo}
                onFechar={jogo.fecharModal}
                onAbrirDiretorio={abrirDiretorio}
            />
        </View>
    );
}

const styles = StyleSheet.create({
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
        paddingHorizontal: 16,
    },
    areaDoJogo: {
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    dica: {
        maxWidth: 340,
        marginTop: 36,
        fontFamily: Fonts.medium,
        fontSize: 13,
        lineHeight: 19,
        color: Colors.texto,
        textAlign: 'center',
    },
    tabuleiro: {
        alignSelf: 'stretch',
        marginTop: 40,
    },
    campoInvisivel: {
        ...StyleSheet.absoluteFill,
        opacity: 0,
        color: 'transparent',
    },
    aviso: {
        position: 'absolute',
        top: -34,
        alignSelf: 'center',
        zIndex: 1,
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 8,
        backgroundColor: Colors.botao.fundo,
    },
    avisoTexto: {
        fontFamily: Fonts.semiBold,
        fontSize: 13,
        color: Colors.botao.texto,
    },
    tentativas: {
        marginTop: 36,
        fontFamily: Fonts.semiBold,
        fontSize: 15,
        color: Colors.texto,
    },
    ajuda: {
        marginTop: 4,
        fontFamily: Fonts.regular,
        fontSize: 12.5,
        color: Colors.textoSuave,
    },
    botao: {
        marginTop: 24,
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 999,
        backgroundColor: Colors.botao.fundo,
    },
    botaoTexto: {
        fontFamily: Fonts.semiBold,
        fontSize: 15,
        color: Colors.botao.texto,
    },
    botaoDiretorio: {
        marginTop: 16,
        paddingHorizontal: 32,
        paddingVertical: 10,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: Colors.botao.borda,
    },
    botaoDiretorioTexto: {
        fontFamily: Fonts.semiBold,
        fontSize: 14,
        color: Colors.texto,
    },
    pressionado: {
        opacity: 0.7,
    },
});
