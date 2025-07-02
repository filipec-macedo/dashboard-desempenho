import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function GraficoDesempenho({ dados, tipo }) {
  // tipo = "colaborador" ou "equipe"
  // Prepara os dados para o gráfico conforme o tipo selecionado

  let dadosGrafico = [];

  if (tipo === "equipe") {
    // Agrupa por equipe somando produtividade média (exemplo)
    const mapaEquipes = {};

    dados.forEach(({ equipe, produtividade }) => {
      if (!mapaEquipes[equipe]) {
        mapaEquipes[equipe] = { produtividadeTotal: 0, count: 0 };
      }
      mapaEquipes[equipe].produtividadeTotal += produtividade;
      mapaEquipes[equipe].count += 1;
    });

    dadosGrafico = Object.entries(mapaEquipes).map(([equipe, val]) => ({
      nome: equipe,
      produtividade: (val.produtividadeTotal / val.count).toFixed(2),
    }));
  } else {
    // Por colaborador
    dadosGrafico = dados.map((colab) => ({
      nome: colab.nome,
      produtividade: colab.produtividade,
    }));
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Produtividade por {tipo === "equipe" ? "Equipe" : "Colaborador"}
      </h3>

      {dadosGrafico.length === 0 ? (
        <p className="text-gray-500">Nenhum dado encontrado para o filtro selecionado.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dadosGrafico}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nome" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="produtividade" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
