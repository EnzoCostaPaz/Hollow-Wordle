import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from 'react-native';

import { Background } from '@/components/background';
import { Board } from '@/components/board';
import { Logo } from '@/components/logo';
import { ResultModal } from '@/components/result-modal';
import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/fonts';
import { useHollowWordle } from '@/hooks/useHollowWordle';

// Medidas tiradas do mockup web (tela de 1440 x 1024)
const LARGURA_CONTAINER = 760;
const PADDING_CONTAINER = 24;
const BORDA_CONTAINER = 2;

export default function JogoWeb() {
    const jogo = useHollowWordle();
    const { width, height } = useWindowDimensions();

    // Em telas mais baixas (notebooks) tudo encolhe um pouco para o tabuleiro caber sem rolar
    const escala = Math.min(1, Math.max(0.72, height / 1024));
    const larguraContainer = Math.min(LARGURA_CONTAINER, width - 32);
    const padding = Math.round(PADDING_CONTAINER * escala);

    // Teclado físico: letras, Backspace e Enter. Sem array de dependências de propósito:
    // o ouvinte é registrado de novo a cada render e sempre enxerga o estado atual do jogo.
    useEffect(() => {
        function aoPressionarTecla(evento: KeyboardEvent) {
            if (jogo.modalVisivel || evento.ctrlKey || evento.metaKey || evento.altKey) return;

            if (evento.key === 'Enter') {
                evento.preventDefault();
                jogo.enviarPalpite();
            } else if (evento.key === 'Backspace') {
                evento.preventDefault();
                jogo.apagarLetra();
            } else if (evento.key.length === 1 && /\p{L}/u.test(evento.key)) {
                jogo.digitarLetra(evento.key);
            }
        }

        window.addEventListener('keydown', aoPressionarTecla);
        return () => window.removeEventListener('keydown', aoPressionarTecla);
    });

    if (!jogo.personagem) {
        return (
            <View style={styles.tela}>
                <Background />
                <ActivityIndicator size="large" color={Colors.texto} style={styles.carregando} />
            </View>
        );
    }

    const terminou = jogo.status !== 'jogando';

    return (
        <View style={styles.tela}>
            <Background />

            <ScrollView
                contentContainerStyle={[
                    styles.conteudo,
                    { paddingTop: 64 * escala, paddingBottom: 48 * escala },
                ]}>
                <Logo largura={Math.min(575 * escala, width - 48)} />

                <Text style={[styles.dica, { marginTop: 56 * escala }]}>“{jogo.personagem.dica}”</Text>

                <View
                    style={[
                        styles.container,
                        {
                            width: larguraContainer,
                            minHeight: 360 * escala,
                            padding,
                            marginTop: 56 * escala,
                        },
                    ]}>
                    <Board
                        palpites={jogo.palpites}
                        entrada={jogo.entrada}
                        mostrarEntrada={!terminou}
                        largura={larguraContainer - 2 * (padding + BORDA_CONTAINER)}
                        tamanhoMaximo={Math.round(56 * escala)}
                        espaco={Math.round(15 * escala)}
                        espacoLinhas={Math.round(20 * escala)}
                        avisoId={jogo.avisoId}
                    />

                    {jogo.mensagem && (
                        <View style={styles.aviso}>
                            <Text style={styles.avisoTexto}>{jogo.mensagem}</Text>
                        </View>
                    )}
                </View>

                <Text style={styles.tentativas}>Tentativas Restantes: {jogo.tentativasRestantes}</Text>

                {jogo.palpites.length === 0 && (
                    <Text style={styles.ajuda}>Digite o nome do personagem e pressione Enter</Text>
                )}

                {terminou && (
                    <View style={styles.acoes}>
                        <Pressable
                            style={({ pressed }) => [styles.botaoSecundario, pressed && styles.pressionado]}
                            onPress={jogo.abrirModal}>
                            <Text style={styles.botaoSecundarioTexto}>Ver resultado</Text>
                        </Pressable>
                        <Pressable
                            style={({ pressed }) => [styles.botao, pressed && styles.pressionado]}
                            onPress={jogo.novoJogo}>
                            <Text style={styles.botaoTexto}>Jogar novamente</Text>
                        </Pressable>
                    </View>
                )}
            </ScrollView>

            <ResultModal
                visivel={jogo.modalVisivel}
                vitoria={jogo.status === 'vitoria'}
                tentativasUsadas={jogo.palpites.length}
                personagem={jogo.personagem}
                estatisticas={jogo.estatisticas}
                onJogarNovamente={jogo.novoJogo}
                onFechar={jogo.fecharModal}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: Colors.fundo,
    },
    carregando: {
        flex: 1,
    },
    conteudo: {
        flexGrow: 1,
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    dica: {
        maxWidth: 620,
        fontFamily: Fonts.medium,
        fontSize: 20,
        lineHeight: 30,
        color: Colors.texto,
        textAlign: 'center',
    },
    container: {
        alignItems: 'center',
        borderWidth: BORDA_CONTAINER,
        borderColor: Colors.container.borda,
        borderRadius: 10,
        backgroundColor: Colors.container.fundo,
    },
    aviso: {
        position: 'absolute',
        pointerEvents: 'none',
        top: -19,
        alignSelf: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: Colors.botao.fundo,
    },
    avisoTexto: {
        fontFamily: Fonts.semiBold,
        fontSize: 14,
        color: Colors.botao.texto,
    },
    tentativas: {
        marginTop: 28,
        fontFamily: Fonts.semiBold,
        fontSize: 20,
        color: Colors.texto,
    },
    ajuda: {
        marginTop: 6,
        fontFamily: Fonts.regular,
        fontSize: 14,
        color: Colors.textoSuave,
    },
    acoes: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 12,
        marginTop: 20,
    },
    botao: {
        paddingHorizontal: 28,
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: Colors.botao.fundo,
    },
    botaoTexto: {
        fontFamily: Fonts.semiBold,
        fontSize: 16,
        color: Colors.botao.texto,
    },
    botaoSecundario: {
        paddingHorizontal: 28,
        paddingVertical: 11,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.botao.borda,
    },
    botaoSecundarioTexto: {
        fontFamily: Fonts.semiBold,
        fontSize: 16,
        color: Colors.texto,
    },
    pressionado: {
        opacity: 0.7,
    },
});
