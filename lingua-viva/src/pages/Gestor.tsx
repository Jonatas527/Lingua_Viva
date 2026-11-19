
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import GerenciamentoUsuarios from "../components/GerenciamentoUsuarios";
import "../styles/Gestor.css";

type ItemMenu =
  | "Visão geral"
  | "Professor"
  | "Responsável"
  | "Gestor"
  | "Configurações";

function Gestor() {
  const [paginaAtiva, setPaginaAtiva] =
    useState<ItemMenu>("Visão geral");

  function voltarParaInicio() {
    window.dispatchEvent(
      new Event("linguaviva:voltar-site")
    );
  }

  return (
    <div className="gestor-layout">
      <Sidebar
        paginaAtiva={paginaAtiva}
        onNavegar={setPaginaAtiva}
      />

      <main className="gestor-conteudo">
        <header className="gestor-header">
          <div>
            <span className="gestor-breadcrumb">
              Painel administrativo / {paginaAtiva}
            </span>

            <h1>
              {paginaAtiva === "Visão geral"
                ? "Visão geral"
                : paginaAtiva === "Gestor"
                ? "Gerenciamento de usuários"
                : paginaAtiva}
            </h1>

            <p>Bem-vindo ao painel administrativo do LínguaViva!</p>
          </div>

          <div className="gestor-header-direita">
            <button
              type="button"
              className="gestor-voltar-site"
              onClick={voltarParaInicio}
            >
              ← Voltar ao site
            </button>

            <button
              type="button"
              className="gestor-notificacao"
              aria-label="Notificações"
            >
              ♧
              <span />
            </button>

            <div className="gestor-usuario">
              <div className="gestor-avatar">G</div>
              <div>
                <strong>Gestor</strong>
                <span>Administrador</span>
              </div>
            </div>
          </div>
        </header>

        {paginaAtiva === "Gestor" ? (
          <GerenciamentoUsuarios />
        ) : paginaAtiva === "Visão geral" ? (
          <>
            <section className="gestor-boas-vindas">
              <div>
                <span>PAINEL DE CONTROLE</span>
                <h2>Olá, Gestor! 👋</h2>
                <p>
                  Acompanhe o desempenho e gerencie sua plataforma
                  educacional.
                </p>
              </div>

              <div className="gestor-boas-vindas-icone">🦊</div>
            </section>

            <section className="gestor-indicadores">
              <article className="gestor-card-indicador">
                <div className="gestor-card-topo">
                  <span>Total de alunos</span>
                  <div className="gestor-card-icone azul">♙</div>
                </div>
                <strong>0</strong>
                <small>Alunos cadastrados</small>
              </article>

              <article className="gestor-card-indicador">
                <div className="gestor-card-topo">
                  <span>Alunos ativos</span>
                  <div className="gestor-card-icone verde">✓</div>
                </div>
                <strong>0</strong>
                <small>Contas ativas</small>
              </article>

              <article className="gestor-card-indicador">
                <div className="gestor-card-topo">
                  <span>Professores</span>
                  <div className="gestor-card-icone roxo">♧</div>
                </div>
                <strong>0</strong>
                <small>Professores cadastrados</small>
              </article>

              <article className="gestor-card-indicador">
                <div className="gestor-card-topo">
                  <span>Responsáveis</span>
                  <div className="gestor-card-icone laranja">♡</div>
                </div>
                <strong>0</strong>
                <small>Responsáveis cadastrados</small>
              </article>
            </section>

            <section className="gestor-secao">
              <div className="gestor-secao-cabecalho">
                <div>
                  <h2>Gerenciamento</h2>
                  <p>Acesse rapidamente as áreas da plataforma.</p>
                </div>
              </div>

              <div className="gestor-gerenciamento">
                {[
                  {
                    titulo: "Professores",
                    descricao: "Gerencie os professores da plataforma.",
                    icone: "♙",
                    destino: "Professor" as ItemMenu,
                  },
                  {
                    titulo: "Responsáveis",
                    descricao: "Gerencie os responsáveis cadastrados.",
                    icone: "♡",
                    destino: "Responsável" as ItemMenu,
                  },
                  {
                    titulo: "Gestores",
                    descricao: "Gerencie os acessos administrativos.",
                    icone: "▦",
                    destino: "Gestor" as ItemMenu,
                  },
                ].map((item) => (
                  <button
                    key={item.destino}
                    type="button"
                    className="gestor-gerenciamento-card"
                    onClick={() => setPaginaAtiva(item.destino)}
                  >
                    <span className="gestor-gerenciamento-icone">
                      {item.icone}
                    </span>

                    <strong>{item.titulo}</strong>
                    <span>{item.descricao}</span>
                    <small>Gerenciar →</small>
                  </button>
                ))}
              </div>
            </section>

            <section className="gestor-secao gestor-atividade">
              <div>
                <h2>Atividade recente</h2>
                <p>As atividades da plataforma aparecerão aqui.</p>
              </div>

              <div className="gestor-atividade-vazia">
                <span>📋</span>
                <strong>Nenhuma atividade registrada</strong>
                <p>
                  Quando houver movimentações, elas serão exibidas aqui.
                </p>
              </div>
            </section>
          </>
        ) : (
          <section className="gestor-secao gestor-atividade">
            <h2>{paginaAtiva}</h2>
            <p>
              Esta área será desenvolvida nas próximas etapas.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}

export default Gestor;
