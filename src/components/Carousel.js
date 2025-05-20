import React, { useState } from 'react';
import './Carousel.css';

export default function Carousel({ items }) {
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((idx + items.length - 1) % items.length);
  const next = () => setIdx((idx + 1) % items.length);

  return (
    <div className="carousel">
      <button onClick={prev}>‹</button>
      <div className="carousel-item">{items[idx]}</div>
      <button onClick={next}>›</button>
    </div>
  );
}
