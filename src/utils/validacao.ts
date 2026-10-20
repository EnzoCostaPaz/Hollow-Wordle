import { Credenciais, NovoUsuario } from '@/@types/usuario';

// Cada função devolve a mensagem de erro, ou null quando os dados estão certos.

export function validarCredenciais({ username, password }: Credenciais): string | null {
    if (!username || !password) return 'Informe usuário e senha.';
    return null;
}

export function validarNovoUsuario({ username, password, email, cep }: NovoUsuario): string | null {
    if (!username || !password || !email || !cep) return 'Preencha todos os campos.';
    if (!/^\S+@\S+\.\S+$/.test(email)) return 'Informe um e-mail válido.';
    if (!/^\d{8}$/.test(cep)) return 'O CEP deve ter 8 números.';
    return null;
}
