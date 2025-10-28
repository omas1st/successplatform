// src/pages/Home.js

import React, { useEffect, useState, useRef } from 'react';
import { useNavigate }        from 'react-router-dom';
import API                    from '../api';
import Header                 from '../components/Header';
import LottoBall              from '../components/LottoBall';
import './Home.css';

const TESTIMONIALS = [
  {
  id: 'sipho',
  name: 'Sipho',
  text: 'I almost gave up after so many losses, but Success Winning Platform changed everything. I activated my account and won R450,000 — life literally turned around for me.',
  initialLikes: 20214,
},
{
  id: 'lerato',
  name: 'Lerato',
  text: 'After falling for scams before, I finally trusted Success Winning Platform. I won R780,000 right after activation — I can\'t stop smiling.',
  initialLikes: 32718,
},
{
  id: 'kagiso',
  name: 'Kagiso',
  text: 'I was skeptical at first, but their numbers worked. I won R1,150,000 and now I have money to support my family.',
  initialLikes: 15892,
},
{
  id: 'thabo',
  name: 'Thabo',
  text: 'I thought wins like this never happen to me. After activating, I got the numbers and won R250,000 — unbelievable!',
  initialLikes: 18903,
},
{
  id: 'mbali',
  name: 'Mbali',
  text: 'Endless losses had me down. Success Winning Platform restored my hope — I won R960,000 after activation.',
  initialLikes: 34111,
},
{
  id: 'andile',
  name: 'Andile',
  text: 'I joined as a last chance and it paid off. I won R310,000 — the process was simple and fast.',
  initialLikes: 14276,
},
{
  id: 'nomvula',
  name: 'Nomvula',
  text: 'Scammed many times before. This time I won R520,000 with Success Winning Platform. I’m so grateful to the admins.',
  initialLikes: 28902,
},
{
  id: 'jabulani',
  name: 'Jabulani',
  text: 'I never expected a win this big. After activation I won R1,800,000 — life-changing is an understatement.',
  initialLikes: 37120,
},
{
  id: 'nthabiseng',
  name: 'Nthabiseng',
  text: 'I had lost hope but decided to try one more time. I won R195,000 right after activating my account — thank you!',
  initialLikes: 11644,
},
{
  id: 'tshepo',
  name: 'Tshepo',
  text: 'This platform is real. I followed instructions and won R660,000. Finally I can start my small business.',
  initialLikes: 23380,
},
{
  id: 'kabelo',
  name: 'Kabelo',
  text: 'I was skeptical, now I’m a believer — R400,000 landed in my life after I activated. Thank you Success Winning Platform.',
  initialLikes: 27891,
},
{
  id: 'mpumi',
  name: 'Mpumi',
  text: 'After many disappointments, I got a real win. I won R220,000 — this platform restored my trust.',
  initialLikes: 13027,
},
{
  id: 'vusi',
  name: 'Vusi',
  text: 'I finally won big after years of losses. R1,250,000 came through after activation — I’m speechless.',
  initialLikes: 30455,
},
{
  id: 'nolwazi',
  name: 'Nolwazi',
  text: 'I activated my account and the numbers were spot on. I won R350,000 and can now fix my house roof.',
  initialLikes: 19872,
},
{
  id: 'roland',
  name: 'Roland',
  text: 'I didn’t believe at first but got R520,000 after activation. This platform delivered as promised.',
  initialLikes: 15490,
},
{
  id: 'anele',
  name: 'Anele',
  text: 'After falling for scams before, Success Winning Platform gave me clarity and a win — R715,000!',
  initialLikes: 29814,
},
{
  id: 'kgopotso',
  name: 'Kgopotso',
  text: 'I was on the verge of quitting UK49s, then I tried Success Winning Platform and won R285,000 right away.',
  initialLikes: 12130,
},
{
  id: 'zinhle',
  name: 'Zinhle',
  text: 'What a relief — I won R540,000 after activating. The team was professional and supportive.',
  initialLikes: 26302,
},
{
  id: 'mpho',
  name: 'Mpho',
  text: 'From constant losses to a big win: R1,900,000 after I followed the instructions. I’m forever grateful.',
  initialLikes: 37904,
},
{
  id: 'sibongile',
  name: 'Sibongile',
  text: 'I took a chance and it paid off. Won R180,000 after activation — such a blessing.',
  initialLikes: 11109,
},
{
  id: 'nelson',
  name: 'Nelson',
  text: 'I won R600,000 and can finally pay off my debts. Success Winning Platform truly works.',
  initialLikes: 21644,
},
{
  id: 'bongekile',
  name: 'Bongekile',
  text: 'I’d been through scams, but this time I won R330,000 after activating my account. Thank you.',
  initialLikes: 27499,
},
{
  id: 'pieter',
  name: 'Pieter',
  text: 'I tried other services before with no luck. Here I won R200,000 after activation — very happy.',
  initialLikes: 10357,
},
{
  id: 'anika',
  name: 'Anika',
  text: 'After endless losses, a real win finally came: R470,000. I’m relieved and thankful.',
  initialLikes: 14892,
},
{
  id: 'sifiso',
  name: 'Sifiso',
  text: 'This platform changed my life — I won R1,010,000 right after activating my account.',
  initialLikes: 33210,
},
{
  id: 'lebohang',
  name: 'Lebohang',
  text: 'I was desperate but decided to try one last time. I won R240,000 — unbelievable feeling.',
  initialLikes: 12784,
},
{
  id: 'thuli',
  name: 'Thuli',
  text: 'Success Winning Platform delivered when others failed. I won R390,000 after activation.',
  initialLikes: 22119,
},
{
  id: 'rewind',
  name: 'Rewind',
  text: 'I wasn’t hopeful but the numbers were accurate — R1,600,000 credited after activation. Life transformed.',
  initialLikes: 25678,
},
{
  id: 'zuma',
  name: 'Zuma',
  text: 'After many losses I finally saw a real win. I won R155,000 and can breathe again.',
  initialLikes: 11052,
},
{
  id: 'olwethu',
  name: 'Olwethu',
  text: 'I won R980,000 and it paid for my child’s schooling. Cannot thank the admins enough.',
  initialLikes: 31985,
},
{
  id: 'kyle',
  name: 'Kyle',
  text: 'I tried Success Winning Platform out of curiosity and won R370,000 — everything was handled professionally.',
  initialLikes: 13907,
},
{
  id: 'raph',
  name: 'Raph',
  text: 'After many bad experiences, I finally won R430,000. This platform is trustworthy.',
  initialLikes: 20564,
},
{
  id: 'masego',
  name: 'Masego',
  text: 'I almost gave up on UK49s — then this platform helped me win R650,000. So thankful.',
  initialLikes: 29311,
},
{
  id: 'dineo',
  name: 'Dineo',
  text: 'Three straight numbers and the bonus worked for me. I won R270,000 after activating my account.',
  initialLikes: 16380,
},
{
  id: 'cedric',
  name: 'Cedric',
  text: 'I won R1,300,000 and finally cleared my family’s debts. Truly a life-changing service.',
  initialLikes: 34512,
},
{
  id: 'nomsa',
  name: 'Nomsa',
  text: 'I was nervous but it worked. R520,000 in winnings after activation — I’m thrilled.',
  initialLikes: 22807,
},
{
  id: 'enzo',
  name: 'Enzo',
  text: 'After so many losses I believed there were no winners left — then I won R175,000. Thank you.',
  initialLikes: 12098,
},
{
  id: 'phindile',
  name: 'Phindile',
  text: 'Success Winning Platform turned my luck around — I won R840,000 right after activating my account.',
  initialLikes: 30121,
},
{
  id: 'omphile',
  name: 'Omphile',
  text: 'I had tried everything. This was the real deal — R940,000 credited after activation.',
  initialLikes: 25144,
},
{
  id: 'kevin',
  name: 'Kevin',
  text: 'I won R210,000 and used it to start a small shop. Grateful to the team for their support.',
  initialLikes: 16688,
},
{
  id: 'nandi',
  name: 'Nandi',
  text: 'After years of losing, I finally won R560,000. This platform is the real deal for winners.',
  initialLikes: 28831,
},
{
  id: 'tumi',
  name: 'Tumi',
  text: 'I activated and won R1,750,000 — I still can’t believe it. Changed my family’s future.',
  initialLikes: 37719,
},
{
  id: 'gavin',
  name: 'Gavin',
  text: 'I was cynical but decided to try — it worked. I won R300,000 after activation.',
  initialLikes: 14129,
},
{
  id: 'mihlali',
  name: 'Mihlali',
  text: 'I lost a lot before, but Success Winning Platform helped me win R480,000. So happy right now.',
  initialLikes: 19576,
},
{
  id: 'sanele',
  name: 'Sanele',
  text: 'I was on the edge of giving up. A win of R1,050,000 came after activation — life changing.',
  initialLikes: 33908,
},
{
  id: 'pumla',
  name: 'Pumla',
  text: 'Exactly what I needed — R230,000 after I followed the instructions. Thank you Success Winning Platform.',
  initialLikes: 12205,
},
{
  id: 'bryan',
  name: 'Bryan',
  text: 'I won R710,000 and now I’m able to pay for my wife’s medical bills. Forever grateful.',
  initialLikes: 27430,
},
{
  id: 'thandeka',
  name: 'Thandeka',
  text: 'This platform is different — won R490,000 right after activating. I’m now a true believer.',
  initialLikes: 20876,
},
{
  id: 'phila',
  name: 'Phila',
  text: 'After many disappointments, I finally won R160,000 and that was enough to start fresh.',
  initialLikes: 10192,
},
{
  id: 'morne',
  name: 'Morne',
  text: 'I used to doubt platforms like this, but I won R2,000,000 — it changed my life entirely.',
  initialLikes: 38704,
},
{
  id: 'khumo',
  name: 'Khumo',
  text: 'R350,000 came after activation — I can now support my family and feel secure.',
  initialLikes: 21705,
},
{
  id: 'zuko',
  name: 'Zuko',
  text: 'After so many losses, finally a win of R290,000. Thanks to Success Winning Platform for being real.',
  initialLikes: 16011,
},
{
  id: 'luyanda',
  name: 'Luyanda',
  text: 'I won R520,000 and used it to pay tuition fees. This platform gave my children a future.',
  initialLikes: 28390,
},
{
  id: 'maru',
  name: 'Maru',
  text: 'I activated and won R410,000 — quick, smooth and trustworthy. Highly recommended.',
  initialLikes: 17455,
},
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

  // Load lotto data - removed free balls
  useEffect(() => {
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

  // Handle temporary "blue" effect on like click
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

  // Carousel: auto-advance (randomly pick next) — interval changed to 2000ms (2s)
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
      }, 2000);
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
        {/* Removed the 14 free balls section */}

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

          {/* removed dot indicators as requested */}

        </section>
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Success Platform contact: uk49success@gmail.com</p>
      </footer>
    </div>
  );
}
