import React, { createContext, useContext, useEffect, useState } from 'react';

import { Fundo } from '@/@types/fundo';
import { FUNDOS } from '@/constants/fundos';
import { carregarFundoId, salvarFundoId } from '@/services/fundoStorage';

// Guarda o fundo escolhido e deixa todas as telas (via <Background />) lerem e trocarem.
interface FundoContexto {
    fundo: Fundo;
    proximoFundo: () => void;
}

const FundoContext = createContext<FundoContexto | null>(null);

export function FundoProvider({ children }: { children: React.ReactNode }) {
    const [indice, setIndice] = useState(0);

    // Ao abrir o app, volta para o fundo escolhido da última vez
    useEffect(() => {
        carregarFundoId().then((id) => {
            const salvo = FUNDOS.findIndex((fundo) => fundo.id === id);
            if (salvo >= 0) setIndice(salvo);
        });
    }, []);

    function proximoFundo() {
        const proximo = (indice + 1) % FUNDOS.length;
        setIndice(proximo);
        salvarFundoId(FUNDOS[proximo].id);
    }

    return (
        <FundoContext.Provider value={{ fundo: FUNDOS[indice], proximoFundo }}>
            {children}
        </FundoContext.Provider>
    );
}

export function useFundo() {
    const contexto = useContext(FundoContext);
    if (!contexto) throw new Error('useFundo precisa ser usado dentro de <FundoProvider>');
    return contexto;
}
