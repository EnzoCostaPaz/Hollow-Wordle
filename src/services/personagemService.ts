import { Personagem } from '@/@types/personagem';
import personagens from '@/data/personagens.json';

// Por enquanto os personagens vêm do JSON local. Quando a API estiver pronta, basta trocar
// o corpo destas funções por chamadas HTTP: as telas já tratam o retorno como assíncrono.
export async function listarPersonagens(): Promise<Personagem[]> {
    return personagens;
}

// Sorteia um personagem, evitando repetir o da partida anterior.
export async function sortearPersonagem(excetoId?: string): Promise<Personagem> {
    const lista = await listarPersonagens();
    const opcoes = lista.filter((personagem) => personagem.id !== excetoId);
    const candidatos = opcoes.length > 0 ? opcoes : lista;
    return candidatos[Math.floor(Math.random() * candidatos.length)];
}
