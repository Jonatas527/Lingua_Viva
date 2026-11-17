
import { useEffect, useState } from "react";
import "./App.css";

import Home from "./pages/Home";
import SobreNos from "./pages/SobreNos";
import Contato from "./pages/Contato";
import Login from "./pages/Login";

export type Perfil = "Aluno" | "Responsável" | "Professor" | "Gestor";

type Pagina = "inicio" | "sobre" | "contato";

function App() {
  const [pagina, setPagina] = useState<Pagina>("inicio");
  const [perfilSelecionado, setPerfilSelecionado] = useState<Perfil | null>(
    null
  );

  useEffect(() => {
    const abrirLogin = (evento: Event) => {
      const eventoPersonalizado = evento as CustomEvent<Perfil>;
      setPerfilSelecionado(eventoPersonalizado.detail);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };

    window.addEventListener("linguaviva:login", abrirLogin);

    return () => {
      window.removeEventListener("linguaviva:login", abrirLogin);
    };
  }, []);

  const navegar = (destino: Pagina) => {
    setPerfilSelecionado(null);
    setPagina(destino);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  };

  const voltarDoLogin = () => {
    setPerfilSelecionado(null);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  };

  if (perfilSelecionado) {
    return (
      <Login
        perfil={perfilSelecionado}
        onVoltar={voltarDoLogin}
      />
    );
  }

  return (
    <div>
      {pagina === "inicio" && <Home onNavigate={navegar} />}

      {pagina === "sobre" && <SobreNos onNavigate={navegar} />}

      {pagina === "contato" && <Contato onNavigate={navegar} />}
    </div>
  );
}

export default App;
