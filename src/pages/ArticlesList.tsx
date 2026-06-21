import { Link } from "react-router-dom";
import Header from "../components/Main/Header";
import Footer from "../components/Main/Footer";
import { articles } from "../data/articles";

const ArticlesList = () => {
  return (
    <>
      <Header />
      <section className="articles-section">
        <div className="articles-container">
          <h2 className="articles-title">Статьи</h2>
          <p className="articles-subtitle">
            Полезные материалы для вашего бизнеса
          </p>
          <div className="articles-grid">
            {articles.map((article) => (
              <Link
                key={article.id}
                to={`/articles/${article.id}`}
                className="article-card"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className={`article-image-wrapper article-image-${article.id}`} />
                <div className="article-content">
                  <h3 className="article-card-title">{article.title}</h3>
                  <p className="article-description">{article.description}</p>
                  <span className="article-btn">Читать далее →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ArticlesList;
