
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* IDENTIDADE DO PROJETO */}
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-mascot">🦊</span>
            <h2>
              Língua<span>Viva</span>
            </h2>
          </div>

          <p>
            Brincar com os sons da fala é abrir caminhos
            para novas descobertas.
          </p>
        </div>

        {/* EXPLORAR */}
        <div className="footer-column">
          <h3>Explore</h3>
          <a href="#inicio">Como funciona</a>
          <a href="#aprendizado">Atividades</a>
          <a href="#sobre">Sobre nós</a>
        </div>

        {/* PARA A FAMÍLIA */}
        <div className="footer-column">
          <h3>Para a família</h3>
          <a href="#aprendizado">Progresso da criança</a>
          <a href="#contato">Área dos responsáveis</a>
          <a href="#contato">Contato</a>
        </div>

        {/* MENSAGEM */}
        <div className="footer-column footer-message">
          <h3>Aprender com acolhimento</h3>
          <p>
            Cada criança tem seu ritmo. Cada descoberta
            merece ser celebrada.
          </p>
        </div>

      </div>

      {/* PARTE INFERIOR */}
      <div className="footer-bottom">
        <p>© 2026 LínguaViva. Todos os direitos reservados.</p>

        <div className="footer-legal">
          <a href="#privacidade">Privacidade</a>
          <span>•</span>
          <a href="#termos">Termos de uso</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
