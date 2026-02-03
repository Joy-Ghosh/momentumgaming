
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { TOURNAMENTS } from '../data';
import { ArrowLeft, Clock, Info, Video, Trophy } from 'lucide-react';

const TournamentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tournament = TOURNAMENTS.find(t => t.id === id);

  if (!tournament) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-black italic mb-4">Event Not Found</h1>
          <Link to="/tournaments" className="text-orange-500 underline uppercase tracking-widest font-bold">Back to Events</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      <section className="relative h-[50vh]">
        <img src={tournament.image} alt={tournament.title} className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-7xl mx-auto">
             <button onClick={() => navigate(-1)} className="flex items-center text-zinc-400 hover:text-white mb-8 transition-colors uppercase font-bold text-xs tracking-widest">
              <ArrowLeft size={16} className="mr-2" /> Back
            </button>
            <div className="inline-block px-4 py-1 bg-orange-600 text-white font-black uppercase text-[10px] tracking-widest mb-6">{tournament.status}</div>
            <h1 className="text-5xl md:text-8xl font-black italic text-white uppercase tracking-tighter leading-none">{tournament.title}</h1>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter mb-8 border-l-4 border-orange-600 pl-4">Overview</h2>
              <p className="text-xl text-zinc-300 leading-relaxed mb-6">
                {tournament.summary}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
                <div className="p-8 bg-zinc-900 border border-white/5">
                  <div className="flex items-center space-x-3 mb-4 text-orange-500">
                    <Trophy size={20} />
                    <span className="font-black uppercase tracking-widest text-xs">Competition Format</span>
                  </div>
                  <p className="text-xl font-bold italic text-white uppercase tracking-tighter">{tournament.format}</p>
                </div>
                <div className="p-8 bg-zinc-900 border border-white/5">
                  <div className="flex items-center space-x-3 mb-4 text-blue-500">
                    <Info size={20} />
                    <span className="font-black uppercase tracking-widest text-xs">Platform</span>
                  </div>
                  <p className="text-xl font-bold italic text-white uppercase tracking-tighter">{tournament.game}</p>
                </div>
              </div>
            </section>

            {tournament.schedule.length > 0 && (
              <section>
                <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter mb-8 border-l-4 border-blue-600 pl-4">Event Schedule</h2>
                <div className="space-y-4">
                  {tournament.schedule.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-6 bg-zinc-950 border border-white/5 hover:border-white/20 transition-all">
                      <div className="flex items-center space-x-4">
                        <Clock size={16} className="text-zinc-600" />
                        <span className="text-sm font-black text-orange-500 uppercase tracking-widest">{item.time}</span>
                      </div>
                      <span className="text-lg font-bold italic text-white uppercase tracking-tight">{item.activity}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {tournament.highlightVideo && (
              <section>
                <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter mb-8 border-l-4 border-red-600 pl-4">Recap Highlights</h2>
                <div className="aspect-video bg-zinc-900 border border-white/10 overflow-hidden">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={tournament.highlightVideo} 
                    title="Recap Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </section>
            )}
          </div>

          <div className="space-y-8">
            <div className="bg-zinc-950 p-10 border border-white/5 sticky top-32">
              <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter mb-8 text-center">Event Stats</h3>
              <div className="space-y-10">
                <div className="text-center">
                  <p className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-1">Prize Pool</p>
                  <p className="text-4xl font-black text-orange-500 italic tracking-tighter">{tournament.prizePool}</p>
                </div>
                <div className="text-center">
                  <p className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-1">Teams</p>
                  <p className="text-4xl font-black text-white italic tracking-tighter">16 Pro Teams</p>
                </div>
                <div className="text-center">
                  <p className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-1">Status</p>
                  <p className="text-4xl font-black text-blue-500 italic tracking-tighter">{tournament.status}</p>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-white/5">
                <Link to="/contact" className="block w-full text-center bg-white text-black py-4 font-black uppercase tracking-widest text-sm hover:bg-orange-600 hover:text-white transition-all">
                  Get Media Kit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetail;
