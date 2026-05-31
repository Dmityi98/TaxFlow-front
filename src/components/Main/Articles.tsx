import "./Articles.css"

const articles = [
  {
    id: 1,
    title: "Как оптимизировать налоговую отчетность",
    description:
      "Узнайте об эффективных способах ведения налоговой отчетности и сокращения времени на подготовку документов.",
  },
  {
    id: 2,
    title: "Автоматизация бизнес-процессов",
    description:
      "Современные инструменты автоматизации помогают снизить нагрузку на сотрудников и уменьшить количество ошибок.",
  },
  {
    id: 3,
    title: "Тренды в налогообложении 2025",
    description:
      "Обзор ключевых изменений в налоговом законодательстве и их влияние на малый и средний бизнес.",
  },
];

const Articles = () => {
  return (
    <section className="articles-section">
      <div className="articles-container">
        <h2 className="articles-title">Статьи</h2>
        <p className="articles-subtitle">
          Полезные материалы для вашего бизнеса
        </p>
        <div className="articles-grid">
          {articles.map((article) => (
            <div key={article.id} className="article-card">
              <div className={`article-image-wrapper article-image-${article.id}`}></div>
              <div className="article-content">
                <h3 className="article-card-title">{article.title}</h3>
                <p className="article-description">{article.description}</p>
                <button className="article-btn">Читать далее →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Articles;
