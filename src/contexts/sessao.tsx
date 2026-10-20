import React, { createContext, useContext, useEffect, useState } from 'react';

import { Sessao } from '@/@types/usuario';
import { carregarSessao, limparSessao, salvarSessao } from '@/services/sessaoStorage';

// Guarda quem está logado e deixa todas as telas lerem isso. Quem decide para onde ir
// quando não há sessão são os _layout de (auth) e (app).
interface SessaoContexto {
    sessao: Sessao | null;
    carregando: boolean; // true enquanto a sessão salva ainda está sendo lida ao abrir o app
    iniciarSessao: (sessao: Sessao) => Promise<void>;
    encerrarSessao: () => Promise<void>;
}

const SessaoContext = createContext<SessaoContexto | null>(null);

export function SessaoProvider({ children }: { children: React.ReactNode }) {
    const [sessao, setSessao] = useState<Sessao | null>(null);
    const [carregando, setCarregando] = useState(true);

    // Ao abrir o app, recupera o login feito antes (se existir)
    useEffect(() => {
        carregarSessao().then((salva) => {
            setSessao(salva);
            setCarregando(false);
        });
    }, []);

    async function iniciarSessao(nova: Sessao) {
        await salvarSessao(nova);
        setSessao(nova);
    }

    async function encerrarSessao() {
        await limparSessao();
        setSessao(null);
    }

    return (
        <SessaoContext.Provider value={{ sessao, carregando, iniciarSessao, encerrarSessao }}>
            {children}
        </SessaoContext.Provider>
    );
}

export function useSessao() {
    const contexto = useContext(SessaoContext);
    if (!contexto) throw new Error('useSessao precisa ser usado dentro de <SessaoProvider>');
    return contexto;
}
