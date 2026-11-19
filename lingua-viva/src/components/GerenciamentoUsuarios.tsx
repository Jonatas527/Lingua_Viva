
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "../lib/supabase";
import { cadastrarUsuario } from "../lib/cadastrarUsuario";
import "../styles/GerenciamentoUsuarios.css";

type TipoPerfil = "Aluno" | "Responsável" | "Professor";

type Usuario = {
  id: string;
  nome: string;
  email: string | null;
  tipo_perfil: string;
  criado_em: string;
};

function GerenciamentoUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoPerfil, setTipoPerfil] = useState<TipoPerfil>("Aluno");
  const [pesquisa, setPesquisa] = useState("");

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<"sucesso" | "erro" | "">("");

  async function carregarUsuarios() {
    setCarregando(true);

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, nome, email, tipo_perfil, criado_em")
        .order("criado_em", { ascending: false });

      if (error) throw error;

      setUsuarios((data || []) as Usuario[]);
    } catch (error: unknown) {
      const erro = error as Error;
      setMensagem(erro.message || "Não foi possível carregar os usuários.");
      setTipoMensagem("erro");
    } finally {
      setCarregando(false);
    }
  }

 useEffect(() => {
  const timer = window.setTimeout(() => {
    void carregarUsuarios();
  }, 0);

  return () => window.clearTimeout(timer);
}, []);

  async function enviarCadastro(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setMensagem("");
    setTipoMensagem("");
    setSalvando(true);

    try {
      await cadastrarUsuario({
        nome: nome.trim(),
        email: email.trim(),
        senha,
        tipo_perfil: tipoPerfil,
      });

      setMensagem("Usuário cadastrado com sucesso!");
      setTipoMensagem("sucesso");

      setNome("");
      setEmail("");
      setSenha("");
      setTipoPerfil("Aluno");

      await carregarUsuarios();
    } catch (error: unknown) {
      const erro = error as Error;
      setMensagem(erro.message || "Não foi possível cadastrar o usuário.");
      setTipoMensagem("erro");
    } finally {
      setSalvando(false);
    }
  }

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const termo = pesquisa.toLowerCase();

    return (
      usuario.nome.toLowerCase().includes(termo) ||
      (usuario.email || "").toLowerCase().includes(termo) ||
      usuario.tipo_perfil.toLowerCase().includes(termo)
    );
  });

  function formatarData(data: string) {
    if (!data) return "—";
    return new Date(data).toLocaleDateString("pt-BR");
  }

  return (
    <div className="gerenciamento-usuarios">
      <div className="gerenciamento-titulo">
        <div>
          <h2>Gerenciamento de usuários</h2>
          <p>Cadastre e consulte os usuários da plataforma.</p>
        </div>

        <span className="gerenciamento-total">
          {usuarios.length} usuários cadastrados
        </span>
      </div>

      <section className="gerenciamento-formulario">
        <h3>Cadastrar novo usuário</h3>
        <p>Preencha os dados para criar um novo acesso.</p>

        <form onSubmit={enviarCadastro}>
          <div className="gerenciamento-campos">
            <div className="gerenciamento-campo">
              <label htmlFor="usuario-nome">Nome completo</label>
              <input
                id="usuario-nome"
                type="text"
                placeholder="Digite o nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className="gerenciamento-campo">
              <label htmlFor="usuario-email">E-mail</label>
              <input
                id="usuario-email"
                type="email"
                placeholder="Digite o e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="gerenciamento-campo">
              <label htmlFor="usuario-senha">Senha inicial</label>
              <input
                id="usuario-senha"
                type="password"
                placeholder="Crie uma senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                minLength={6}
                required
              />
            </div>

            <div className="gerenciamento-campo">
              <label htmlFor="usuario-perfil">Tipo de perfil</label>
              <select
                id="usuario-perfil"
                value={tipoPerfil}
                onChange={(e) => setTipoPerfil(e.target.value as TipoPerfil)}
              >
                <option value="Aluno">Aluno</option>
                <option value="Professor">Professor</option>
                <option value="Responsável">Responsável</option>
              </select>
            </div>
          </div>

          {mensagem && (
            <div
              className={`gerenciamento-mensagem ${tipoMensagem}`}
              role="status"
              aria-live="polite"
            >
              {mensagem}
            </div>
          )}

          <button
            type="submit"
            className="gerenciamento-botao"
            disabled={salvando}
          >
            {salvando ? "Cadastrando..." : "Cadastrar usuário"}
          </button>
        </form>
      </section>

      <section className="gerenciamento-lista">
        <div className="gerenciamento-lista-topo">
          <div>
            <h3>Usuários cadastrados</h3>
            <p>Consulte os acessos registrados na plataforma.</p>
          </div>

          <button
            type="button"
            className="gerenciamento-atualizar"
            onClick={carregarUsuarios}
            disabled={carregando}
          >
            {carregando ? "Atualizando..." : "Atualizar lista"}
          </button>
        </div>

        <div className="gerenciamento-pesquisa">
          <input
            type="search"
            placeholder="Pesquisar por nome, e-mail ou perfil..."
            value={pesquisa}
            onChange={(e) => setPesquisa(e.target.value)}
          />
        </div>

        {carregando ? (
          <p className="gerenciamento-vazio">Carregando usuários...</p>
        ) : usuariosFiltrados.length === 0 ? (
          <p className="gerenciamento-vazio">Nenhum usuário encontrado.</p>
        ) : (
          <div className="gerenciamento-tabela-container">
            <table className="gerenciamento-tabela">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Perfil</th>
                  <th>Data de cadastro</th>
                </tr>
              </thead>

              <tbody>
                {usuariosFiltrados.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.nome}</td>
                    <td>{usuario.email || "—"}</td>
                    <td>
                      <span className="gerenciamento-perfil">
                        {usuario.tipo_perfil}
                      </span>
                    </td>
                    <td>{formatarData(usuario.criado_em)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default GerenciamentoUsuarios;
