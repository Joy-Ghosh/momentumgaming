
import React from 'react';
import { TOURNAMENTS } from '../data';
import { Link } from 'react-router-dom';
import { Calendar, Trophy, ChevronRight } from 'lucide-react';

const Tournaments: React.FC = () => {
  return (
    <div className="bg-black min-h-screen pb-24">
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <header className="mb-20">
          <h1 className="text-6xl md:text-8xl font-black italic text-white uppercase tracking-tighter mb-6">
            Live <span className="text-orange-600">Events</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
            Our upcoming and past tournament operations. From stadium-scale events to online community cups.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TOURNAMENTS.map((t) => (
            <div key={t.id} className="bg-zinc-950 border border-white/10 flex flex-col group overflow-hidden">
              <div className="relative aspect-video overflow-hidden">
                <img src={t.image} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white ${t.status === 'Live' ? 'bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]' : 'bg-zinc-800'}`}>
                    {t.status}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center space-x-2 text-zinc-500 mb-4">
                  <Calendar size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{t.date}</span>
                </div>
                <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter mb-4 group-hover:text-orange-500 transition-colors">{t.title}</h3>
                <p className="text-zinc-400 text-sm mb-8 leading-relaxed flex-grow">
                  {t.summary}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-widest text-zinc-500">Prize Pool</span>
                    <span className="text-xl font-black text-white italic tracking-tighter">{t.prizePool}</span>
                  </div>
                  <Link to={`/tournaments/${t.id}`} className="p-4 bg-white/5 hover:bg-orange-600 text-white transition-all">
                    <ChevronRight size={20} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tournaments;
