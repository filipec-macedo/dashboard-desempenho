import { useState, useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [usuario, setUsuario] = useState("");

  useEffect(() => {
    const salvo = localStorage.getItem("usuarioLogado");
    if (salvo) setUsuario(salvo);
  }, []);

  function handleLogin(user) {
    setUsuario(user);
    localStorage.setItem("usuarioLogado", user);
  }

  function handleLogout() {
    setUsuario("");
    localStorage.removeItem("usuarioLogado");
  }

  return usuario ? (
    <Dashboard user={usuario} onLogout={handleLogout} />
  ) : (
    <Login onLogin={handleLogin} />
  );
}
