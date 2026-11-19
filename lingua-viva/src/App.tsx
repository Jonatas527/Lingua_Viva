
import { useEffect, useState } from "react";
import "./App.css";

import Home from "./pages/Home";
import SobreNos from "./pages/SobreNos";
import Contato from "./pages/Contato";
import Login from "./pages/Login";
import Gestor from "./pages/Gestor";
import { supabase } from "./lib/supabase";

export type Perfil =
  | "Aluno"
  | "Responsável"
  | "Professor"
  | "Gestor";

type Pagina = "inicio" | "sobre" | "contato";

function obterPaginaInicial(): Pagina {
  const pagina = window.location.hash.replace("#", "");

  if (
    pagina === "inicio" ||
    pagina === "sobre" ||
    pagina === "contato"
  ) {
    return pagina;
  }

  return "inicio";
}

function App() {
  const [pagina, setPagina] = useState<Pagina>(obterPaginaInicial);

  const [perfilSelecionado, setPerfilSelecionado] =
    useState<Perfil | null>(null);

  const [gestorAutenticado, setGestorAutenticado] =
    useState(false);

  const [mostrarSite, setMostrarSite] = useState(
    () => ["inicio", "sobre", "contato"].includes(
      window.location.hash.replace("#", "")
    )
  );

  useEffect(() => {
    const abrirLogin = (evento: Event) => {
      const eventoPersonalizado = evento as CustomEvent<Perfil>;

      setPerfilSelecionado(eventoPersonalizado.detail);
      setMostrarSite(true);

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    };

    const perfilAutenticado = (evento: Event) => {
      const eventoPersonalizado = evento as CustomEvent<{
        perfil: Perfil;
        nome: string;
      }>;

      const perfil = eventoPersonalizado.detail?.perfil;

      if (perfil === "Gestor") {
        setGestorAutenticado(true);
        setMostrarSite(false);
        setPerfilSelecionado(null);
      }
    };

    const voltarParaSite = () => {
      setMostrarSite(true);
      setPagina("inicio");
      setPerfilSelecionado(null);
      window.location.hash = "inicio";

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    };

    const restaurarSessao = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        setGestorAutenticado(false);
        return;
      }

      const { data: perfil, error } = await supabase
        .from("profiles")
        .select("tipo_perfil")
        .eq("id", data.session.user.id)
        .single();

      if (!error && perfil?.tipo_perfil === "Gestor") {
        setGestorAutenticado(true);
      }
    };

    const acompanharSessao = supabase.auth.onAuthStateChange(
      (_evento, sessao) => {
        if (!sessao) {
          setGestorAutenticado(false);
          setMostrarSite(true);
          return;
        }

        window.setTimeout(() => {
          void restaurarSessao();
        }, 0);
      }
    );

    const acompanharPagina = () => {
      setPagina(obterPaginaInicial());
      setPerfilSelecionado(null);
      setMostrarSite(true);
    };

    window.addEventListener("linguaviva:login", abrirLogin);

    window.addEventListener(
      "linguaviva:perfil-autenticado",
      perfilAutenticado
    );

    window.addEventListener(
      "linguaviva:voltar-site",
      voltarParaSite
    );

    window.addEventListener("hashchange", acompanharPagina);

    void restaurarSessao();

    return () => {
      window.removeEventListener("linguaviva:login", abrirLogin);

      window.removeEventListener(
        "linguaviva:perfil-autenticado",
        perfilAutenticado
      );

      window.removeEventListener(
        "linguaviva:voltar-site",
        voltarParaSite
      );

      window.removeEventListener("hashchange", acompanharPagina);

      acompanharSessao.data.subscription.unsubscribe();
    };
  }, []);

  const navegar = (destino: Pagina) => {
    setPerfilSelecionado(null);
    setPagina(destino);
    setMostrarSite(true);

    window.location.hash = destino;

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

  if (gestorAutenticado && !mostrarSite) {
    return <Gestor />;
  }

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
      {pagina === "inicio" && (
        <Home onNavigate={navegar} />
      )}

      {pagina === "sobre" && (
        <SobreNos onNavigate={navegar} />
      )}

      {pagina === "contato" && (
        <Contato onNavigate={navegar} />
      )}
    </div>
  );
}

export default App;
