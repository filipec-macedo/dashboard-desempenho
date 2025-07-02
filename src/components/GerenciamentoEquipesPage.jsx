import { useState, useEffect } from "react";

export default function GerenciamentoEquipes({ dados, setDados }) {
  // Agrupa colaboradores por equipe no estado local, atualiza sempre que dados mudam
  const [equipes, setEquipes] = useState({});

  useEffect(() => {
    const agrupadas = {};
    dados.forEach((colab) => {
      if (!agrupadas[colab.equipe]) agrupadas[colab.equipe] = [];
      agrupadas[colab.equipe].push({
        ...colab,
        data: colab.data ? new Date(colab.data) : new Date(),
      });
    });
    setEquipes(agrupadas);
  }, [dados]);

  // Adiciona nova equipe via prompt, valida nome
  function adicionarEquipe() {
    const nome = prompt("Nome da nova equipe:");
    if (!nome?.trim()) return;
    if (equipes[nome]) {
      alert("Já existe uma equipe com esse nome.");
      return;
    }
    setEquipes({ ...equipes, [nome]: [] });
  }

  // Remove equipe com confirmação
  function removerEquipe(nomeEquipe) {
    if (confirm(`Deseja remover a equipe "${nomeEquipe}" e seus colaboradores?`)) {
      const atualizadas = { ...equipes };
      delete atualizadas[nomeEquipe];
      setEquipes(atualizadas);
    }
  }

  // Adiciona colaborador vazio para edição
  function adicionarColaborador(nomeEquipe) {
    const novoColab = {
      nome: "",
      tarefasConcluidas: 0,
      pontualidade: 0,
      produtividade: 0,
      equipe: nomeEquipe,
      data: new Date(),
    };
    setEquipes({
      ...equipes,
      [nomeEquipe]: [...(equipes[nomeEquipe] || []), novoColab],
    });
  }

  // Edita dados do colaborador e calcula produtividade automaticamente
  function editarColaborador(nomeEquipe, idx, campo, valor) {
    const novaLista = [...equipes[nomeEquipe]];
    const colab = { ...novaLista[idx] };

    if (campo === "tarefasConcluidas" || campo === "pontualidade") {
      const num = Number(valor);
      colab[campo] = isNaN(num) ? 0 : num;

      // Calcula produtividade (70% tarefas, 30% pontualidade)
      const tarefas = campo === "tarefasConcluidas" ? num : colab.tarefasConcluidas || 0;
      const pontualidade = campo === "pontualidade" ? num : colab.pontualidade || 0;
      colab.produtividade = Math.round(tarefas * 0.7 + pontualidade * 0.3);
    } else if (campo === "data") {
      colab.data = new Date(valor);
    } else {
      colab[campo] = valor;
    }

    novaLista[idx] = colab;
    setEquipes({ ...equipes, [nomeEquipe]: novaLista });
  }

  // Remove colaborador com confirmação
  function removerColaborador(nomeEquipe, idx) {
    if (confirm("Deseja remover este colaborador?")) {
      const novaLista = [...equipes[nomeEquipe]];
      novaLista.splice(idx, 1);
      setEquipes({ ...equipes, [nomeEquipe]: novaLista });
    }
  }

  // Salva alterações convertendo objeto equipes para array de colaboradores
  function salvarAlteracoes() {
    const novosDados = Object.entries(equipes).flatMap(([nomeEquipe, membros]) =>
      membros.map((m) => ({
        ...m,
        equipe: nomeEquipe,
        data: m.data instanceof Date ? m.data.toISOString() : m.data,
      }))
    );
    setDados(novosDados);
    alert("Alterações salvas!");
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Gerenciamento de Equipes</h2>
        <button
          onClick={adicionarEquipe}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          type="button"
        >
          + Nova Equipe
        </button>
      </div>

      {Object.entries(equipes).map(([nomeEquipe, membros]) => (
        <section
          key={nomeEquipe}
          className="mb-8 bg-white rounded-lg shadow p-6 border"
        >
          <header className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-700">{nomeEquipe}</h3>
            <div className="flex gap-4">
              <button
                onClick={() => adicionarColaborador(nomeEquipe)}
                className="text-sm text-green-600 hover:underline"
                type="button"
              >
                + Adicionar Colaborador
              </button>
              <button
                onClick={() => removerEquipe(nomeEquipe)}
                className="text-sm text-red-600 hover:underline"
                type="button"
              >
                Remover Equipe
              </button>
            </div>
          </header>

          {membros.length === 0 && (
            <p className="text-gray-500 italic mb-4">Nenhum colaborador nesta equipe.</p>
          )}

          <div className="grid gap-4">
            {membros.map((colab, idx) => (
              <div
                key={`${colab.nome}-${idx}`}
                className="bg-gray-50 rounded-md p-4 grid grid-cols-1 md:grid-cols-6 gap-4 items-center"
              >
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor={`nome-${nomeEquipe}-${idx}`}>
                    Nome
                  </label>
                  <input
                    id={`nome-${nomeEquipe}-${idx}`}
                    type="text"
                    value={colab.nome}
                    onChange={(e) =>
                      editarColaborador(nomeEquipe, idx, "nome", e.target.value)
                    }
                    placeholder="Nome do colaborador"
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor={`tarefas-${nomeEquipe}-${idx}`}>
                    Tarefas Concluídas
                  </label>
                  <input
                    id={`tarefas-${nomeEquipe}-${idx}`}
                    type="number"
                    min={0}
                    value={colab.tarefasConcluidas}
                    onChange={(e) =>
                      editarColaborador(nomeEquipe, idx, "tarefasConcluidas", e.target.value)
                    }
                    placeholder="0"
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor={`pontualidade-${nomeEquipe}-${idx}`}>
                    Pontualidade (%)
                  </label>
                  <input
                    id={`pontualidade-${nomeEquipe}-${idx}`}
                    type="number"
                    min={0}
                    max={100}
                    value={colab.pontualidade}
                    onChange={(e) =>
                      editarColaborador(nomeEquipe, idx, "pontualidade", e.target.value)
                    }
                    placeholder="Ex: 90"
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor={`produtividade-${nomeEquipe}-${idx}`}>
                    Produtividade (automática)
                  </label>
                  <input
                    id={`produtividade-${nomeEquipe}-${idx}`}
                    type="number"
                    value={colab.produtividade || 0}
                    readOnly
                    className="border border-gray-300 rounded px-3 py-2 w-full bg-gray-100 cursor-not-allowed"
                    tabIndex={-1}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor={`data-${nomeEquipe}-${idx}`}>
                    Data
                  </label>
                  <input
                    id={`data-${nomeEquipe}-${idx}`}
                    type="date"
                    value={colab.data.toISOString().slice(0, 10)}
                    onChange={(e) =>
                      editarColaborador(nomeEquipe, idx, "data", e.target.value)
                    }
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => removerColaborador(nomeEquipe, idx)}
                    className="text-red-600 hover:underline text-sm font-semibold"
                    type="button"
                    aria-label={`Remover colaborador ${colab.nome}`}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="flex justify-end">
        <button
          onClick={salvarAlteracoes}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
          type="button"
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}
