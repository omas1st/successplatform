// src/pages/Home.js

import React, { useEffect, useState, useRef } from 'react';
import { useNavigate }        from 'react-router-dom';
import API                    from '../api';
import Header                 from '../components/Header';
import LottoBall              from '../components/LottoBall';
import './Home.css';

const TESTIMONIALS = [
  {
    id: 'thandi',
    name: 'Thandi',
    text: 'I almost gave up betting on UK49s because of endless losses. Taking one last chance with Success Winning Platform was the best decision ever. I won R320,000 and my life has changed!',
    initialLikes: 31802,
  },
  {
    id: 'robert',
    name: 'Robert',
    text: 'I Won R1.2 MILLION after activation ✈️ Travelling SA with my queen. Life’s SHORT',
    initialLikes: 14505,
  },
  {
    id: 'mahlaba',
    name: 'Mahlaba',
    text: 'I’d been scammed and lost count of my losses. But Success Winning Platform gave me a real win, R800,000 won just after activating my account!',
    initialLikes: 28811,
  },
  {
    id: 'modiba',
    name: 'Modiba',
    text: 'I’ve tried many platforms, but this is the only one that delivered. I won R300,000. Dreams do come true!',
    initialLikes: 26108,
  },
  {
    id: 'sphelele',
    name: 'Sphelele',
    text: 'I was skeptical at first, but after winning R160,000, I’m now a true believer. The process was simple and the results were real.',
    initialLikes: 10730,
  },
  {
    id: 'sbusiso',
    name: 'Sbusiso',
    text: 'With R430,000 in winnings, I can finally renovate my home. I’m so thankful for this platform and the admin.',
    initialLikes: 18451,
  },
  {
    id: 'ntombikhona',
    name: 'Ntombikhona',
    text: 'After endless losses and scams, I tried Success Winning Platform as my last hope. Their numbers brought me R1,100,000 unbelievable!',
    initialLikes: 33148,
  },
  {
    id: 'william',
    name: 'William',
    text: 'I was shocked when I saw I had won R600,000. This platform is the real deal for anyone looking to win big.',
    initialLikes: 19193,
  },
  {
    id: 'thamsanqa',
    name: 'Thamsanqa',
    text: 'After activating my account, I received my numbers and won R1,300,000! I’m forever grateful for this life-changing win.',
    initialLikes: 24670,
  },
  {
    id: 'john',
    name: 'John',
    text: 'I never thought I’d win after so many disappointments. Success Winning Platform gave me 3 straight numbers and bonus after i activated my account. I won R750,000!',
    initialLikes: 11304,
  },
  {
    id: 'kgomotso',
    name: 'Kgomotso',
    text: 'I never imagined I’d win R350,000 so quickly. This platform is trustworthy and delivers on its promises.',
    initialLikes: 20002,
  },
  {
    id: 'annah',
    name: 'Annah',
    text: 'I nearly gave up on betting, but Success Winning Platform’s winning numbers changed my story. I won R950,000 and I’m so grateful., thanks to Success wining platform and its admins',
    initialLikes: 34706,
  },
  {
    id: 'dingane',
    name: 'Dingane',
    text: 'I was on the verge of quitting UK49s for good after so many losses and falling for scams. But after joining Success Winning Platform, I won R450,000 with their 3 straight numbers and bonus! I can’t believe my luck finally changed.',
    initialLikes: 30214,
  },
  {
    id: 'daniel',
    name: 'Daniel',
    text: 'Honestly, I had lost all hope in UK49s. Scammers took so much from me. But Success Winning Platform restored my faith. I won R120,000 right after activating my account!',
    initialLikes: 25523,
  },
];

export default function Home() {
  const [freeBalls, setFreeBalls]     = useState(Array(14).fill('00'));
  const [premium, setPremium]         = useState({ lunchtime: Array(4).fill('00'), teatime: Array(4).fill('00') });
  const [pastWinning, setPastWinning] = useState({ lunchtime: Array(4).fill('00'), teatime: Array(4).fill('00') });
  const [pastResults, setPastResults] = useState({ lunchtime: Array(7).fill('00'), teatime: Array(7).fill('00') });
  const [likes, setLikes]             = useState({});
  const [justLiked, setJustLiked]     = useState({});
  const navigate = useNavigate();

  // Carousel-specific state
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState('right'); // 'left' or 'right'
  const touchStartX = useRef(null);
  const autoAdvanceRef = useRef(null);

  // Load lotto data
  useEffect(() => {
    API.get('/lotto/free').then(r => setFreeBalls(r.data.balls)).catch(() => {});
    API.get('/lotto/premium').then(r => setPremium(r.data)).catch(() => {});
    API.get('/lotto/past-winning').then(r => setPastWinning(r.data)).catch(() => {});
    API.get('/lotto/past-results').then(r => setPastResults(r.data)).catch(() => {});
  }, []);

  // Initialize and daily-increment likes for testimonials
  useEffect(() => {
    const today = new Date().toDateString();
    const stored = JSON.parse(localStorage.getItem('testimonials') || '{}');
    const newLikes = {};

    TESTIMONIALS.forEach(({ id, initialLikes }) => {
      let { count = initialLikes, lastUpdate } = stored[id] || {};
      if (lastUpdate !== today) {
        count += 117;
        lastUpdate = today;
      }
      newLikes[id] = count;
      stored[id] = { count, lastUpdate };
    });

    setLikes(newLikes);
    localStorage.setItem('testimonials', JSON.stringify(stored));
  }, []);

  // Handle temporary “blue” effect on like click
  const handleLikeClick = id => {
    setJustLiked(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setJustLiked(prev => ({ ...prev, [id]: false }));
    }, 800);
  };

  // Helper: choose a random index different from current
  const randomNextIndex = (current, len) => {
    if (len <= 1) return current;
    let next = Math.floor(Math.random() * len);
    if (next === current) {
      // pick adjacent forward if random produced same
      next = (current + 1) % len;
    }
    return next;
  };

  // Carousel: auto-advance (randomly pick next)
  useEffect(() => {
    // clear any existing
    if (autoAdvanceRef.current) {
      clearInterval(autoAdvanceRef.current);
      autoAdvanceRef.current = null;
    }
    if (!isPaused) {
      autoAdvanceRef.current = setInterval(() => {
        setCurrentIdx(prev => {
          const next = randomNextIndex(prev, TESTIMONIALS.length);
          // decide direction for animation
          if (next === prev) {
            setDirection('right');
          } else {
            setDirection(next > prev ? 'right' : 'left');
          }
          return next;
        });
      }, 5000);
    }
    return () => {
      if (autoAdvanceRef.current) {
        clearInterval(autoAdvanceRef.current);
        autoAdvanceRef.current = null;
      }
    };
  }, [isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handler = e => {
      if (e.key === 'ArrowLeft') {
        setDirection('left');
        setCurrentIdx(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
      } else if (e.key === 'ArrowRight') {
        setDirection('right');
        setCurrentIdx(prev => (prev + 1) % TESTIMONIALS.length);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const goPrev = () => {
    setDirection('left');
    setCurrentIdx(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };
  const goNext = () => {
    setDirection('right');
    setCurrentIdx(prev => (prev + 1) % TESTIMONIALS.length);
  };

  const handleDotClick = (idx) => {
    if (idx === currentIdx) return;
    setDirection(idx > currentIdx ? 'right' : 'left');
    setCurrentIdx(idx);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const startX = touchStartX.current;
    if (startX == null) return;
    const diff = startX - endX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // swipe left -> next
        setDirection('right');
        setCurrentIdx(prev => (prev + 1) % TESTIMONIALS.length);
      } else {
        // swipe right -> prev
        setDirection('left');
        setCurrentIdx(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
      }
    }
    touchStartX.current = null;
  };

  const current = TESTIMONIALS[currentIdx];

  return (
    <div className="home-page">
      <Header hideNav />

      <main>
        <section>
          <h2>Free Lunchtime &amp; Teatime Numbers (Today)</h2>
          <div className="balls-grid">
            {freeBalls.map((v, i) => <LottoBall key={i} value={v} />)}
          </div>
        </section>

        <section>
          <h2>Premium Winning Numbers</h2>
          <div className="predictions">
            {['lunchtime','teatime'].map(type => (
              <div key={type}>
                <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                <div className="balls-row">
                  {(premium[type] || []).map((v, i) => (
                    <LottoBall key={i} value={v} color={i < 3 ? '#88f' : '#f88'} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="cta">
          <p>
            Get premium 3 straight winning numbers and Bonus today, click the continue button below to get our premium numbers.
          </p>
          <button onClick={() => navigate('/login')}>Continue</button>
        </section>

        <section>
          <h2>Past Winning Numbers</h2>
          <div className="balls-row">
            {pastWinning.lunchtime.map((v, i) => <LottoBall key={i} value={v} />)}
          </div>
          <div className="balls-row">
            {pastWinning.teatime.map((v, i) => <LottoBall key={i} value={v} />)}
          </div>
        </section>

        <section>
          <h2>Past Results</h2>
          <div className="balls-row">
            {pastResults.lunchtime.map((v, i) => <LottoBall key={i} value={v} />)}
          </div>
          <div className="balls-row">
            {pastResults.teatime.map((v, i) => <LottoBall key={i} value={v} />)}
          </div>
        </section>

        {/* Testimonials Section (Carousel) */}
        <section
          className="testimonials-section"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-roledescription="carousel"
        >
          <h2>What Our Winners Say</h2>

          <div className="testimonial-carousel">
            <button
              className="carousel-control prev"
              aria-label="Previous testimonial"
              onClick={goPrev}
            >
              ‹
            </button>

            <div
              className={`testimonial-display ${direction === 'left' ? 'slide-left' : 'slide-right'}`}
              role="group"
              aria-label={`Testimonial ${currentIdx + 1} of ${TESTIMONIALS.length}`}
            >
              <div className="testimonial">
                <div className="avatar">{current.name.charAt(0)}</div>
                <div className="testimonial-content">
                  <strong>{current.name}</strong>
                  <p>{current.text}</p>
                  <div className="testimonial-actions">
                    <button
                      className={`like-button ${justLiked[current.id] ? 'liked' : ''}`}
                      onClick={() => handleLikeClick(current.id)}
                    >
                      👍 {likes[current.id] || 0}
                    </button>
                    <button className="comment-link" disabled>
                      💬 Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="carousel-control next"
              aria-label="Next testimonial"
              onClick={goNext}
            >
              ›
            </button>
          </div>

          <div className="carousel-dots" role="tablist" aria-label="Testimonial navigation">
            {TESTIMONIALS.map((t, idx) => (
              <button
                key={t.id}
                className={`dot ${idx === currentIdx ? 'active' : ''}`}
                onClick={() => handleDotClick(idx)}
                aria-label={`Show testimonial ${idx + 1}`}
                aria-selected={idx === currentIdx}
                role="tab"
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Success Platform contact: uk49success@gmail.com</p>
      </footer>
    </div>
  );
}
