import { useState } from "react";
import { usuariosMock } from "../data/users";

export default function Login({ onLogin }) {
  const [usuarioSelecionado, setUsuarioSelecionado] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    if (!usuarioSelecionado) return alert("Selecione um usuário");
    onLogin(usuarioSelecionado);
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-br from-blue-100 to-blue-300 px-6">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-blue-800">
          Entrar no EquipeDash
        </h2>

        <div>
          <label
            htmlFor="usuario"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Selecione seu usuário
          </label>
          <select
            id="usuario"
            value={usuarioSelecionado}
            onChange={(e) => setUsuarioSelecionado(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">-- Escolha um usuário --</option>
            {usuariosMock.map((u) => (
              <option key={u.id} value={u.nome}>
                {u.nome} — {u.equipe}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
