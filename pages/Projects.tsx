import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowRight } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  sponsor: string;
  banner_url: string;
  summary: string;
  services: string[];
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen pb-24">
      <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <header className="mb-20">
          <h1 className="text-5xl md:text-8xl font-black italic text-white uppercase tracking-tighter mb-6">
            Case <span className="text-blue-500">Studies</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
            Deep dives into our most successful collaborations, productions, and brand integrations.
          </p>
        </header>

        {loading ? (
          <div className="text-white text-center py-20 animate-pulse uppercase tracking-widest font-bold">
            Loading Case Studies...
          </div>
        ) : projects.length === 0 ? (
          <div className="text-zinc-500 text-center py-20 uppercase tracking-widest font-bold">
            No projects found.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-20">
            {projects.map((project, idx) => (
              <div key={project.id} className={`flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 group`}>
                <Link to={`/projects/${project.id}`} className="w-full md:w-3/5 overflow-hidden border border-white/10 relative">
                  {project.banner_url ? (
                    <img
                      src={project.banner_url}
                      alt={project.title}
                      className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full aspect-video bg-zinc-900 flex items-center justify-center text-zinc-700 font-bold uppercase tracking-widest">
                      No Image Available
                    </div>
                  )}
                  <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <div className="w-full md:w-2/5 flex flex-col justify-center">
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-orange-500 mb-4 block">
                    Client: {project.sponsor || 'Momentum Gaming'}
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black italic text-white uppercase tracking-tighter mb-6 leading-none">
                    {project.title}
                  </h2>
                  <p className="text-zinc-400 text-lg mb-8 leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>
                  <div className="flex flex-wrap gap-3 mb-10">
                    {project.services?.slice(0, 3).map((d, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-zinc-300 text-[10px] font-black uppercase tracking-widest">
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
        )}
      </div>
    </div>
  );
};

export default Projects;
