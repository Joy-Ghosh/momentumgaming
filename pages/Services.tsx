import React, { useEffect } from 'react';
import { SERVICES } from '../data';
import { Shield, Tv, Users, Layers, ChevronRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap: Record<string, any> = { Shield, Tv, Users, Layers };

const Services: React.FC = () => {
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

  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      {/* ── Header ── */}
      <div className="relative pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Decorative vertical strip */}
        <div className="absolute left-4 sm:left-6 top-28 bottom-0 w-px bg-gradient-to-b from-orange-500/40 via-orange-500/10 to-transparent pointer-events-none" />

        <header className="mb-20 pl-6 reveal">
          <p className="text-orange-500 text-xs font-black uppercase tracking-widest mb-4">What We Deliver</p>
          <h1 className="text-5xl md:text-8xl font-black italic text-white uppercase tracking-tighter mb-6">
            Our <span className="text-orange-600">Services</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
            From professional tournament management to high-end broadcast production, we provide everything needed to build a successful esports ecosystem.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <div key={service.id} className={`reveal reveal-delay-${i + 1}`}>
                <div className="group relative bg-zinc-950 border border-white/5 p-10 hover:border-orange-500/30 transition-all duration-500 flex flex-col h-full overflow-hidden cursor-pointer hover:shadow-[0_0_50px_rgba(234,88,12,0.08)]">
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[48px] border-t-orange-600/0 border-l-[48px] border-l-transparent group-hover:border-t-orange-600/20 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-600/0 group-hover:from-orange-600/3 to-transparent transition-all duration-500" />

                  <div className="flex items-center space-x-6 mb-10 relative z-10">
                    <div className="w-16 h-16 bg-white/5 flex items-center justify-center rounded-sm group-hover:bg-orange-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg">
                      <Icon size={30} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter leading-none">{service.title}</h3>
                      <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">{service.deliverables.length} deliverables</span>
                    </div>
                  </div>

                  <p className="text-base text-orange-400/80 font-bold mb-8 italic relative z-10">
                    "{service.benefit}"
                  </p>

                  <div className="space-y-4 flex-grow mb-10 relative z-10">
                    {service.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start translate-x-0 group-hover:translate-x-1 transition-all duration-300"
                        style={{ transitionDelay: `${idx * 60}ms` }}
                      >
                        <div className="w-5 h-5 rounded-sm bg-zinc-800 group-hover:bg-orange-600/20 border border-zinc-700 group-hover:border-orange-500/30 flex items-center justify-center shrink-0 mt-0.5 mr-3 transition-all duration-300">
                          <Check size={12} className="text-zinc-600 group-hover:text-orange-400 transition-colors duration-300" />
                        </div>
                        <span className="text-zinc-500 group-hover:text-zinc-300 text-sm transition-colors duration-300">{item}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/contact"
                    className="relative z-10 w-full bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest py-5 px-8 group-hover:bg-orange-600 group-hover:border-orange-600 transition-all duration-300 flex items-center justify-center -skew-x-6 mt-auto"
                  >
                    <span className="skew-x-6 flex items-center">
                      Request Info <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Why Momentum ── */}
      <section className="bg-zinc-950 py-24 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 reveal">
            <p className="text-orange-500 text-xs font-black uppercase tracking-widest mb-3">Why Choose Us</p>
            <h2 className="text-4xl md:text-5xl font-black italic text-white uppercase tracking-tighter mb-4">Ready to grow your brand?</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              We operate on a white-label or collaborative basis. Whether you need a full turnkey solution or support in a specific vertical, Momentum Gaming is your partner.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { val: '100%', label: 'Brand Ownership', color: 'text-orange-500', desc: 'Your IP, your audience, your brand.' },
              { val: '24/7', label: 'Technical Support', color: 'text-blue-400', desc: 'Round-the-clock ops crew on standby.' },
              { val: 'Global', label: 'Reach & Scale', color: 'text-white', desc: 'Events that travel beyond borders.' },
            ].map((item, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1}`}>
                <div className="group p-8 bg-black border border-white/5 hover:border-orange-500/20 transition-all duration-300 text-center cursor-default hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(234,88,12,0.06)]">
                  <span className={`${item.color} font-black text-4xl mb-3 block tracking-tighter italic`}>{item.val}</span>
                  <p className="text-white text-xs uppercase tracking-widest mb-3 font-black">{item.label}</p>
                  <p className="text-zinc-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 reveal">
            <Link
              to="/contact"
              className="inline-block bg-orange-600 hover:bg-orange-500 text-white px-12 py-5 font-black uppercase tracking-widest text-base transition-all transform hover:scale-105 active:scale-95 -skew-x-6 shimmer-hover"
            >
              <span className="skew-x-6 inline-block">Start A Conversation</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
