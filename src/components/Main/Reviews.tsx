import "./Reviews.css"

const reviews = [
  {
    id: 1,
    name: "Алексей Иванов",
    role: "Генеральный директор, ООО «ТехноПром»",
    text: "Сервис SMT помог нам автоматизировать налоговую отчетность и сократить время на подготовку документов в 3 раза. Рекомендую!",
    initials: "АИ",
  },
  {
    id: 2,
    name: "Елена Смирнова",
    role: "Главный бухгалтер, ИП Смирнова",
    text: "Отличный инструмент для малого бизнеса. Интуитивно понятный интерфейс, все необходимые функции под рукой.",
    initials: "ЕС",
  },
  {
    id: 3,
    name: "Дмитрий Козлов",
    role: "Финансовый директор, АО «РегионСнаб»",
    text: "Пользуемся SMT уже полгода. Система стабильна, поддержка отвечает оперативно, цены адекватные.",
    initials: "ДК",
  },
];

const Reviews = () => {
  return (
    <section className="reviews-section">
      <div className="reviews-container">
        <h2 className="reviews-title">Отзывы</h2>
        <p className="reviews-subtitle">
          Что говорят наши клиенты
        </p>
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className={`review-avatar-wrapper review-avatar-${review.id}`}>
                  <span className="review-avatar-initials">{review.initials}</span>
                </div>
                <div className="review-meta">
                  <h4 className="review-name">{review.name}</h4>
                  <span className="review-role">{review.role}</span>
                </div>
              </div>
              <p className="review-text">"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
