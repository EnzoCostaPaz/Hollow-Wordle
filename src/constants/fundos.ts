import { Fundo } from '@/@types/fundo';

// Fundos disponíveis. O botão "Trocar fundo" passa por eles na ordem, e o primeiro é o padrão.
//
// Para adicionar um fundo novo:
//   1. Coloque a imagem em assets/images/fundos/ (crie a pasta; o fundo atual continua em
//      assets/images/fundo.png).
//   2. Acrescente uma entrada abaixo, com um id único e o caminho da imagem.
// O caminho dentro do require precisa ser escrito por extenso (o Metro não aceita variável).
export const FUNDOS: Fundo[] = [
    { id: 'padrao', nome: 'Padrão', imagem: require('@/assets/images/fundo.png') },
    // { id: 'fundo-2', nome: 'Fundo 2', imagem: require('@/assets/images/fundos/fundo-2.png') },
    // { id: 'fundo-3', nome: 'Fundo 3', imagem: require('@/assets/images/fundos/fundo-3.png') },
];
