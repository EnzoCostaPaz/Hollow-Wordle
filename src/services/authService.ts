import { Credenciais, NovoUsuario, Sessao } from '@/@types/usuario';
import { API_URL } from '@/constants/api';

// Camada de acesso à API de login. Só conversa com o servidor: não conhece tela nem estado.
// Quando algo dá errado, lança um Error com uma mensagem pronta para mostrar ao usuário.

async function enviarJson(caminho: string, corpo: object): Promise<Response> {
    let resposta: Response;
    try {
        resposta = await fetch(`${API_URL}${caminho}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // permite que o cookie da resposta seja guardado e reenviado nas próximas chamadas
            credentials: 'include',
            body: JSON.stringify(corpo),
        });
    } catch {
        throw new Error('Não foi possível conectar ao servidor. Verifique sua internet.');
    }

    if (resposta.status >= 500) {
        throw new Error('O servidor está indisponível. Tente novamente em instantes.');
    }
    return resposta;
}

export async function criarUsuario(dados: NovoUsuario): Promise<void> {
    const resposta = await enviarJson('/create', dados);
    if (!resposta.ok) {
        throw new Error('Não foi possível criar a conta. Confira os dados ou tente outro usuário.');
    }
}

export async function autenticar(credenciais: Credenciais): Promise<Sessao> {
    const resposta = await enviarJson('/auth', credenciais);
    if (!resposta.ok) {
        throw new Error('Usuário ou senha inválidos.');
    }
    return {
        username: credenciais.username,
        cookie: resposta.headers.get('set-cookie'),
    };
}
