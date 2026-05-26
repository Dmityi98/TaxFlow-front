
// Импортируем компоненты Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
// Импортируем нужные модули (навигация, пагинация)
import { Navigation, Pagination } from 'swiper/modules';
// Импортируем стили Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './Slider.css'; // Ваши кастомные стили

const Slider = () => {
  return (
    <div className="slider-container">
      <Swiper
        modules={[Navigation, Pagination]} // Подключаем модули
        spaceBetween={50} // Отступ между слайдами
        slidesPerView={1} // Количество видимых слайдов
        navigation={true} // Включаем стрелки вперед/назад
        pagination={{ clickable: true }} // Включаем точки (кликабельные)
        loop={true} // Зацикливание слайдов
      >
        <SwiperSlide>
          {/* TODO Сделать фотографии интерфейса */}
          <div className="slide">
            <img src="https://via.placeholder.com/800x400?text=Slide+1" alt="Slide 1" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide">
            <img src="https://via.placeholder.com/800x400?text=Slide+2" alt="Slide 2" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide">
            <img src="https://via.placeholder.com/800x400?text=Slide+3" alt="Slide 3" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;