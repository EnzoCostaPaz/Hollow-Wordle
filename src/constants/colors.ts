export const Colors = {
    // cor que aparece enquanto a imagem de fundo carrega
    fundo: '#0B1122',

    texto: '#FFFFFF',
    textoSuave: 'rgba(255, 255, 255, 0.72)',

    container: {
        fundo: 'rgba(75, 79, 106, 0.88)',
        borda: 'rgba(255, 255, 255, 0.92)',
    },

    letra: {
        correta: '#27AE69',
        presente: '#FBBD23',
        ausente: '#C6B7BE',
        digitando: 'rgba(255, 255, 255, 0.08)',
        bordaDigitando: 'rgba(255, 255, 255, 0.6)',
    },

    modal: {
        overlay: 'rgba(3, 5, 12, 0.78)',
        fundo: '#141B33',
        borda: 'rgba(255, 255, 255, 0.22)',
        cartao: 'rgba(255, 255, 255, 0.06)',
    },

    botao: {
        fundo: '#FFFFFF',
        texto: '#0B1122',
        borda: 'rgba(255, 255, 255, 0.7)',
    },

    erro: '#FF8A80',

    campo: {
        fundo: 'rgba(255, 255, 255, 0.08)',
        borda: 'rgba(255, 255, 255, 0.6)',
        placeholder: 'rgba(255, 255, 255, 0.45)',
    },
} as const;
