import {
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
} from "lucide-react";

export default function Indicadores({ dados }) {
  // Somar tarefas concluidas de todos os colaboradores
  const tarefasConcluidasTotal = dados.reduce(
    (acc, colab) => acc + (colab.tarefasConcluidas || 0),
    0
  );

  // Calcular média de pontualidade
  const pontualidadeMedia =
    dados.length > 0
      ? (dados.reduce((acc, colab) => acc + (colab.pontualidade || 0), 0) /
          dados.length
        ).toFixed(1)
      : 0;

  // Calcular média de produtividade
  const produtividadeMedia =
    dados.length > 0
      ? (dados.reduce((acc, colab) => acc + (colab.produtividade || 0), 0) /
          dados.length
        ).toFixed(1)
      : 0;

  // Encontrar a equipe com a maior soma de produtividade
  const produtividadePorEquipe = {};
  dados.forEach(({ equipe, produtividade }) => {
    if (!produtividadePorEquipe[equipe]) produtividadePorEquipe[equipe] = 0;
    produtividadePorEquipe[equipe] += produtividade || 0;
  });

  const melhorEquipe =
    Object.entries(produtividadePorEquipe).reduce(
      (melhor, [equipe, produtividade]) =>
        produtividade > melhor.produtividade
          ? { equipe, produtividade }
          : melhor,
      { equipe: "Nenhuma", produtividade: 0 }
    ).equipe;

  // Dados para exibir
  const indicadores = [
    {
      titulo: "Tarefas Concluídas",
      valor: tarefasConcluidasTotal,
      icone: <CheckCircle className="text-green-500" size={32} />,
    },
    {
      titulo: "Pontualidade Média",
      valor: pontualidadeMedia + "%",
      icone: <Clock className="text-blue-500" size={32} />,
    },
    {
      titulo: "Melhor Equipe",
      valor: melhorEquipe,
      icone: <Users className="text-purple-500" size={32} />,
    },
    {
      titulo: "Produtividade Média",
      valor: produtividadeMedia + "%",
      icone: <TrendingUp className="text-orange-500" size={32} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8 px-4 sm:px-0">
      {indicadores.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-4 bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="p-4 bg-gray-100 rounded-full flex items-center justify-center">
            {item.icone}
          </div>
          <div>
            <p className="text-sm text-gray-500 font-semibold">{item.titulo}</p>
            <p className="text-3xl font-bold text-gray-900">{item.valor}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
