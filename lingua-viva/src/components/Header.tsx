
import { useState } from "react";
import "../styles/Header.css";
import logoRaposa from "../assets/images/logo_raposa.png";

type Pagina = "inicio" | "sobre" | "contato";
type Perfil = "Aluno" | "Responsável" | "Professor" | "Gestor";

type HeaderProps = {
  paginaAtual: Pagina;
  onNavigate: (pagina: Pagina) => void;
};

function Header({ paginaAtual, onNavigate }: HeaderProps) {
  const [menuAberto, setMenuAberto] = useState(false);

  const navegacao: { nome: string; destino: Pagina }[] = [
    { nome: "Início", destino: "inicio" },
    { nome: "Sobre nós", destino: "sobre" },
    { nome: "Contato", destino: "contato" },
  ];

  const perfis: { nome: Perfil; icone: string }[] = [
    { nome: "Aluno", icone: "🎓" },
    { nome: "Responsável", icone: "❤️" },
    { nome: "Professor", icone: "📚" },
    { nome: "Gestor", icone: "⚙️" },
  ];

  const navegar = (pagina: Pagina) => {
    setMenuAberto(false);
    onNavigate(pagina);
  };

  const selecionarPerfil = (perfil: Perfil) => {
    setMenuAberto(false);

    window.dispatchEvent(
      new CustomEvent<Perfil>("linguaviva:login", {
        detail: perfil,
      })
    );
  };

  return (
    <header className="site-header">
      <div className="site-logo">
        <img
          src={logoRaposa}
          alt="Mascote raposa do Língua Viva"
          className="site-logo-image"
        />

        <div className="site-logo-text">
          <h2>
            Língua<span>Viva</span>
          </h2>
          <small>Pequenos passos, grandes descobertas</small>
        </div>
      </div>

      <nav className="site-nav" aria-label="Navegação principal">
        {navegacao.map((item) => (
          <a
            key={item.destino}
            href={`#${item.destino}`}
            className={
              paginaAtual === item.destino ? "site-nav-active" : ""
            }
            aria-current={
              paginaAtual === item.destino ? "page" : undefined
            }
            onClick={(e) => {
              e.preventDefault();
              navegar(item.destino);
            }}
          >
            {item.nome}
          </a>
        ))}
      </nav>

      <div className="site-menu-container">
        <button
          className="site-menu-button"
          type="button"
          onClick={() => setMenuAberto((aberto) => !aberto)}
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
          aria-controls="site-dropdown-menu"
        >
          {menuAberto ? "✕" : "☰"}
        </button>

        {menuAberto && (
          <div className="site-dropdown-menu" id="site-dropdown-menu">
            <nav
              className="site-mobile-nav"
              aria-label="Navegação para celular"
            >
              <strong>Navegação</strong>

              {navegacao.map((item) => (
                <a
                  key={item.destino}
                  href={`#${item.destino}`}
                  className={
                    paginaAtual === item.destino
                      ? "site-mobile-nav-active"
                      : ""
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    navegar(item.destino);
                  }}
                >
                  {item.nome}
                </a>
              ))}
            </nav>

            <div className="site-dropdown-header">
              <strong>Acesse sua área</strong>
              <small>Escolha seu perfil para continuar.</small>
            </div>

            <div className="site-dropdown-options">
              {perfis.map((perfil) => (
                <button
                  key={perfil.nome}
                  type="button"
                  onClick={() => selecionarPerfil(perfil.nome)}
                >
                  <span className="site-profile-icon">
                    {perfil.icone}
                  </span>
                  <span>{perfil.nome}</span>
                  <span className="site-profile-arrow">›</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
