import { Link } from "react-router-dom";
import "./Header.css"

const Header = () => {
    return(
        <div className="header">
            <div className="header-logo">
                <img src="src/image/17796337654083.png" alt="" />
            </div>
            <div className="header-name">
                <label htmlFor="">Решение для бизнеса</label>
            </div>

             <div className="header-right">
                <div className="header-nav-menu">
                    <ul className="header-list">
                        <li className="header-list-item">
                                <Link to="/articles" className="auth-link">
                                      Статьи
                                </Link>
                        </li>
                        <li className="header-list-item">
                            <Link to="/dashboard" className="auth-link">
                                      Дешборд
                            </Link>
                        </li>
                        <li className="header-list-item">
                            <Link to="/subscriptions" className="auth-link">
                                      Подписки
                             </Link>
                        </li>
                    </ul>
                </div>

                <div className="header-profile">
                    <p>Профиль</p>
                </div>
            </div>
        </div>
    )
}
export default Header;