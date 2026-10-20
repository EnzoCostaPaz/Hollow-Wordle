import { useState } from 'react';

import { Credenciais, NovoUsuario } from '@/@types/usuario';
import { useSessao } from '@/contexts/sessao';
import { autenticar, criarUsuario } from '@/services/authService';
import { validarCredenciais, validarNovoUsuario } from '@/utils/validacao';

// Regras de login e cadastro; as telas só cuidam da interface.
// entrar e cadastrar devolvem true quando deu certo.
export function useAuth() {
    const { iniciarSessao } = useSessao();
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    async function executar(erroDeValidacao: string | null, acao: () => Promise<void>) {
        if (erroDeValidacao) {
            setErro(erroDeValidacao);
            return false;
        }

        setErro(null);
        setCarregando(true);
        try {
            await acao();
            return true;
        } catch (error) {
            setErro(error instanceof Error ? error.message : 'Algo deu errado. Tente novamente.');
            return false;
        } finally {
            setCarregando(false);
        }
    }

    function entrar(credenciais: Credenciais) {
        return executar(validarCredenciais(credenciais), async () => {
            const sessao = await autenticar(credenciais);
            await iniciarSessao(sessao);
        });
    }

    function cadastrar(dados: NovoUsuario) {
        return executar(validarNovoUsuario(dados), () => criarUsuario(dados));
    }

    return { carregando, erro, entrar, cadastrar };
}
