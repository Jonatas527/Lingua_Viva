import "../styles/LearningSection.css";


const learningTopics = [
  {
    number: "01",
    title: "Entendendo o espectro",
    description:
      "Conheça as características, potencialidades e formas de manifestação do autismo.",
    icon: "brain",
    color: "blue",
    link: "#entendendo-espectro",
  },
  {
    number: "02",
    title: "Comunicação e conexão",
    description:
      "Aprenda a reconhecer diferentes formas de comunicação e fortalecer vínculos no dia a dia.",
    icon: "heart",
    color: "orange",
    link: "#comunicacao",
  },
  {
    number: "03",
    title: "Experiências sensoriais",
    description:
      "Entenda como sons, luzes, texturas e movimentos podem ser percebidos com maior intensidade.",
    icon: "sound",
    color: "green",
    link: "#sensorial",
  },
  {
    number: "04",
    title: "Rotina e aprendizagem",
    description:
      "Descubra estratégias respeitosas para trazer previsibilidade, segurança e autonomia.",
    icon: "book",
    color: "purple",
    link: "#rotina",
  },
];

function TopicIcon({ type }: { type: string }) {
  if (type === "brain") {
    return (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 9c-3-6-12-3-12 4-6 1-7 9-3 12-4 5 0 12 6 12 1 6 8 7 11 2" />
        <path d="M24 9c3-6 12-3 12 4 6 1 7 9 3 12 4 5 0 12-6 12-1 6-8 7-11 2" />
        <path d="M24 9v30M15 16c4 0 6 3 6 6M11 27c5-2 9 1 9 5M33 16c-4 0-6 3-6 6M37 27c-5-2-9 1-9 5" />
      </svg>
    );
  }

  if (type === "heart") {
    return (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 39S7 29 7 17a9 9 0 0 1 17-4 9 9 0 0 1 17 4c0 12-17 22-17 22Z" />
        <path d="M15 24h5l3-5 4 10 3-5h4" />
      </svg>
    );
  }

  if (type === "sound") {
    return (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 19h9l11-9v28l-11-9H7z" />
        <path d="M34 17c5 4 5 10 0 14M38 11c9 7 9 19 0 26" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 10c8-3 13-1 16 2 3-3 8-5 16-2v28c-8-3-13-1-16 2-3-3-8-5-16-2z" />
      <path d="M24 12v28M13 18h6M13 24h6M29 18h6M29 24h6" />
    </svg>
  );
}

function LearningSection() {
  return (
    <section className="learning-section" id="aprendizado">
      <div className="learning-heading">
        <div>
          <span className="learning-label">APRENDA NO SEU RITMO</span>
          <h2>Por onde você quer começar?</h2>
        </div>

        <p>
          Informações práticas para transformar dúvidas em
          atitudes mais acolhedoras.
        </p>
      </div>

      <div className="learning-grid">
        {learningTopics.map((topic) => (
          <article className="learning-card" key={topic.number}>
            <span className="learning-number">{topic.number}</span>

            <div className={`learning-icon ${topic.color}`}>
              <TopicIcon type={topic.icon} />
            </div>

            <h3>{topic.title}</h3>

            <p>{topic.description}</p>

            <a href={topic.link} className="learning-link">
              Começar pelos temas <span>›</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default LearningSection;
