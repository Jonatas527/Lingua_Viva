
import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";

import heroImg from "../assets/images/raposa_menina.jpg";
import iconeConversa from "../assets/images/icons_conversa.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Contato.css";

type ContatoProps = {
  onNavigate: (pagina: "inicio" | "sobre" | "contato") => void;
};

function Contato({ onNavigate }: ContatoProps) {
  const [mensagemEnviada, setMensagemEnviada] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erroEnvio, setErroEnvio] = useState(false);

  const [formulario, setFormulario] = useState({
    nome: "",
    email: "",
    perfil: "",
    assunto: "",
    mensagem: "",
    privacidade: false,
  });

  const atualizarCampo = (
    campo: keyof typeof formulario,
    valor: string | boolean
  ) => {
    setFormulario((anterior) => ({
      ...anterior,
      [campo]: valor,
    }));
  };

  const enviarFormulario = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEnviando(true);
    setMensagemEnviada(false);
    setErroEnvio(false);

    try {
      await emailjs.send(
        "service_tojw89o",
        "template_0gqvynb",
        {
          nome: formulario.nome,
          email: formulario.email,
          perfil: formulario.perfil || "Não informado",
          assunto: formulario.assunto,
          mensagem: formulario.mensagem,
        },
        "YuJdCcgbSPhNZdo_4"
      );

      setMensagemEnviada(true);

      setFormulario({
        nome: "",
        email: "",
        perfil: "",
        assunto: "",
        mensagem: "",
        privacidade: false,
      });
    } catch (erro) {
      console.error("Erro ao enviar mensagem:", erro);
      setErroEnvio(true);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="contato-page">
      <Header paginaAtual="contato" onNavigate={onNavigate} />

      {/* APRESENTAÇÃO */}

      <section className="contato-hero">
        <div>
          <span className="contato-etiqueta">CONTATO</span>

          <h1>Vamos conversar?</h1>

          <p>
            Dúvidas, sugestões ou uma descoberta para compartilhar?
            Queremos ouvir você.
          </p>
        </div>

        <div className="contato-hero-icon">
          <img
            src={iconeConversa}
            alt="Ícone de duas pessoas conversando"
          />
        </div>
      </section>

      {/* FORMULÁRIO E INFORMAÇÕES */}

      <section className="contato-principal">
        <div className="contato-formulario">
          <h2>Envie sua mensagem</h2>

          <p className="contato-descricao">
            Os campos com * são obrigatórios.
          </p>

          <form onSubmit={enviarFormulario}>
            <div className="contato-campos">
              <div className="campo">
                <label htmlFor="nome">Seu nome *</label>

                <input
                  id="nome"
                  type="text"
                  placeholder="Como podemos chamar você?"
                  value={formulario.nome}
                  onChange={(e) =>
                    atualizarCampo("nome", e.target.value)
                  }
                  required
                />
              </div>

              <div className="campo">
                <label htmlFor="email">Seu e-mail *</label>

                <input
                  id="email"
                  type="email"
                  placeholder="voce@exemplo.com.br"
                  value={formulario.email}
                  onChange={(e) =>
                    atualizarCampo("email", e.target.value)
                  }
                  required
                />
              </div>

              <div className="campo">
                <label htmlFor="perfil">Você é</label>

                <select
                  id="perfil"
                  value={formulario.perfil}
                  onChange={(e) =>
                    atualizarCampo("perfil", e.target.value)
                  }
                >
                  <option value="">Selecione seu perfil</option>
                  <option value="Responsável">Responsável</option>
                  <option value="Professor">Professor</option>
                  <option value="Aluno">Aluno</option>
                  <option value="Profissional">Profissional</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div className="campo">
                <label htmlFor="assunto">Assunto *</label>

                <select
                  id="assunto"
                  value={formulario.assunto}
                  onChange={(e) =>
                    atualizarCampo("assunto", e.target.value)
                  }
                  required
                >
                  <option value="">Selecione um assunto</option>
                  <option value="Dúvidas">Dúvidas</option>
                  <option value="Sugestões">Sugestões</option>
                  <option value="Parcerias">Parcerias</option>
                  <option value="Problemas">Problemas</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>

              <div className="campo campo-completo">
                <label htmlFor="mensagem">Sua mensagem *</label>

                <textarea
                  id="mensagem"
                  placeholder="Conte sua dúvida ou sugestão..."
                  value={formulario.mensagem}
                  onChange={(e) =>
                    atualizarCampo("mensagem", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <label className="contato-privacidade">
              <input
                type="checkbox"
                checked={formulario.privacidade}
                onChange={(e) =>
                  atualizarCampo("privacidade", e.target.checked)
                }
                required
              />

              <span>
                Li a Política de Privacidade e concordo com o uso
                dos meus dados para responder a esta mensagem.
              </span>
            </label>

            <button
              type="submit"
              className="contato-enviar"
              disabled={enviando}
            >
              {enviando ? "Enviando..." : "Enviar mensagem"}
            </button>

            {mensagemEnviada && (
              <p className="contato-sucesso" role="status">
                Mensagem enviada com sucesso! Obrigado pelo contato.
              </p>
            )}

            {erroEnvio && (
              <p
                className="contato-erro"
                role="alert"
                style={{ color: "#c62828", marginTop: "12px" }}
              >
                Não foi possível enviar sua mensagem. Tente novamente.
              </p>
            )}

            <small className="contato-aviso">
              Não inclua documentos, dados sensíveis ou informações
              pessoais da criança na mensagem.
            </small>
          </form>
        </div>

        {/* INFORMAÇÕES LATERAIS */}

        <aside className="contato-lateral">
          <div className="contato-info">
            <span className="contato-info-etiqueta">
              ENTRE EM CONTATO
            </span>

            <h2>Estamos por aqui</h2>

            <div className="contato-info-item">
              <div className="contato-info-icone azul">✉</div>

              <div>
                <strong>Fale com a equipe</strong>
                <span>jonatassilvasiqueira663@gmail.com</span>
              </div>
            </div>

            <div className="contato-info-item">
              <div className="contato-info-icone amarelo">◷</div>

              <div>
                <strong>Envio de mensagens</strong>
                <span>
                  Utilize o formulário para enviar suas dúvidas e
                  sugestões.
                </span>
              </div>
            </div>

            <p className="contato-info-nota">
              As mensagens enviadas pelo formulário são encaminhadas
              para o e-mail da equipe.
            </p>
          </div>

          <div className="contato-imagem">
            <img
              src={heroImg}
              alt="Menina e raposinha aprendendo juntas"
            />

            <p>
              Sua participação ajuda a construir uma experiência
              mais acolhedora para as famílias.
            </p>
          </div>
        </aside>
      </section>

      {/* SUGESTÕES */}

      <section className="contato-ajuda">
        <h2>Antes de enviar, talvez isso ajude</h2>

        <div className="contato-ajuda-cards">
          <article>
            <h3>Precisa saber ler?</h3>
            <p>
              Não. As propostas partem da escuta, da fala e de
              palavras conhecidas. O adulto pode ler as orientações.
            </p>
          </article>

          <article>
            <h3>Por quanto tempo brincar?</h3>
            <p>
              Comece com 5 a 10 minutos e observe o interesse.
              Fazer uma pausa também faz parte da aprendizagem.
            </p>
          </article>

          <article>
            <h3>Como acompanhar as descobertas?</h3>
            <p>
              A área dos responsáveis reúne a rotina, as atividades
              exploradas e o progresso da criança.
            </p>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default Contato;
