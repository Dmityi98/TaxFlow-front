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
                        <li className="header-list-item">Статьи</li>
                        <li className="header-list-item">Дешборд</li>
                        <li className="header-list-item">Подписки</li>
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