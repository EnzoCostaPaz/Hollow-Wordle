// src/app/(auth)/login.tsx — campos do POST /fatec/login/v1/auth: username e password
import { useRouter } from 'expo-router';
import React, { useState } from 'react';

import { AuthScreen } from '@/components/auth-screen';
import { Button } from '@/components/button';
import { Field } from '@/components/field';
import { useAuth } from '@/hooks/useAuth';

export default function Login() {
    const router = useRouter();
    const auth = useAuth();
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    function aoEntrar() {
        // Se o login der certo, a sessão é criada e o (auth)/_layout leva sozinho para o jogo
        auth.entrar({ username: usuario.trim(), password: senha });
    }

    return (
        <AuthScreen
            titulo="Entrar"
            erro={auth.erro}
            textoRodape="Não tem conta?"
            linkRodape="Cadastre-se"
            // replace (e não push) para Login e Cadastro não empilharem um em cima do outro
            aoPressionarRodape={() => router.replace('/cadastro')}>
            <Field
                rotulo="Usuário"
                placeholder="Seu usuário"
                autoCapitalize="none"
                autoCorrect={false}
                value={usuario}
                onChangeText={setUsuario}
            />
            <Field
                rotulo="Senha"
                placeholder="Sua senha"
                secureTextEntry
                autoCapitalize="none"
                value={senha}
                onChangeText={setSenha}
            />
            <Button titulo="Entrar" onPress={aoEntrar} carregando={auth.carregando} />
        </AuthScreen>
    );
}
