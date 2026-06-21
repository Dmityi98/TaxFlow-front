import { useParams, Link, Navigate } from "react-router-dom";
import "./ArticlePage.css";
import Header from "../components/Main/Header";
import Footer from "../components/Main/Footer";
import { articles } from "../data/articles";

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const article = articles.find((a) => a.id === Number(id));

  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  return (
    <>
      <Header />
      <div className="article-page">
        <div className="article-page-container">
          <Link to="/articles" className="article-back-link">
            ← Назад к статьям
          </Link>
          <div className={`article-page-image article-image-${article.id}`} />
          <h1 className="article-page-title">{article.title}</h1>
          <div className="article-page-content">
            {article.content.split("\n").map((paragraph, index) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={index} className="article-page-h2">
                    {paragraph.replace("## ", "")}
                  </h2>
                );
              }
              if (paragraph.startsWith("- ")) {
                return (
                  <li key={index} className="article-page-li">
                    {paragraph.replace("- ", "")}
                  </li>
                );
              }
              if (paragraph.startsWith("### ")) {
                return (
                  <h3 key={index} className="article-page-h3">
                    {paragraph.replace("### ", "")}
                  </h3>
                );
              }
              if (paragraph.match(/^\d+\. /)) {
                return (
                  <li key={index} className="article-page-li">
                    {paragraph.replace(/^\d+\. /, "")}
                  </li>
                );
              }
              if (paragraph.trim() === "") {
                return null;
              }
              return (
                <p key={index} className="article-page-p">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ArticlePage;
