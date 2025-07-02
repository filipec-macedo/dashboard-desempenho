import GerenciamentoEquipes from "./GerenciamentoEquipes";

export default function GerenciamentoEquipesPage({ dados, setDados }) {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Gerenciamento de Equipes</h1>
      <GerenciamentoEquipes dados={dados} setDados={setDados} />
    </div>
  );
}
