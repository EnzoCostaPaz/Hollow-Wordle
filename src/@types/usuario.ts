// Corpo do POST /auth
export interface Credenciais {
    username: string;
    password: string;
}

// Corpo do POST /create
export interface NovoUsuario extends Credenciais {
    email: string;
    cep: string;
}

// O que o app guarda depois de um login bem-sucedido
export interface Sessao {
    username: string;
    // Cabeçalho Set-Cookie devolvido pelo servidor. Na web o navegador guarda o cookie
    // sozinho e o JavaScript não consegue lê-lo, por isso pode ser null.
    cookie: string | null;
}
