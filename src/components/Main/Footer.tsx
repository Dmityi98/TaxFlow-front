import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-columns">
          <div className="footer-col">
            <h3 className="footer-brand">SMT</h3>
            <p className="footer-description">
              Современная платформа для управления налоговой отчетностью и
              автоматизации бизнес-процессов.
            </p>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Контакты</h4>
            <ul className="footer-contact-list">
              <li>
                <span className="footer-contact-icon">📍</span>
                г. Москва, ул. Тверская, д. 15
              </li>
              <li>
                <span className="footer-contact-icon">📞</span>
                <a href="tel:+74951234567" className="footer-link">
                  +7 (495) 123-45-67
                </a>
              </li>
              <li>
                <span className="footer-contact-icon">✉️</span>
                <a href="mailto:info@smt.ru" className="footer-link">
                  info@smt.ru
                </a>
              </li>
              <li>
                <span className="footer-contact-icon">🕐</span>
                Пн–Пт: 9:00 – 18:00
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Навигация</h4>
            <ul className="footer-nav-list">
              <li>
                <a href="/main" className="footer-link">
                  Главная
                </a>
              </li>
              <li>
                <a href="/articles" className="footer-link">
                  Статьи
                </a>
              </li>
              <li>
                <a href="/dashboard" className="footer-link">
                  Дашборд
                </a>
              </li>
              <li>
                <a href="/login" className="footer-link">
                  Войти
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-col-title">Социальные сети</h4>
            <div className="footer-social">
              <a
                href="https://vk.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                VK
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                Telegram
              </a>
              <a
                href="https://wa.me/74951234567"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 SMT — Решение для бизнеса. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
