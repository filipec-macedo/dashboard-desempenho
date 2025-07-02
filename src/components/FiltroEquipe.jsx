// src/components/FiltroEquipe.jsx
import { Users } from "lucide-react";

export default function FiltroEquipe({ equipes, equipeSelecionada, onChange }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-6 flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Users className="text-gray-500" size={20} />
        <label className="text-sm text-gray-700 font-medium">Equipe:</label>
      </div>
      <select
        value={equipeSelecionada}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 rounded-xl border border-gray-300 bg-gray-50 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="">Todas</option>
        {equipes.map((equipe, index) => (
          <option key={index} value={equipe}>
            {equipe}
          </option>
        ))}
      </select>
    </div>
  );
}
