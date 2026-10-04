import { Redirect } from 'expo-router';
import React from 'react';

// Nesta etapa o jogo é a primeira tela. Quando o login for criado em (auth)/index.tsx
// (como no projeto da Pokédex), apague este arquivo para "/" passar a ser o login.
export default function Index() {
    return <Redirect href="/jogo" />;
}
