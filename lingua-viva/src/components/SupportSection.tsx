
import "../styles/SupportSection.css";

const familyTips = [
  "Escute sem invalidar",
  "Respeite limites sensoriais",
  "Evite comparações",
  "Valorize interesses e avanços",
];

const professionals = [
  "Psicólogo(a)",
  "Pediatra ou neuropediatra",
  "Fonoaudiólogo(a)",
  "Terapeuta ocupacional",
];

function CheckItem({ children }: { children: string }) {
  return (
    <div className="support-check-item">
      <span className="support-check">✓</span>
      <span>{children}</span>
    </div>
  );
}

function SupportSection() {
  return (
    <section className="support-section" id="contato">
      <div className="support-container">

        {/* BLOCO AZUL */}
        <div className="support-panel support-family">
          <h2>
            Percebeu sinais e não
            <br />
            sabe o que fazer?
          </h2>

          <p>
            O Transtorno do Espectro Autista (TEA) é uma
            condição do neurodesenvolvimento. Cada pessoa
            autista tem sua própria combinação de habilidades,
            interesses, formas de comunicação e necessidades
            de suporte.
          </p>

          <div className="support-check-grid">
            {familyTips.map((tip) => (
              <CheckItem key={tip}>{tip}</CheckItem>
            ))}
          </div>
        </div>

        {/* BLOCO ROSA */}
        <div className="support-panel support-professionals">
          <h2>
            Informação orienta.
            <br />
            Profissionais acompanham.
          </h2>

          <p>
            Este conteúdo é educativo e não substitui avaliação
            ou acompanhamento profissional. Cada criança tem
            necessidades próprias, e uma equipe de confiança
            ajuda a entender o que faz sentido para a sua família.
          </p>

          <div className="support-check-grid">
            {professionals.map((professional) => (
              <CheckItem key={professional}>
                {professional}
              </CheckItem>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default SupportSection;
