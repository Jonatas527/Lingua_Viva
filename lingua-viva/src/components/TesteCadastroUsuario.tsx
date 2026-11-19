
import { useState } from "react";
import { cadastrarUsuario } from "../lib/cadastrarUsuario";

function TesteCadastroUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoPerfil, setTipoPerfil] = useState<
    "Aluno" | "Responsável" | "Professor"
  >("Aluno");

  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function testarCadastro() {
    setMensagem("");
    setCarregando(true);

    try {
      const resultado = await cadastrarUsuario({
        nome,
        email,
        senha,
        tipo_perfil: tipoPerfil,
      });

      setMensagem(resultado.mensagem || "Cadastro realizado!");
      setNome("");
      setEmail("");
      setSenha("");
    } catch (error) {
      setMensagem(
        error instanceof Error
          ? error.message
          : "Erro ao cadastrar usuário."
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div style={{ padding: 24, maxWidth: 450, margin: "30px auto" }}>
      <h2>Teste de cadastro de usuário</h2>

      <input
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="E-mail"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Senha (mínimo 8 caracteres)"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <br /><br />

      <select
        value={tipoPerfil}
        onChange={(e) =>
          setTipoPerfil(
            e.target.value as "Aluno" | "Responsável" | "Professor"
          )
        }
      >
        <option value="Aluno">Aluno</option>
        <option value="Responsável">Responsável</option>
        <option value="Professor">Professor</option>
      </select>

      <br /><br />

      <button onClick={testarCadastro} disabled={carregando}>
        {carregando ? "Cadastrando..." : "Testar cadastro"}
      </button>

      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default TesteCadastroUsuario;
