
import { useState, type FormEvent } from "react";
import type { Perfil } from "../App";
import { supabase } from "../lib/supabase";

import heroImg from "../assets/images/login_ilustracao.png";
import logoRaposa from "../assets/images/logo_raposa.png";
import "../styles/Login.css";

type LoginProps = {
  perfil: Perfil;
  onVoltar: () => void;
};

const informacoesPerfil: Record<
  Perfil,
  { icone: string; titulo: string; descricao: string }
> = {
  Aluno: {
    icone: "🎓",
    titulo: "Olá, aluno!",
    descricao: "Entre para descobrir, aprender e explorar novas atividades.",
  },
  Responsável: {
    icone: "❤️",
    titulo: "Bem-vindo, responsável!",
    descricao: "Acompanhe as descobertas e conquistas da criança.",
  },
  Professor: {
    icone: "📚",
    titulo: "Olá, professor!",
    descricao: "Acesse sua área para acompanhar a jornada de aprendizagem.",
  },
  Gestor: {
    icone: "⚙️",
    titulo: "Bem-vindo, gestor!",
    descricao: "Acesse sua área de gerenciamento do Língua Viva.",
  },
};

function Login({ perfil, onVoltar }: LoginProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [recuperando, setRecuperando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState<
    "sucesso" | "erro" | ""
  >("");

  const informacoes = informacoesPerfil[perfil];

  const enviarFormulario = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setMensagem("");
    setTipoMensagem("");
    setCarregando(true);

    try {
      // 1. Autentica o usuário no Supabase.
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: senha,
      });

      if (error) {
        throw error;
      }

      if (!data.user) {
        throw new Error("Não foi possível identificar sua conta.");
      }

      // 2. Busca o perfil verdadeiro cadastrado no banco.
      const { data: dadosPerfil, error: erroPerfil } = await supabase
        .from("profiles")
        .select("nome, tipo_perfil")
        .eq("id", data.user.id)
        .single();

      if (erroPerfil || !dadosPerfil) {
        await supabase.auth.signOut();

        throw new Error(
          "Não foi possível localizar seu perfil. Entre em contato com a equipe responsável."
        );
      }

      const perfisPermitidos: Perfil[] = [
        "Aluno",
        "Responsável",
        "Professor",
        "Gestor",
      ];

      if (
        !perfisPermitidos.includes(
          dadosPerfil.tipo_perfil as Perfil
        )
      ) {
        await supabase.auth.signOut();

        throw new Error("O perfil desta conta não é válido.");
      }

      const perfilBanco = dadosPerfil.tipo_perfil as Perfil;

      // 3. Confere se o perfil escolhido corresponde ao cadastro.
      if (perfilBanco !== perfil) {
        await supabase.auth.signOut();

        throw new Error(
          `Esta conta está cadastrada como ${perfilBanco}. Volte e selecione esse perfil.`
        );
      }

      // 4. Comunica ao App.tsx que a autenticação foi concluída.
      window.dispatchEvent(
        new CustomEvent("linguaviva:perfil-autenticado", {
          detail: {
            perfil: perfilBanco,
            nome: dadosPerfil.nome,
          },
        })
      );

      setTipoMensagem("sucesso");
      setMensagem("Login realizado com sucesso!");
      
      console.log("Usuário autenticado:", data.user.id);
      console.log("Perfil confirmado:", perfilBanco);

    } catch (error: unknown) {
      const erro = error as Error;

      setTipoMensagem("erro");
      setMensagem(
        erro.message === "Invalid login credentials"
          ? "E-mail ou senha incorretos."
          : erro.message
      );
    } finally {
      setCarregando(false);
    }
  };

  const recuperarSenha = async () => {
    if (!email.trim()) {
      setTipoMensagem("erro");
      setMensagem("Digite seu e-mail para recuperar sua senha.");
      return;
    }

    setRecuperando(true);
    setMensagem("");
    setTipoMensagem("");

    try {
      const { error } =
        await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${window.location.origin}/`,
        });

      if (error) {
        throw error;
      }

      setTipoMensagem("sucesso");
      setMensagem(
        "Se o e-mail estiver cadastrado, você receberá as instruções para redefinir sua senha."
      );
    } catch (error: unknown) {
      const erro = error as Error;

      setTipoMensagem("erro");
      setMensagem(erro.message);
    } finally {
      setRecuperando(false);
    }
  };

  return (
    <main className="login-page">
      <div className="login-top">
        <button
          type="button"
          className="login-logo"
          onClick={onVoltar}
          aria-label="Voltar ao site"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          <img
            src={logoRaposa}
            alt="Mascote raposa do Língua Viva"
            style={{
              width: "52px",
              height: "52px",
              objectFit: "contain",
              display: "block",
            }}
          />

          <span
            style={{
              color: "#102e5c",
              fontWeight: 800,
              fontSize: "30px",
              lineHeight: 1.1,
            }}
          >
            Língua<span style={{ color: "#ff8a00" }}>Viva</span>
          </span>
        </button>

        <button
          type="button"
          className="login-voltar"
          onClick={onVoltar}
        >
          <span>←</span> Voltar ao site
        </button>
      </div>

      <section className="login-container">
        <div className="login-card">
          <div className="login-form-area">
            <div className="login-profile">
              <span className="login-profile-icon">
                {informacoes.icone}
              </span>
              <span className="login-profile-label">
                {perfil}
              </span>
            </div>

            <span className="login-etiqueta">
              SUA ÁREA LÍNGUA VIVA
            </span>

            <h1>{informacoes.titulo}</h1>

            <p className="login-description">
              {informacoes.descricao}
            </p>

            <form onSubmit={enviarFormulario}>
              <div className="login-field">
                <label htmlFor="login-email">E-mail</label>

                <input
                  id="login-email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="login-field">
                <label htmlFor="login-senha">Senha</label>

                <div className="login-password-wrapper">
                  <input
                    id="login-senha"
                    type={mostrarSenha ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="login-show-password"
                    onClick={() =>
                      setMostrarSenha((mostrar) => !mostrar)
                    }
                    aria-label={
                      mostrarSenha ? "Ocultar senha" : "Mostrar senha"
                    }
                  >
                    {mostrarSenha ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </div>

              <div className="login-options">
                <span></span>

                <button
                  type="button"
                  className="login-forgot"
                  onClick={recuperarSenha}
                  disabled={recuperando}
                >
                  {recuperando
                    ? "Enviando..."
                    : "Esqueceu a senha?"}
                </button>
              </div>

              {mensagem && (
                <div
                  role="status"
                  aria-live="polite"
                  style={{
                    padding: "12px",
                    marginBottom: "15px",
                    borderRadius: "8px",
                    background:
                      tipoMensagem === "sucesso"
                        ? "#e8f7ed"
                        : "#fdecec",
                    color:
                      tipoMensagem === "sucesso"
                        ? "#18733b"
                        : "#b42318",
                    fontSize: "14px",
                  }}
                >
                  {mensagem}
                </div>
              )}

              <button
                type="submit"
                className="login-submit"
                disabled={carregando}
              >
                {carregando
                  ? "Verificando..."
                  : "Entrar na minha área"}

                {!carregando && <span>→</span>}
              </button>
            </form>

            <div className="login-divider">
              <span>ou</span>
            </div>

            <p className="login-help">
              Ainda não tem acesso? Entre em contato com a equipe responsável.
            </p>

            <button
              type="button"
              className="login-change-profile"
              onClick={onVoltar}
            >
              Voltar e escolher outro perfil
            </button>
          </div>

          <div className="login-illustration">
            <div className="login-illustration-content">
              <span className="login-illustration-label">
                PEQUENOS PASSOS, GRANDES DESCOBERTAS
              </span>

              <h2>
                Cada descoberta é uma nova oportunidade de aprender.
              </h2>

              <p>
                Um espaço de acolhimento, respeito e aprendizagem para todos.
              </p>

              <img
                src={heroImg}
                alt="Menino e raposinha aprendendo juntos"
              />

              <div className="login-illustration-footer">
                <span>♡</span>
                Aprender é uma jornada compartilhada.
              </div>
            </div>
          </div>
        </div>

        <p className="login-footer">
          © {new Date().getFullYear()} Língua Viva. Todos os direitos reservados.
        </p>
      </section>
    </main>
  );
}

export default Login;
