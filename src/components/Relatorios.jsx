import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Relatorios({ dados }) {
  // Estados para filtro
  const [filtroEquipe, setFiltroEquipe] = useState("Todas");
  const [filtroPeriodo, setFiltroPeriodo] = useState("todos"); // ex: 'todos', '30dias', '7dias'

  // Calcula data limite para filtros simples
  const dataLimite = useMemo(() => {
    const hoje = new Date();
    if (filtroPeriodo === "7dias") {
      hoje.setDate(hoje.getDate() - 7);
    } else if (filtroPeriodo === "30dias") {
      hoje.setDate(hoje.getDate() - 30);
    } else {
      return null;
    }
    return hoje;
  }, [filtroPeriodo]);

  // Filtra dados conforme filtros
  const dadosFiltrados = useMemo(() => {
    return dados.filter((colab) => {
      const dataColab = new Date(colab.data);
      const passaEquipe = filtroEquipe === "Todas" || colab.equipe === filtroEquipe;
      const passaPeriodo = !dataLimite || dataColab >= dataLimite;
      return passaEquipe && passaPeriodo;
    });
  }, [dados, filtroEquipe, dataLimite]);

  // Agrupa dados por equipe para gráficos
  const dadosPorEquipe = useMemo(() => {
    const agrup = {};
    dadosFiltrados.forEach(({ equipe, tarefasConcluidas, produtividade, pontualidade }) => {
      if (!agrup[equipe]) {
        agrup[equipe] = { tarefas: 0, produtividade: 0, pontualidade: 0, count: 0 };
      }
      agrup[equipe].tarefas += tarefasConcluidas;
      agrup[equipe].produtividade += produtividade;
      agrup[equipe].pontualidade += pontualidade;
      agrup[equipe].count += 1;
    });

    return Object.entries(agrup).map(([equipe, valores]) => ({
      equipe,
      tarefas: valores.tarefas,
      produtividade: Math.round(valores.produtividade / valores.count) || 0,
      pontualidade: Math.round(valores.pontualidade / valores.count) || 0,
    }));
  }, [dadosFiltrados]);

  // Cores para gráfico de pizza
  const cores = ["#4ade80", "#60a5fa", "#fbbf24", "#f87171", "#a78bfa"];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Relatórios</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Filtro de Equipe */}
        <select
          className="border rounded px-4 py-2 w-full sm:w-48"
          value={filtroEquipe}
          onChange={(e) => setFiltroEquipe(e.target.value)}
        >
          <option value="Todas">Todas as Equipes</option>
          {[...new Set(dados.map((d) => d.equipe))].map((equipe) => (
            <option key={equipe} value={equipe}>
              {equipe}
            </option>
          ))}
        </select>

        {/* Filtro de Período */}
        <select
          className="border rounded px-4 py-2 w-full sm:w-48"
          value={filtroPeriodo}
          onChange={(e) => setFiltroPeriodo(e.target.value)}
        >
          <option value="todos">Todo o Período</option>
          <option value="30dias">Últimos 30 dias</option>
          <option value="7dias">Últimos 7 dias</option>
        </select>
      </div>

      {/* Gráfico de barras - tarefas concluídas por equipe */}
      <section className="mb-12 bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Tarefas Concluídas por Equipe
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dadosPorEquipe} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="equipe" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="tarefas" fill="#4ade80" name="Tarefas" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* Gráfico de pizza - produtividade média por equipe */}
      <section className="mb-12 bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Produtividade Média por Equipe
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={dadosPorEquipe}
              dataKey="produtividade"
              nameKey="equipe"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {dadosPorEquipe.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </section>

      {/* Tabela resumo */}
      <section className="bg-white p-6 rounded shadow overflow-auto">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Resumo por Equipe</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-2 px-4">Equipe</th>
              <th className="py-2 px-4">Tarefas Concluídas</th>
              <th className="py-2 px-4">Produtividade Média</th>
              <th className="py-2 px-4">Pontualidade Média (%)</th>
            </tr>
          </thead>
          <tbody>
            {dadosPorEquipe.map(({ equipe, tarefas, produtividade, pontualidade }) => (
              <tr key={equipe} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-2 px-4">{equipe}</td>
                <td className="py-2 px-4">{tarefas}</td>
                <td className="py-2 px-4">{produtividade}%</td>
                <td className="py-2 px-4">{pontualidade}%</td>
              </tr>
            ))}
            {dadosPorEquipe.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  Nenhum dado disponível para o filtro selecionado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
