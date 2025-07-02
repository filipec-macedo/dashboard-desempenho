import { useState, useMemo } from "react";
import { isToday, isThisWeek, isThisMonth, isSameDay } from "date-fns";

import Indicadores from "./Indicadores";
import GraficoDesempenho from "./GraficoDesempenho";
import FiltroPeriodo from "./FiltroPeriodo";
import TabelaColaboradores from "./TabelaColaboradores";
import FiltroEquipe from "./FiltroEquipe";

export default function MainContent({ dadosColaboradores }) {
  const [periodoSelecionado, setPeriodoSelecionado] = useState("hoje");
  const [dataPersonalizada, setDataPersonalizada] = useState(null);
  const [equipeSelecionada, setEquipeSelecionada] = useState("");
  const [modoGrafico, setModoGrafico] = useState("equipe"); // 'equipe' ou 'colaborador'

  // Lista única de equipes (para filtro)
  const equipes = useMemo(() => {
    return [...new Set(dadosColaboradores.map((c) => c.equipe))];
  }, [dadosColaboradores]);

  // Atualiza filtros
  function handleFiltroChange(periodo, data) {
    setPeriodoSelecionado(periodo);
    setDataPersonalizada(data);
  }

  // Filtra os dados com base nos filtros ativos
  const dadosFiltrados = useMemo(() => {
    return dadosColaboradores.map((colab) => ({
      ...colab,
      data: new Date(colab.data),
    }));
}, [
    dadosColaboradores,
    periodoSelecionado,
    dataPersonalizada,
    equipeSelecionada,
  ]);

  console.log("Dados filtrados para o painel:", dadosFiltrados);

  return (
    <main className="flex-1 bg-gray-100 p-6 overflow-auto min-h-screen">
      {/* Filtros superiores */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <FiltroPeriodo onChange={handleFiltroChange} />
        <FiltroEquipe
          equipeSelecionada={equipeSelecionada}
          onChange={setEquipeSelecionada}
          equipes={equipes}
        />

        {/* Botões de troca do modo de gráfico */}
        <div className="ml-auto flex items-center gap-2">
          <label className="font-semibold">Modo do Gráfico:</label>
          <button
            onClick={() => setModoGrafico("equipe")}
            className={`px-4 py-2 rounded-l-md font-medium transition-colors ${
              modoGrafico === "equipe"
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
          >
            Equipe
          </button>
          <button
            onClick={() => setModoGrafico("colaborador")}
            className={`px-4 py-2 rounded-r-md font-medium transition-colors ${
              modoGrafico === "colaborador"
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
          >
            Colaborador
          </button>
        </div>
      </div>

      {/* Indicadores principais */}
      <Indicadores dados={dadosFiltrados} />

      {/* Gráfico de desempenho */}
      <GraficoDesempenho dados={dadosFiltrados} tipo={modoGrafico} />

      {/* Tabela de colaboradores */}
      <TabelaColaboradores dados={dadosFiltrados} />
    </main>
  );
}
