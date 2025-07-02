// src/components/FiltroPeriodo.jsx
import { useState } from "react";
import { CalendarDays, ChevronDown } from "lucide-react";

export default function FiltroPeriodo({ onChange }) {
  const [periodo, setPeriodo] = useState("hoje");
  const [dataPersonalizada, setDataPersonalizada] = useState("");

  function handlePeriodoSelecionado(valor) {
    setPeriodo(valor);
    const data = valor === "personalizado" ? new Date(dataPersonalizada) : null;
    onChange(valor, data);
  }

  function handleDataChange(e) {
    const data = e.target.value;
    setDataPersonalizada(data);
    onChange("personalizado", new Date(data));
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="flex items-center gap-2">
        <CalendarDays className="text-gray-500" size={20} />
        <label className="text-sm text-gray-700 font-medium">Período:</label>
      </div>
      <select
        value={periodo}
        onChange={(e) => handlePeriodoSelecionado(e.target.value)}
        className="px-3 py-2 rounded-xl border border-gray-300 bg-gray-50 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="hoje">Hoje</option>
        <option value="semana">Esta Semana</option>
        <option value="mes">Este Mês</option>
        <option value="personalizado">Data Personalizada</option>
      </select>

      {periodo === "personalizado" && (
        <input
          type="date"
          value={dataPersonalizada}
          onChange={handleDataChange}
          className="px-3 py-2 rounded-xl border border-gray-300 bg-gray-50 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
    </div>
  );
}
