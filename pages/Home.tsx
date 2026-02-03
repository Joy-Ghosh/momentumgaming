
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Play, Trophy, Users, Monitor, Zap } from 'lucide-react';
import { SERVICES, PROJECTS, TOURNAMENTS } from '../data';

const Home: React.FC = () => {
  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black z-10" />
          {/* Navbar Gradient Overlay for better text visibility without solid bg */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent z-20" />
          <img
            src="/images/hero_bg.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 text-center flex flex-col items-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm animate-fade-in-up">
            <Zap size={14} className="text-blue-400 mr-2" />
            <span className="text-xs font-black tracking-widest text-blue-100 uppercase">Next-Gen Production Studio</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-industry italic tracking-tighter text-white leading-[0.85] mb-2 animate-fade-in-up delay-100 py-4">
            REDEFINING <br />
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 pr-10 pb-2">ESPORTS ENERGY</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed animate-fade-in-up delay-200">
            We create immersive tournament experiences and broadcast solutions for world-class brands. Turning viewers into fans, and games into legends.
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up delay-300">
            <Link
              to="/contact"
              className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 font-black uppercase tracking-widest text-lg transition-all flex items-center justify-center transform hover:scale-105 active:scale-95 text-center min-w-[200px] -skew-x-12"
            >
              <span className="skew-x-12 flex items-center">
                Work With Us
                <ChevronRight className="ml-2 w-5 h-5" />
              </span>
            </Link>
            <Link
              to="/projects"
              className="w-full sm:w-auto border border-white/20 hover:border-white text-white px-10 py-4 font-black uppercase tracking-widest text-lg transition-all flex items-center justify-center hover:bg-white/5 text-center min-w-[200px] -skew-x-12"
            >
              <span className="skew-x-12">
                View Projects
              </span>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <div className="w-1 h-2 bg-orange-500 rounded-full" />
          </div>
        </div>
      </section>

      {/* Services Snapshot */}
      <section className="py-24 bg-zinc-950 bg-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase mb-4">What We Do</h2>
              <div className="h-2 w-24 bg-orange-600 mb-6" />
            </div>
            <Link to="/services" className="text-orange-500 font-bold uppercase tracking-widest flex items-center hover:text-white transition-colors mb-4 md:mb-0">
              View All Services <ChevronRight size={20} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service) => (
              <div key={service.id} className="group p-8 bg-black border border-white/5 hover:border-orange-600/50 transition-all">
                <div className="w-12 h-12 bg-white/5 flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors">
                  <Monitor className="text-white" />
                </div>
                <h3 className="text-xl font-black uppercase text-white mb-4 italic">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {service.benefit}
                </p>
                <Link to="/services" className="text-xs font-black uppercase tracking-widest text-white/40 group-hover:text-orange-500 transition-colors">
                  Explore Deliverables +
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credibility Stats */}
      <section className="py-20 bg-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Live Events', val: '500+' },
              { label: 'Total Views', val: '250M+' },
              { label: 'Brands Partnered', val: '40+' },
              { label: 'Live Broadcast Hours', val: '12k+' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl md:text-7xl font-black text-white italic mb-2 tracking-tighter">{stat.val}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-orange-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase mb-4">Featured Projects</h2>
            <div className="h-2 w-24 bg-blue-500" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {PROJECTS.map((project) => (
              <Link
                to={`/projects/${project.id}`}
                key={project.id}
                className="group relative overflow-hidden aspect-video cursor-pointer border border-white/10"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform group-hover:-translate-y-2">
                  <span className="text-xs font-black uppercase tracking-widest text-blue-400 mb-2 block">{project.category}</span>
                  <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter mb-2">{project.title}</h3>
                  <div className="flex items-center text-orange-500 font-bold uppercase tracking-widest text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    Case Study <ChevronRight size={16} className="ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tournament Highlights */}
      <section className="py-24 bg-zinc-900 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase mb-4">Tournaments</h2>
              <div className="h-2 w-24 bg-orange-600 mb-6 md:mb-0" />
            </div>
            <Link to="/tournaments" className="text-orange-500 font-bold uppercase tracking-widest flex items-center mb-4 md:mb-0">
              Full Schedule <ChevronRight size={20} className="ml-1" />
            </Link>
          </div>

          <div className="space-y-6">
            {TOURNAMENTS.map((t) => (
              <div key={t.id} className="bg-black border border-white/10 p-6 flex flex-col md:flex-row items-start md:items-center justify-between group hover:border-orange-500 transition-colors">
                <div className="flex items-center space-x-6 mb-4 md:mb-0">
                  <div className="block w-24 h-24 bg-zinc-800 shrink-0 overflow-hidden">
                    <img src={t.image} alt={t.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 ${t.status === 'Live' ? 'bg-red-600 text-white' : 'bg-zinc-700 text-zinc-300'} mb-2 inline-block`}>
                      {t.status}
                    </span>
                    <h4 className="text-2xl font-black italic text-white uppercase tracking-tighter">{t.title}</h4>
                    <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">{t.game} • {t.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-8 mt-4 md:mt-0">
                  <div className="hidden lg:block">
                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Prize Pool</p>
                    <p className="text-2xl font-black text-white italic">{t.prizePool}</p>
                  </div>
                  <Link
                    to={`/tournaments/${t.id}`}
                    className="bg-white/5 group-hover:bg-orange-600 text-white px-8 py-4 font-black uppercase tracking-widest text-sm transition-all"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strong Final CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-7xl font-black italic text-white uppercase tracking-tighter leading-tight mb-8">
            READY TO SCALE YOUR <span className="text-orange-600">ESPORTS</span> VISION?
          </h2>
          <p className="text-xl text-zinc-400 mb-12">
            Join the ranks of leading brands trust Momentum Gaming for their production and event needs.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-16 py-6 font-black uppercase tracking-widest text-xl transition-all transform hover:scale-105 active:scale-95 shadow-2xl"
          >
            Start A Conversation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
