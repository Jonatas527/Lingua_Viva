
import logoRaposa from "../assets/images/logo_raposa.png";

type ItemMenu =
  | "Visão geral"
  | "Professor"
  | "Responsável"
  | "Gestor"
  | "Configurações";

type SidebarProps = {
  paginaAtiva: ItemMenu;
  onNavegar: (pagina: ItemMenu) => void;
};

function Sidebar({ paginaAtiva, onNavegar }: SidebarProps) {
  const itensMenu: {
    nome: ItemMenu;
    icone: string;
  }[] = [
    { nome: "Visão geral", icone: "⌂" },
    { nome: "Professor", icone: "♙" },
    { nome: "Responsável", icone: "♧" },
    { nome: "Gestor", icone: "▦" },
    { nome: "Configurações", icone: "⚙" },
  ];

  return (
    <aside className="gestor-sidebar">
      <div className="gestor-sidebar-logo">
        <img
          src={logoRaposa}
          alt="Logo LínguaViva"
          className="gestor-logo-imagem"
        />

        <div>
          <h2>LínguaViva</h2>
          <span>Painel administrativo</span>
        </div>
      </div>

      <div className="gestor-sidebar-menu">
        <span className="gestor-menu-titulo">
          MENU PRINCIPAL
        </span>

        <nav>
          {itensMenu.map((item) => (
            <button
              key={item.nome}
              type="button"
              className={`gestor-menu-item ${
                paginaAtiva === item.nome ? "ativo" : ""
              }`}
              onClick={() => onNavegar(item.nome)}
            >
              <span className="gestor-menu-icone">
                {item.icone}
              </span>

              <span>{item.nome}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="gestor-sidebar-rodape">
        <div className="gestor-ajuda">
          <span className="gestor-ajuda-icone">?</span>

          <div>
            <strong>Precisa de ajuda?</strong>
            <span>Entre em contato com o suporte.</span>
          </div>
        </div>

        <div className="gestor-versao">
          LínguaViva © 2026
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
