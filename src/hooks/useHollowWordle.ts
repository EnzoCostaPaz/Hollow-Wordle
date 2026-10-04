import { useEffect, useRef, useState } from 'react';

import { Estatisticas, PalpiteAvaliado, ResultadoPalpite, StatusJogo } from '@/@types/jogo';
import { Personagem } from '@/@types/personagem';
import {
    MAX_LETRAS,
    MAX_TENTATIVAS,
    MIN_LETRAS,
    PAUSA_ANTES_DO_MODAL_MS,
    tempoDeRevelacao,
} from '@/constants/jogo';
import {
    carregarEstatisticas,
    ESTATISTICAS_INICIAIS,
    registrarPartida,
} from '@/services/estatisticasStorage';
import { sortearPersonagem } from '@/services/personagemService';
import { avaliarPalpite } from '@/utils/avaliarPalpite';
import { normalizarPalavra } from '@/utils/normalizar';

interface Opcoes {
    // Chamado quando as letras de um palpite terminam de virar (o app usa para vibrar)
    aoRevelarPalpite?: (resultado: { acertou: boolean; fimDeJogo: boolean }) => void;
}

// Toda a regra do jogo fica aqui; as telas web e android só cuidam da interface.
export function useHollowWordle({ aoRevelarPalpite }: Opcoes = {}) {
    const [personagem, setPersonagem] = useState<Personagem | null>(null);
    const [palpites, setPalpites] = useState<PalpiteAvaliado[]>([]);
    const [entrada, setEntrada] = useState('');
    const [status, setStatus] = useState<StatusJogo>('jogando');
    const [estatisticas, setEstatisticas] = useState<Estatisticas>(ESTATISTICAS_INICIAIS);
    const [mensagem, setMensagem] = useState<string | null>(null);
    // muda a cada palpite inválido, para o tabuleiro "tremer" a linha
    const [avisoId, setAvisoId] = useState(0);
    const [modalVisivel, setModalVisivel] = useState(false);

    const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
    const aoRevelarRef = useRef(aoRevelarPalpite);

    useEffect(() => {
        aoRevelarRef.current = aoRevelarPalpite;
    });

    useEffect(() => {
        let ativo = true;
        const pendentes = timers.current;

        carregarEstatisticas().then((salvas) => ativo && setEstatisticas(salvas));
        sortearPersonagem().then((sorteado) => ativo && setPersonagem(sorteado));

        return () => {
            ativo = false;
            pendentes.splice(0).forEach(clearTimeout);
        };
    }, []);

    function agendar(acao: () => void, atrasoMs: number) {
        timers.current.push(setTimeout(acao, atrasoMs));
    }

    function avisar(texto: string): ResultadoPalpite {
        setMensagem(texto);
        setAvisoId((id) => id + 1);
        agendar(() => setMensagem((atual) => (atual === texto ? null : atual)), 2200);
        return { tipo: 'invalido', motivo: texto };
    }

    // Usado pelo TextInput do app (recebe o texto inteiro digitado)
    function definirEntrada(texto: string) {
        if (status !== 'jogando') return;
        setEntrada(normalizarPalavra(texto).slice(0, MAX_LETRAS));
    }

    // Usados pelo teclado físico na web (uma tecla por vez)
    function digitarLetra(letra: string) {
        if (status !== 'jogando') return;
        setEntrada((atual) => (atual + normalizarPalavra(letra)).slice(0, MAX_LETRAS));
    }

    function apagarLetra() {
        if (status !== 'jogando') return;
        setEntrada((atual) => atual.slice(0, -1));
    }

    function enviarPalpite(): ResultadoPalpite {
        if (!personagem || status !== 'jogando') {
            return { tipo: 'invalido', motivo: 'Partida encerrada' };
        }
        if (entrada.length < MIN_LETRAS) {
            return avisar(`Digite pelo menos ${MIN_LETRAS} letras`);
        }
        if (palpites.some((palpite) => palpite.palavra === entrada)) {
            return avisar('Você já tentou esse nome');
        }

        const resposta = normalizarPalavra(personagem.nome);
        const acertou = entrada === resposta;
        const novosPalpites = [...palpites, { palavra: entrada, status: avaliarPalpite(entrada, resposta) }];
        const fimDeJogo = acertou || novosPalpites.length >= MAX_TENTATIVAS;
        const revelacao = tempoDeRevelacao(entrada.length);

        setPalpites(novosPalpites);
        setEntrada('');
        setMensagem(null);
        agendar(() => aoRevelarRef.current?.({ acertou, fimDeJogo }), revelacao);

        if (fimDeJogo) {
            setStatus(acertou ? 'vitoria' : 'derrota');
            registrarPartida(acertou, personagem.id).then(setEstatisticas);
            agendar(() => setModalVisivel(true), revelacao + PAUSA_ANTES_DO_MODAL_MS);
        }

        return { tipo: 'aceito', acertou, fimDeJogo };
    }

    async function novoJogo() {
        timers.current.splice(0).forEach(clearTimeout);
        setModalVisivel(false);

        const sorteado = await sortearPersonagem(personagem?.id);
        setPersonagem(sorteado);
        setPalpites([]);
        setEntrada('');
        setStatus('jogando');
        setMensagem(null);
    }

    return {
        personagem,
        palpites,
        entrada,
        status,
        estatisticas,
        mensagem,
        avisoId,
        modalVisivel,
        tentativasRestantes: MAX_TENTATIVAS - palpites.length,
        definirEntrada,
        digitarLetra,
        apagarLetra,
        enviarPalpite,
        novoJogo,
        abrirModal: () => setModalVisivel(true),
        fecharModal: () => setModalVisivel(false),
    };
}
