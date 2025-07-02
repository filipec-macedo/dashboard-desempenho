// src/pages/Dashboard.jsx
import { useState } from "react";

import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent"; // painel desempenho
import GerenciamentoEquipes from "../components/GerenciamentoEquipesPage"; // gerenciamento equipes
import Relatorios from "../components/Relatorios"; // opcional, se tiver página de relatórios

const dadosIniciais = [
  {
    nome: "Ana Silva",
    equipe: "Equipe Alfa",
    tarefasConcluidas: 32,
    produtividade: 90,
    pontualidade: 95,
    data: new Date("2025-06-30"),
  },
  {
    nome: "Carlos Souza",
    equipe: "Equipe Beta",
    tarefasConcluidas: 27,
    produtividade: 85,
    pontualidade: 88,
    data: new Date("2025-06-29"),
  },
  {
    nome: "Mariana Lima",
    equipe: "Equipe Gama",
    tarefasConcluidas: 35,
    produtividade: 92,
    pontualidade: 91,
    data: new Date("2025-06-25"),
  },
  {
    nome: "Pedro Santos",
    equipe: "Equipe Delta",
    tarefasConcluidas: 20,
    produtividade: 80,
    pontualidade: 85,
    data: new Date("2025-06-19"),
  },
];

export default function Dashboard({ user, onLogout }) {
  const [paginaAtual, setPaginaAtual] = useState("dashboard");
  const [dadosColaboradores, setDadosColaboradores] = useState(dadosIniciais);

  return (
    <div className="flex min-h-screen">
      <Sidebar paginaAtual={paginaAtual} setPaginaAtual={setPaginaAtual} />

      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        <header className="flex justify-between items-center mb-6">
          <p className="text-gray-700">
            Usuário: <strong>{user}</strong>
          </p>
          <button
            onClick={onLogout}
            className="text-red-600 hover:underline text-sm"
          >
            Sair
          </button>
        </header>

        {paginaAtual === "dashboard" && (
          <MainContent
            dadosColaboradores={dadosColaboradores}
            setDadosColaboradores={setDadosColaboradores}
          />
        )}

        {paginaAtual === "equipes" && (
          <GerenciamentoEquipes
            dados={dadosColaboradores}
            setDados={setDadosColaboradores}
          />
        )}

        {paginaAtual === "relatorios" && (
          <Relatorios />
        )}
      </div>
    </div>
  );
}
