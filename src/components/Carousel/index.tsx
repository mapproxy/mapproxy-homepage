import React, { useState, useEffect } from 'react';
import './carousel.css';

interface CarouselProps {
  slides: Object[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const previous = () => {
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex < 0 ? slides.length - 1 : newIndex);
  };
  const next = () => {
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex >= slides.length ? 0 : newIndex);
  };

  useEffect(() => {
    // register key press events
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.repeat) return;
      if (event.key === 'ArrowRight') {
            document.querySelector('#slide-arrow-next')?.classList.add("active");
            next();
        }
        if (event.key === 'ArrowLeft') {
          document.querySelector('#slide-arrow-prev')?.classList.add("active");
          previous();
      }
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.repeat) return;
      document.querySelector('#slide-arrow-next')?.classList.remove("active");
      document.querySelector('#slide-arrow-prev')?.classList.remove("active");
    }
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
}, [currentIndex]);

  return (
    <section className="slider-wrapper">
      <button
        className="slide-arrow"
        id="slide-arrow-prev"
        onClick={previous}
        >
        &#8249;
      </button>
      <button className="slide-arrow" id="slide-arrow-next" onClick={next}>&#8250;</button>
      <div className='slides-container'>
        <h3 className="text--center">{slides[currentIndex].title}</h3>
        {slides[currentIndex].lists.map(list => (
          <>
            {list.descriptions.map(d => (
              <div>{d}</div>
            ))}
            <ul>
              {list.items.map(i => {
                return (
                  <li>{i}</li>
                )
              })}
            </ul>
          </>
        ))}
      </div>
    </section>
  );
};

export default Carousel;
