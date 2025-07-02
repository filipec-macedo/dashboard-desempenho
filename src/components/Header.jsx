export default function Header({ user, onLogout }) {
  return (
    <header className="w-full h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
      <h2 className="text-xl font-semibold">Painel de Desempenho</h2>
      <div className="flex items-center gap-4 text-gray-600">
        <span>Bem-vindo, {user}</span>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
