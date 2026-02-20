import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight, Play, Trophy, Users, Monitor, Zap,
  Shield, Tv, Layers, ArrowRight
} from 'lucide-react';
import { SERVICES, PROJECTS, TOURNAMENTS } from '../data';

/* ─── Typewriter hook ─── */
const phrases = ['We Build Legends.', 'We Create Moments.', 'We Are The Energy.', 'We Define Esports.'];

function useTypewriter() {
  const [text, setText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    const speed = deleting ? 45 : 80;

    const timer = setTimeout(() => {
      if (!deleting) {
        setText(current.substring(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1800);
        } else {
          setCharIdx((c) => c + 1);
        }
      } else {
        setText(current.substring(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setPhraseIdx((i) => (i + 1) % phrases.length);
          setCharIdx(0);
        } else {
          setCharIdx((c) => c - 1);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIdx, deleting, phraseIdx]);

  return text;
}

/* ─── Count-up hook ─── */
function useCountUp(target: number, trigger: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [trigger, target, duration]);
  return val;
}

/* ─── Tilt card ─── */
const TiltCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
  };
  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <div
      ref={ref}
      className={`tilt-wrap transition-transform duration-200 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

/* ─── Manifesto Marquee ─── */
const ManifestoMarquee = () => {
  const row1 = '· FEEL THE ENERGY · 25M+ VIEWS · BUILT FOR ESPORTS · GAME-CHANGING PRODUCTION · MOMENTUM IS HERE · ';
  const row2 = '· BROADCAST QUALITY · BRAND AMPLIFIED · LEGENDS ARE MADE HERE · 10+ LIVE EVENTS · WE RUN THE GAME · ';

  return (
    <div className="py-5 overflow-hidden bg-orange-600 relative">
      <div className="overflow-hidden mb-2">
        <div className="marquee-track-ltr">
          <span className="text-black font-black text-sm uppercase tracking-widest whitespace-nowrap pr-0">{row1.repeat(4)}</span>
          <span className="text-black font-black text-sm uppercase tracking-widest whitespace-nowrap">{row1.repeat(4)}</span>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="marquee-track-rtl">
          <span className="text-orange-200/60 font-black text-xs uppercase tracking-wider whitespace-nowrap">{row2.repeat(4)}</span>
          <span className="text-orange-200/60 font-black text-xs uppercase tracking-wider whitespace-nowrap">{row2.repeat(4)}</span>
        </div>
      </div>
    </div>
  );
};

/* ─── Floating Particle ─── */
const Particle = ({ style }: { style: React.CSSProperties }) => (
  <div
    className="particle w-1.5 h-1.5 bg-orange-500/40"
    style={style}
    aria-hidden="true"
  />
);

/* ─── Stats section ─── */
const STATS = [
  { label: 'Live Events', raw: 10, suffix: '+' },
  { label: 'Total Views', raw: 25, suffix: 'M+' },
  { label: 'Brands Partnered', raw: 6, suffix: '+' },
  { label: 'Broadcast Hours', raw: 32, suffix: '+' },
];

const StatsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true); },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-orange-600 relative overflow-hidden">
      <div className="scan-line" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <StatItem key={i} stat={stat} triggered={triggered} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatItem = ({ stat, triggered }: { stat: typeof STATS[0]; triggered: boolean }) => {
  const val = useCountUp(stat.raw, triggered);
  return (
    <div className="text-center hover:-translate-y-2 transition-transform duration-300 cursor-default">
      <div className="text-5xl md:text-7xl font-black text-white italic mb-2 tracking-tighter tabular-nums">
        {val}{stat.suffix}
      </div>
      <div className="text-xs font-bold uppercase tracking-widest text-orange-200">{stat.label}</div>
    </div>
  );
};

/* ─── Main Home ─── */
const Home: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const typeText = useTypewriter();

  const iconMap: any = { Shield, Tv, Users, Layers };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Stagger reveal observer
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .clip-reveal');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const particles = Array.from({ length: 12 }, (_, i) => ({
    style: {
      left: `${(i * 8.3) % 100}%`,
      top: `${20 + (i * 13) % 60}%`,
      '--dur': `${5 + (i % 4)}s`,
      '--delay': `${(i * 0.5) % 3}s`,
    } as React.CSSProperties,
  }));

  return (
    <div className="bg-black overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black z-10" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent z-20" />
          <img
            src="/images/hero_bg.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover animate-slow-zoom"
            style={{ transform: `scale(1.05) translateY(${scrollY * 0.08}px)` }}
          />
        </div>

        {/* Floating particles */}
        {particles.map((p, i) => (
          <Particle key={i} style={p.style} />
        ))}

        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 text-center flex flex-col items-center"
          style={{ transform: `translateY(${scrollY * 0.25}px)` }}
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/8 backdrop-blur-sm animate-fade-in-up mb-6">
            <Zap size={14} className="text-orange-400 mr-2" />
            <span className="text-xs font-black tracking-widest text-orange-100 uppercase">Next-Gen Production Studio</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-industry italic tracking-tighter text-white leading-[0.85] animate-fade-in-up delay-100 py-4">
            REDEFINING <br />
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 pr-10 pb-2">
              ESPORTS ENERGY
            </span>
          </h1>

          {/* Typewriter line */}
          <div className="h-8 flex items-center justify-center animate-fade-in-up delay-200 mb-4">
            <span className="text-lg sm:text-xl text-orange-400 font-bold tracking-wide">
              {typeText}
            </span>
            <span className="typewriter-cursor" aria-hidden="true" />
          </div>

          <p className="text-base sm:text-lg text-gray-400 mb-10 max-w-xl leading-relaxed animate-fade-in-up delay-300">
            We create immersive tournaments and broadcasts that make viewers stay, fans cheer, and games legendary
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up delay-400">
            <Link
              to="/contact"
              className="relative w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-white px-10 py-4 font-black uppercase tracking-widest text-base transition-all flex items-center justify-center transform hover:scale-105 active:scale-95 -skew-x-12 shimmer-hover ring-pulse"
            >
              <span className="skew-x-12 flex items-center">
                Work With Us
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              to="/projects"
              className="w-full sm:w-auto border border-white/20 hover:border-orange-500/50 text-white px-10 py-4 font-black uppercase tracking-widest text-base transition-all flex items-center justify-center hover:bg-white/5 -skew-x-12"
            >
              <span className="skew-x-12 flex items-center gap-2">
                <Play size={16} /> View Projects
              </span>
            </Link>
          </div>
        </div>


      </section>

      {/* ── Manifesto Marquee ── */}
      <ManifestoMarquee />

      {/* ── Services ── */}
      <section className="py-24 bg-zinc-950 bg-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div className="reveal">
              <p className="text-orange-500 text-xs font-black uppercase tracking-widest mb-3">What We Build</p>
              <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase mb-4">Our Services</h2>
              <div className="h-2 w-24 bg-orange-600 mb-6" />
            </div>
            <Link to="/services" className="text-orange-500 font-bold uppercase tracking-widest flex items-center hover:text-white transition-colors mb-4 md:mb-0 reveal reveal-delay-2">
              View All Services <ChevronRight size={20} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, i) => {
              const Icon = iconMap[service.icon] || Monitor;
              return (
                <div
                  key={service.id}
                  className={`reveal reveal-delay-${i + 1}`}
                >
                  <TiltCard className="h-full">
                    <div className="h-full group relative p-8 bg-zinc-900/50 backdrop-blur-sm border border-white/5 hover:border-orange-500/50 transition-all duration-300 hover:shadow-[0_0_40px_rgba(234,88,12,0.12)] overflow-hidden cursor-pointer">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/0 to-orange-600/0 group-hover:from-orange-600/5 group-hover:to-transparent transition-all duration-500" />
                      <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/3 rounded-full blur-2xl group-hover:bg-orange-500/10 transition-all duration-500" />

                      <div className="relative z-10">
                        <div className="w-14 h-14 bg-white/5 rounded-sm flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:scale-110 transition-all duration-300 shadow-lg">
                          <Icon className="text-white w-6 h-6" />
                        </div>
                        <div className="text-[10px] text-zinc-600 font-black uppercase tracking-widest mb-2">
                          {service.deliverables.length} Deliverables
                        </div>
                        <h3 className="text-xl font-black uppercase text-white mb-3 italic tracking-tight">{service.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">
                          {service.benefit}
                        </p>
                        <Link to="/services" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-white/40 group-hover:text-orange-500 transition-colors">
                          Explore <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <StatsSection />

      {/* ── Featured Projects ── */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 reveal">
            <p className="text-blue-400 text-xs font-black uppercase tracking-widest mb-3">Proof of Impact</p>
            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase mb-4">Featured Projects</h2>
            <div className="h-2 w-24 bg-blue-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {PROJECTS.map((project, i) => (
              <div key={project.id} className={`reveal reveal-delay-${i + 1}`}>
                <Link
                  to={`/projects/${project.id}`}
                  className="group relative block overflow-hidden aspect-video cursor-pointer border border-white/10 hover:border-orange-500/30 transition-all duration-500"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                  {/* Hover tint */}
                  <div className="absolute inset-0 bg-orange-600/0 group-hover:bg-orange-600/10 transition-all duration-500" />

                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <span className="text-xs font-black uppercase tracking-widest text-blue-400 mb-2 block">{project.category}</span>
                    <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter mb-3">{project.title}</h3>

                    {/* Results on hover */}
                    <div className="overflow-hidden max-h-0 group-hover:max-h-20 transition-all duration-500 ease-in-out">
                      <p className="text-zinc-400 text-sm mb-3">{project.summary}</p>
                    </div>

                    <div className="flex items-center text-orange-500 font-bold uppercase tracking-widest text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      View Case Study <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Story (Brand Voice) ── */}
      <section className="relative py-28 overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 bg-grid opacity-30" />
        {/* Orb */}
        <div className="absolute -right-32 top-10 w-96 h-96 bg-orange-600/8 rounded-full blur-[100px] orb-drift pointer-events-none" />
        <div className="absolute -left-20 bottom-10 w-72 h-72 bg-blue-600/8 rounded-full blur-[80px] orb-drift pointer-events-none" style={{ animationDelay: '-7s' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="reveal">
              <p className="text-orange-500 text-xs font-black uppercase tracking-widest mb-8">Our Origin</p>
            </div>
            <blockquote className="reveal reveal-delay-1">
              <p className="text-4xl md:text-6xl font-black italic text-white tracking-tighter leading-[1.05] mb-12">
                "We started because we{' '}
                <span className="text-orange-500">played.</span>{' '}
                We grew because we{' '}
                <span className="text-blue-400">cared.</span>{' '}
                We're here because esports deserves{' '}
                <span className="text-white neon-text-orange">better.</span>"
              </p>
            </blockquote>
            <div className="reveal reveal-delay-2">
              <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mb-10">
                Momentum Gaming was born from late-night sessions, big dreams, and the belief that Indian esports could compete on the global stage. Every event we run carries that DNA — raw passion, broadcast excellence, community first.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-widest text-orange-500 hover:text-white transition-colors group"
              >
                <span className="w-8 h-px bg-orange-500 group-hover:w-12 transition-all duration-300" />
                Our Mission
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tournaments ── */}
      <section className="py-24 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div className="reveal">
              <p className="text-orange-500 text-xs font-black uppercase tracking-widest mb-3">Live & Upcoming</p>
              <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase mb-4">Tournaments</h2>
              <div className="h-2 w-24 bg-orange-600" />
            </div>
            <Link to="/tournaments" className="text-orange-500 font-bold uppercase tracking-widest flex items-center mb-4 md:mb-0 hover:text-white transition-colors reveal reveal-delay-2">
              Full Schedule <ChevronRight size={20} className="ml-1" />
            </Link>
          </div>

          <div className="space-y-4">
            {TOURNAMENTS.map((t, i) => (
              <div
                key={t.id}
                className={`reveal reveal-delay-${i + 1} tourney-row relative bg-zinc-950 border border-white/8 overflow-hidden`}
              >
                <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between group hover:border-orange-500/30 transition-colors">
                  <div className="flex items-center space-x-6 mb-4 md:mb-0">
                    <div className="block w-20 h-20 bg-zinc-800 shrink-0 overflow-hidden">
                      <img src={t.image} alt={t.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {t.status === 'Live' && <span className="live-dot" aria-label="Live" />}
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 ${t.status === 'Live' ? 'bg-red-600 text-white' :
                          t.status === 'Upcoming' ? 'bg-blue-600/20 text-blue-400 border border-blue-600/30' :
                            'bg-zinc-800 text-zinc-400'
                          }`}>
                          {t.status}
                        </span>
                      </div>
                      <h4 className="text-2xl font-black italic text-white uppercase tracking-tighter">{t.title}</h4>
                      <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest mt-1">{t.game} · {t.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-8 mt-4 md:mt-0">
                    <div className="hidden lg:block">
                      <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest mb-1">Prize Pool</p>
                      <p className="text-2xl font-black text-white italic">{t.prizePool}</p>
                    </div>
                    <Link
                      to={`/tournaments/${t.id}`}
                      className="bg-white/5 border border-white/8 group-hover:bg-orange-600 group-hover:border-orange-600 text-white px-8 py-4 font-black uppercase tracking-widest text-sm transition-all hover:scale-105 active:scale-95 -skew-x-6"
                    >
                      <span className="skew-x-6 inline-block">Details</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative py-36 overflow-hidden mesh-bg">
        {/* Decorative lines */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
          <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <div className="reveal">
            <p className="text-orange-500 text-xs font-black uppercase tracking-widest mb-6">Trusted by 6+ leading brands</p>
          </div>
          <h2 className="text-5xl md:text-7xl font-black italic text-white uppercase tracking-tighter leading-tight mb-8 reveal reveal-delay-1">
            READY TO{' '}
            <span className="glitch-text text-orange-600">LEVEL UP</span>{' '}
            YOUR NEXT EVENT?
          </h2>
          <p className="text-xl text-zinc-500 mb-12 max-w-xl mx-auto reveal reveal-delay-2">
            Join the ranks of leading brands that trust Momentum Gaming for their production and event needs.
          </p>
          <div className="reveal reveal-delay-3">
            <Link
              to="/contact"
              className="relative inline-block bg-orange-600 hover:bg-orange-500 text-white px-16 py-6 font-black uppercase tracking-widest text-xl transition-all transform hover:scale-105 active:scale-95 shadow-2xl shimmer-hover ring-pulse -skew-x-6"
            >
              <span className="skew-x-6 inline-block">Start A Conversation</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
