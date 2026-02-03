
import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../data';
import { ArrowRight } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <div className="bg-black min-h-screen pb-24">
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <header className="mb-20">
          <h1 className="text-6xl md:text-8xl font-black italic text-white uppercase tracking-tighter mb-6">
            Case <span className="text-blue-500">Studies</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
            Deep dives into our most successful collaborations, productions, and brand integrations.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-20">
          {PROJECTS.map((project, idx) => (
            <div key={project.id} className={`flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 group`}>
              <Link to={`/projects/${project.id}`} className="w-full md:w-3/5 overflow-hidden border border-white/10 relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <div className="w-full md:w-2/5 flex flex-col justify-center">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-orange-500 mb-4 block">Client: {project.client}</span>
                <h2 className="text-4xl md:text-5xl font-black italic text-white uppercase tracking-tighter mb-6 leading-none">
                  {project.title}
                </h2>
                <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                  {project.summary}
                </p>
                <div className="flex flex-wrap gap-3 mb-10">
                  {project.deliverables.map(d => (
                    <span key={d} className="px-3 py-1 bg-white/5 border border-white/10 text-zinc-300 text-[10px] font-black uppercase tracking-widest">
                      {d}
                    </span>
                  ))}
                </div>
                <Link 
                  to={`/projects/${project.id}`}
                  className="inline-flex items-center text-white font-black uppercase tracking-widest group-hover:text-blue-500 transition-colors"
                >
                  View full case study <ArrowRight size={20} className="ml-3 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
