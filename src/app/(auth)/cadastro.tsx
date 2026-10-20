// src/app/(auth)/cadastro.tsx — campos do POST /fatec/login/v1/create: username, password, email e cep
import { useRouter } from 'expo-router';
import React, { useState } from 'react';

import { AuthScreen } from '@/components/auth-screen';
import { Button } from '@/components/button';
import { Field } from '@/components/field';
import { useAuth } from '@/hooks/useAuth';

export default function Cadastro() {
    const router = useRouter();
    const auth = useAuth();
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cep, setCep] = useState('');

    async function aoCadastrar() {
        const deuCerto = await auth.cadastrar({
            username: usuario.trim(),
            email: email.trim(),
            password: senha,
            cep,
        });
        // conta criada: segue para o login
        if (deuCerto) router.replace('/login');
    }

    return (
        <AuthScreen
            titulo="Criar conta"
            erro={auth.erro}
            textoRodape="Já tem conta?"
            linkRodape="Entrar"
            aoPressionarRodape={() => router.replace('/login')}>
            <Field
                rotulo="Usuário"
                placeholder="Escolha um usuário"
                autoCapitalize="none"
                autoCorrect={false}
                value={usuario}
                onChangeText={setUsuario}
            />
            <Field
                rotulo="E-mail"
                placeholder="seu@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
            />
            <Field
                rotulo="Senha"
                placeholder="Crie uma senha"
                secureTextEntry
                autoCapitalize="none"
                value={senha}
                onChangeText={setSenha}
            />
            <Field
                rotulo="CEP"
                placeholder="Somente números"
                keyboardType="numeric"
                maxLength={8}
                value={cep}
                onChangeText={setCep}
            />
            <Button titulo="Cadastrar" onPress={aoCadastrar} carregando={auth.carregando} />
        </AuthScreen>
    );
}
