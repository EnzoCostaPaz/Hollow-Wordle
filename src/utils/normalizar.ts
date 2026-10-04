const SEM_ACENTO: Record<string, string> = {
    Á: 'A', À: 'A', Â: 'A', Ã: 'A', Ä: 'A',
    É: 'E', È: 'E', Ê: 'E', Ë: 'E',
    Í: 'I', Ì: 'I', Î: 'I', Ï: 'I',
    Ó: 'O', Ò: 'O', Ô: 'O', Õ: 'O', Ö: 'O',
    Ú: 'U', Ù: 'U', Û: 'U', Ü: 'U',
    Ç: 'C', Ñ: 'N',
};

// Deixa só letras de A a Z maiúsculas: "Zote, o Poderoso!" -> "ZOTEOPODEROSO"
// (tabela própria em vez de String.normalize para funcionar igual em qualquer engine JS)
export function normalizarPalavra(texto: string): string {
    return texto
        .toUpperCase()
        .replace(/[ÁÀÂÃÄÉÈÊËÍÌÎÏÓÒÔÕÖÚÙÛÜÇÑ]/g, (letra) => SEM_ACENTO[letra])
        .replace(/[^A-Z]/g, '');
}
