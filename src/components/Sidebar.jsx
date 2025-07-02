// src/components/Sidebar.jsx
import { Home, Users, BarChart2 } from "lucide-react";

export default function Sidebar({ paginaAtual, setPaginaAtual }) {
  const itensMenu = [
    { nome: "Dashboard", icone: <Home size={20} />, pagina: "dashboard" },
    { nome: "Equipes", icone: <Users size={20} />, pagina: "equipes" },
    { nome: "Relatórios", icone: <BarChart2 size={20} />, pagina: "relatorios" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-6 shadow-lg flex flex-col">
      <h1 className="text-3xl font-extrabold mb-10 tracking-tight text-white">
        EquipeDash
      </h1>

      <nav className="flex flex-col gap-3">
        {itensMenu.map((item, index) => (
          <button
            key={index}
            onClick={() => setPaginaAtual(item.pagina)}
            className={`flex items-center gap-3 text-sm font-medium px-4 py-3 rounded-xl transition-colors duration-200 ${
              paginaAtual === item.pagina
                ? "bg-gray-800 text-blue-400"
                : "hover:bg-gray-800 hover:text-blue-300 text-gray-300"
            }`}
            aria-current={paginaAtual === item.pagina ? "page" : undefined}
          >
            {item.icone}
            {item.nome}
          </button>
        ))}
      </nav>

      <div className="mt-auto text-xs text-gray-500 pt-6 border-t border-gray-700">
        © {new Date().getFullYear()} EquipeDash
      </div>
    </aside>
  );
}
