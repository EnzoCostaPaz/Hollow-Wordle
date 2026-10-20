import { Redirect, Stack } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/colors';
import { useSessao } from '@/contexts/sessao';

// Grupo (auth): Home, Login e Cadastro. O nome entre parênteses não aparece na URL.
// Quem já está logado vai direto para o jogo; é este redirecionamento que leva o usuário ao
// jogo logo depois do login.
export default function AuthLayout() {
    const { sessao, carregando } = useSessao();

    if (carregando) return null; // ainda lendo a sessão salva
    if (sessao) return <Redirect href="/jogo" />;

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
