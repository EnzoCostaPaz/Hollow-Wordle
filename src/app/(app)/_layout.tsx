import { Redirect, Stack } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/colors';
import { useSessao } from '@/contexts/sessao';

// Grupo (app): só quem está logado entra (jogo e diretório). Sem sessão, volta para a Home.
export default function AppLayout() {
    const { sessao, carregando } = useSessao();

    if (carregando) return null; // ainda lendo a sessão salva
    if (!sessao) return <Redirect href="/" />;

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: 'fade',
                contentStyle: { backgroundColor: Colors.fundo },
            }}
        />
    );
}
