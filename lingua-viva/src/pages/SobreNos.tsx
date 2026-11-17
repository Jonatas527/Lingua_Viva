
import heroImg from "../assets/images/raposa_menina.jpg";
import meninaTablet from "../assets/images/menina_tablet.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/SobreNos.css";

type SobreNosProps = {
  onNavigate: (pagina: "inicio" | "sobre" | "contato") => void;
};

function SobreNos({ onNavigate }: SobreNosProps) {
  const principios = [
    {
      icone: "♡",
      titulo: "Acolhimento",
      descricao:
        "Respeitamos as diferenças e valorizamos cada criança, oferecendo um ambiente acolhedor e seguro.",
      cor: "sobre-blue",
    },
    {
      icone: "✧",
      titulo: "Aprendizagem",
      descricao:
        "Acreditamos que aprender pode ser uma experiência leve, divertida e cheia de descobertas.",
      cor: "sobre-orange",
    },
    {
      icone: "♧",
      titulo: "Família",
      descricao:
        "Valorizamos a participação da família em cada etapa do desenvolvimento e da aprendizagem.",
      cor: "sobre-green",
    },
  ];

  return (
    <main className="sobre-page">
      <Header paginaAtual="sobre" onNavigate={onNavigate} />

      {/* APRESENTAÇÃO DO PROJETO */}

      <section className="sobre-apresentacao">
        <div className="sobre-apresentacao-content">
          <div className="sobre-apresentacao-texto">
            <span className="sobre-etiqueta">QUEM SOMOS</span>

            <h1>
              Conheça o <span>Língua Viva</span>
            </h1>

            <p>
              Um projeto criado para transformar a aprendizagem em uma jornada
              mais acessível, acolhedora e divertida, respeitando o tempo e as
              particularidades de cada criança.
            </p>

            <div className="sobre-dados">
              <div>
                <strong>Inclusão</strong>
                <span>Respeito às diferenças</span>
              </div>

              <div>
                <strong>Aprendizado</strong>
                <span>Descobertas no próprio ritmo</span>
              </div>

              <div>
                <strong>Acolhimento</strong>
                <span>Uma jornada compartilhada</span>
              </div>
            </div>
          </div>

          <div className="sobre-apresentacao-imagem">
            <img
              src={meninaTablet}
              alt="Menina e raposinha aprendendo juntas com um tablet"
            />
          </div>
        </div>
      </section>

      {/* PRINCÍPIOS */}

      <section className="sobre-principios">
        <div className="sobre-titulo">
          <span>NOSSOS VALORES</span>
          <h2>Princípios que cuidam de cada descoberta</h2>
          <p>
            Nosso trabalho é guiado por valores que colocam a criança no centro
            de cada experiência.
          </p>
        </div>

        <div className="sobre-cards">
          {principios.map((item) => (
            <article className="sobre-card" key={item.titulo}>
              <div className={`sobre-card-icon ${item.cor}`}>
                {item.icone}
              </div>

              <h3>{item.titulo}</h3>
              <p>{item.descricao}</p>
            </article>
          ))}
        </div>
      </section>

      {/* MENSAGEM DO PROJETO */}

      <section className="sobre-mensagem">
        <div className="sobre-mensagem-texto">
          <span>PEQUENOS PASSOS, GRANDES DESCOBERTAS</span>

          <h2>Cada criança tem seu jeito único de aprender.</h2>

          <p>
            O Língua Viva acredita que a aprendizagem deve acontecer com
            respeito, paciência e incentivo. Por isso, buscamos oferecer
            experiências que valorizem cada conquista, desde os primeiros sons
            até novas formas de se comunicar.
          </p>

          <p>
            Mais do que ensinar, queremos contribuir para que cada criança
            descubra suas possibilidades e desenvolva sua autonomia.
          </p>

          <button
            onClick={() => onNavigate("inicio")}
            className="sobre-voltar"
          >
            Conheça nossa página inicial ›
          </button>
        </div>

        <div className="sobre-mensagem-imagem">
          <img
            src={heroImg}
            alt="Menina e raposinha aprendendo juntas"
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default SobreNos;
