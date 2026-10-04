import { Image } from 'expo-image';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Estatisticas } from '@/@types/jogo';
import { Personagem } from '@/@types/personagem';
import { Background } from '@/components/background';
import { Colors } from '@/constants/colors';
import { Fonts } from '@/constants/fonts';
import {carregarEstatisticas,ESTATISTICAS_INICIAIS,porcentagemDeVitorias,} from '@/services/estatisticasStorage';
import { listarPersonagens } from '@/services/personagemService';

const COLUNAS_DE_PERSONAGENS = 3;
const ESPACO = 12;

export default function DiretorioAndroid() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { width } = useWindowDimensions();
    const [estatisticas, setEstatisticas] = useState<Estatisticas>(ESTATISTICAS_INICIAIS);
    const [personagens, setPersonagens] = useState<Personagem[]>([]);

    // Lê de novo sempre que a tela aparece, para refletir a última partida
    useFocusEffect(
        useCallback(() => {
            let ativo = true;
            carregarEstatisticas().then((salvas) => ativo && setEstatisticas(salvas));
            listarPersonagens().then((lista) => ativo && setPersonagens(lista));
            return () => {
                ativo = false;
            };
        }, [])
    );

    const cartoes = [
        { rotulo: 'Partidas jogadas', valor: estatisticas.jogos },
        { rotulo: 'Vitórias', valor: estatisticas.vitorias },
        { rotulo: 'Porcentagem de vitória', valor: `${porcentagemDeVitorias(estatisticas)}%` },
        { rotulo: 'Sequência de vitórias', valor: estatisticas.sequenciaAtual },
        { rotulo: 'Melhor sequência', valor: estatisticas.melhorSequencia },
    ];

    const larguraPersonagem = Math.floor(
        (Math.min(width, 520) - 32 - ESPACO * (COLUNAS_DE_PERSONAGENS - 1)) / COLUNAS_DE_PERSONAGENS
    );
    const descobertos = personagens.filter((personagem) => estatisticas.descobertos.includes(personagem.id));

    return (
        <View style={styles.tela}>
            <Background />

            <ScrollView
                contentContainerStyle={[
                    styles.conteudo,
                    { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 32 },
                ]}
                showsVerticalScrollIndicator={false}>
                <Pressable
                    style={({ pressed }) => [styles.voltar, pressed && styles.pressionado]}
                    onPress={() => (router.canGoBack() ? router.back() : router.replace('/jogo'))}
                    hitSlop={8}
                    accessibilityRole="button">
                    <Text style={styles.voltarTexto}>‹  Voltar ao jogo</Text>
                </Pressable>

                <Text style={styles.titulo}>Diretório</Text>
                <Text style={styles.subtitulo}>Seu progresso por Hallownest</Text>

                <View style={styles.grade}>
                    {cartoes.map((cartao) => (
                        <View key={cartao.rotulo} style={styles.cartao}>
                            <Text style={styles.cartaoValor}>{cartao.valor}</Text>
                            <Text style={styles.cartaoRotulo}>{cartao.rotulo}</Text>
                        </View>
                    ))}
                </View>

                <Text style={styles.secao}>
                    Personagens descobertos {descobertos.length}/{personagens.length}
                </Text>

                <View style={styles.personagens}>
                    {personagens.map((personagem) => {
                        const descoberto = estatisticas.descobertos.includes(personagem.id);
                        return (
                            <View key={personagem.id} style={{ width: larguraPersonagem }}>
                                <View style={[styles.retrato, { height: larguraPersonagem }]}>
                                    {descoberto ? (
                                        <Image
                                            source={{ uri: personagem.foto }}
                                            style={styles.foto}
                                            contentFit="contain"
                                            transition={200}
                                            accessibilityLabel={personagem.nome}
                                        />
                                    ) : (
                                        <Text style={styles.interrogacao}>?</Text>
                                    )}
                                </View>
                                <Text style={[styles.nome, !descoberto && styles.nomeOculto]}>
                                    {descoberto ? personagem.nome : '???'}
                                </Text>
                            </View>
                        );
                    })}
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
        width: '100%',
        maxWidth: 520,
        alignSelf: 'center',
        paddingHorizontal: 16,
    },
    voltar: {
        alignSelf: 'flex-start',
        paddingVertical: 8,
    },
    voltarTexto: {
        fontFamily: Fonts.medium,
        fontSize: 14,
        color: Colors.textoSuave,
    },
    titulo: {
        marginTop: 12,
        fontFamily: Fonts.titulo,
        fontSize: 32,
        color: Colors.texto,
        textAlign: 'center',
    },
    subtitulo: {
        marginTop: 2,
        fontFamily: Fonts.regular,
        fontSize: 13,
        color: Colors.textoSuave,
        textAlign: 'center',
    },
    grade: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: ESPACO,
        marginTop: 28,
    },
    cartao: {
        flexGrow: 1,
        flexBasis: '40%',
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.modal.borda,
        backgroundColor: Colors.container.fundo,
    },
    cartaoValor: {
        fontFamily: Fonts.semiBold,
        fontSize: 30,
        color: Colors.texto,
    },
    cartaoRotulo: {
        marginTop: 2,
        fontFamily: Fonts.regular,
        fontSize: 12.5,
        color: Colors.textoSuave,
        textAlign: 'center',
    },
    secao: {
        marginTop: 32,
        marginBottom: 14,
        fontFamily: Fonts.titulo,
        fontSize: 18,
        color: Colors.texto,
        textAlign: 'center',
    },
    personagens: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: ESPACO,
    },
    retrato: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.modal.borda,
        backgroundColor: Colors.modal.cartao,
    },
    foto: {
        width: '100%',
        height: '100%',
    },
    interrogacao: {
        fontFamily: Fonts.titulo,
        fontSize: 34,
        color: Colors.textoSuave,
    },
    nome: {
        marginTop: 6,
        fontFamily: Fonts.medium,
        fontSize: 13,
        color: Colors.texto,
        textAlign: 'center',
    },
    nomeOculto: {
        color: Colors.textoSuave,
    },
    pressionado: {
        opacity: 0.7,
    },
});
