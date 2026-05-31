import { Link } from "react-router-dom";
import "./Header.css"

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="header-logo">
            <img src="src/image/17796337654083.png" alt="" />
          </div>
          <div className="header-brand-text">Решение для бизнеса</div>
        </div>

        <div className="header-right">
          <nav className="header-nav">
            <Link to="/articles" className="header-nav-link">
              Статьи
            </Link>
            <Link to="/dashboard" className="header-nav-link">
              Дашборд
            </Link>
            <Link to="/subscriptions" className="header-nav-link">
              Подписки
            </Link>
          </nav>

          <div className="header-actions">
            <Link to="/login" className="header-btn-outline">
              Войти
            </Link>
            <Link to="/register" className="header-btn-filled">
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
