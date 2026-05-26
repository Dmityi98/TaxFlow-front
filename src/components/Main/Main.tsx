import { Link } from "react-router-dom";
import Header from "./Header";
import Slider from "./Slider";

const Main = () => {

    return(
        <>
            <Header />
            <Slider />
            <Link 
                to="/login" 
                className="auth-link">
                    Войти в личный кабинет
            </Link>
        </>
    )
}

export default Main;