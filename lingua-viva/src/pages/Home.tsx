
import heroImg from "../assets/images/raposa_menina.jpg";
import Header from "../components/Header";
import LearningSection from "../components/LearningSection";
import SupportSection from "../components/SupportSection";
import Footer from "../components/Footer";

type HomeProps = {
  onNavigate: (pagina: "inicio" | "sobre" | "contato") => void;
};

function Home({ onNavigate }: HomeProps) {
  const diferenciais = [
    {
      icone: "♢",
      titulo: "Ambiente seguro",
      descricao: "Conteúdo apropriado e acompanhamento pedagógico.",
      cor: "blue",
    },
    {
      icone: "✧",
      titulo: "Cada pessoa é única",
      descricao: "O espectro reúne diferentes formas de sentir e viver.",
      cor: "orange",
    },
    {
      icone: "♡",
      titulo: "Acolhimento familiar",
      descricao: "Orientação sem culpa, julgamento ou comparação.",
      cor: "green",
    },
    {
      icone: "♧",
      titulo: "Juntos na jornada",
      descricao: "Família, escola e profissionais em colaboração.",
      cor: "purple",
    },
  ];

  const temas = [
    {
      numero: "01",
      titulo: "Não é doença",
      descricao:
        "Autismo não é algo a ser curado. Apoio adequado favorece bem-estar e autonomia.",
    },
    {
      numero: "02",
      titulo: "Não há culpados",
      descricao:
        "Estilo de criação, vacinas ou falta de afeto não causam autismo.",
    },
    {
      numero: "03",
      titulo: "Apoio é individual",
      descricao:
        "As necessidades mudam de pessoa para pessoa e ao longo da vida.",
    },
  ];

  return (
    <main>
      <Header paginaAtual="inicio" onNavigate={onNavigate} />

      <section className="hero" id="inicio">
        <div className="hero-content">
          <h1>
            Compreender é o primeiro passo para
            <span> acolher de verdade</span>
          </h1>

          <p>
            Um espaço seguro para pais e cuidadores aprenderem sobre autismo,
            respeitarem diferenças e apoiarem cada pessoa em seu jeito único de
            ser.
          </p>

          <div className="hero-buttons">
            <button>Quero entender melhor ›</button>
            <button>Sou familiar ou cuidador</button>
          </div>
        </div>

        <div className="hero-image">
          <img src={heroImg} alt="Menina aprendendo com a raposa" />
        </div>
      </section>

      <section className="differentials">
        {diferenciais.map((item) => (
          <article className="differential-item" key={item.titulo}>
            <div className={`differential-icon ${item.cor}`}>
              {item.icone}
            </div>

            <div>
              <h3>{item.titulo}</h3>
              <p>{item.descricao}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="about-section" id="sobre">
        <div className="about-content">
          <span className="section-label">CONHECER PARA INCLUIR</span>

          <h2>Autismo não tem uma só forma.</h2>

          <p>
            O Transtorno do Espectro Autista (TEA) é uma condição do
            neurodesenvolvimento. Cada pessoa autista tem sua própria combinação
            de habilidades, interesses, formas de comunicação e necessidades de
            suporte.
          </p>

          <a href="#aprendizado" className="text-link">
            Começar pelos temas <span>›</span>
          </a>
        </div>

        <div className="topics-grid">
          {temas.map((tema) => (
            <article className="topic-card" key={tema.numero}>
              <span className="topic-number">{tema.numero}</span>
              <h3>{tema.titulo}</h3>
              <p>{tema.descricao}</p>
            </article>
          ))}
        </div>
      </section>

      <LearningSection />

      <SupportSection />

      <Footer />
    </main>
  );
}

export default Home;
