export default function TabelaColaboradores({ dados }) {
  if (dados.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6">
        Nenhum colaborador encontrado para o filtro selecionado.
      </p>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 overflow-auto">
      <table className="w-full table-auto text-left">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="py-2 px-4">Colaborador</th>
            <th className="py-2 px-4">Equipe</th>
            <th className="py-2 px-4">Tarefas Concluídas</th>
            <th className="py-2 px-4">Produtividade (%)</th>
            <th className="py-2 px-4">Pontualidade (%)</th>
            <th className="py-2 px-4">Data</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((colab, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="py-2 px-4">{colab.nome}</td>
              <td className="py-2 px-4">{colab.equipe}</td>
              <td className="py-2 px-4">{colab.tarefasConcluidas}</td>
              <td className="py-2 px-4">{colab.produtividade}</td>
              <td className="py-2 px-4">{colab.pontualidade}</td>
              <td className="py-2 px-4">
                {colab.data.toLocaleDateString("pt-BR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
