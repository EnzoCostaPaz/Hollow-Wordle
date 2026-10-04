import { Image } from 'expo-image';
import React from 'react';
import { Modal, Pressable, ScrollView, Text, useWindowDimensions, View } from 'react-native';

import { Estatisticas } from '@/@types/jogo';
import { Personagem } from '@/@types/personagem';
import { MAX_TENTATIVAS } from '@/constants/jogo';
import { porcentagemDeVitorias } from '@/services/estatisticasStorage';

import { styles } from './styles';

interface ResultModalProps {
    visivel: boolean;
    vitoria: boolean;
    tentativasUsadas: number;
    personagem: Personagem;
    estatisticas: Estatisticas;
    onJogarNovamente: () => void;
    onFechar: () => void;
    onAbrirDiretorio?: () => void; // só o app tem a tela de Diretório
}

// Inspirado no modal do Termo: no lugar da distribuição de tentativas aparecem
// a imagem, o nome e a descrição do personagem.
export function ResultModal({
    visivel,
    vitoria,
    tentativasUsadas,
    personagem,
    estatisticas,
    onJogarNovamente,
    onFechar,
    onAbrirDiretorio,
}: ResultModalProps) {
    const { width, height } = useWindowDimensions();

    const metricas = [
        { rotulo: 'jogos', valor: estatisticas.jogos },
        { rotulo: 'de vitórias', valor: `${porcentagemDeVitorias(estatisticas)}%` },
        { rotulo: 'sequência de vitórias', valor: estatisticas.sequenciaAtual },
        { rotulo: 'melhor sequência', valor: estatisticas.melhorSequencia },
    ];

    return (
        <Modal
            visible={visivel}
            transparent
            animationType="fade"
            statusBarTranslucent
            navigationBarTranslucent
            onRequestClose={onFechar}>
            <View style={styles.overlay}>
                <View style={[styles.cartao, { width: Math.min(460, width - 32), maxHeight: height - 48 }]}>
                    <ScrollView contentContainerStyle={styles.conteudo} showsVerticalScrollIndicator={false}>
                        <Text style={styles.titulo}>{vitoria ? 'Você acertou!' : 'Não foi dessa vez'}</Text>
                        <Text style={styles.subtitulo}>
                            {vitoria
                                ? `Descoberto em ${tentativasUsadas} de ${MAX_TENTATIVAS} tentativas`
                                : 'O personagem era'}
                        </Text>

                        <View style={styles.moldura}>
                            <Image
                                source={{ uri: personagem.foto }}
                                style={styles.foto}
                                contentFit="contain"
                                transition={250}
                                accessibilityLabel={personagem.nome}
                            />
                        </View>
                        <Text style={styles.nome}>{personagem.nome}</Text>
                        <Text style={styles.descricao}>{personagem.descricao}</Text>

                        <View style={styles.divisor} />

                        <Text style={styles.secao}>progresso</Text>
                        <View style={styles.metricas}>
                            {metricas.map((metrica) => (
                                <View key={metrica.rotulo} style={styles.metrica}>
                                    <Text style={styles.metricaValor}>{metrica.valor}</Text>
                                    <Text style={styles.metricaRotulo}>{metrica.rotulo}</Text>
                                </View>
                            ))}
                        </View>

                        <Pressable
                            style={({ pressed }) => [styles.botao, pressed && styles.pressionado]}
                            onPress={onJogarNovamente}
                            accessibilityRole="button">
                            <Text style={styles.botaoTexto}>Jogar novamente</Text>
                        </Pressable>

                        {onAbrirDiretorio && (
                            <Pressable
                                style={({ pressed }) => [styles.botaoSecundario, pressed && styles.pressionado]}
                                onPress={onAbrirDiretorio}
                                accessibilityRole="button">
                                <Text style={styles.botaoSecundarioTexto}>Ver diretório</Text>
                            </Pressable>
                        )}
                    </ScrollView>

                    {/* Fica depois do conteúdo de propósito: na web o foco inicial do modal cai em
                        "Jogar novamente", então apertar Enter já começa outra partida */}
                    <Pressable
                        style={styles.fechar}
                        onPress={onFechar}
                        hitSlop={12}
                        accessibilityRole="button"
                        accessibilityLabel="Fechar">
                        <Text style={styles.fecharTexto}>✕</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}
