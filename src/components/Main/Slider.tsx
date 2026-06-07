import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Slider.css';

const slides = [
  {
    id: 1,
    image: "/image/slider/1 img.png",
    title: "Управляйте налогами с лёгкостью",
    subtitle: "Автоматизация налоговой отчётности для вашего бизнеса",
  },
  {
    id: 2,
    image: "/image/slider/2 img.png",
    title: "Контролируйте финансы",
    subtitle: "Полный спектр инструментов для финансового учёта",
  },
  {
    id: 3,
    image: "/image/slider/3 img.png",
    title: "Будьте на шаг впереди",
    subtitle: "Актуальные данные и аналитика в реальном времени",
  },
];

const Slider = () => {
  return (
    <section className="slider-section">
      <div className="slider-container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="slide">
                <img src={slide.image} alt={slide.title} />
                <div className="slide-overlay">
                  <h2 className="slide-title">{slide.title}</h2>
                  <p className="slide-subtitle">{slide.subtitle}</p>
                  <button className="slide-btn">Узнать больше →</button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Slider;
