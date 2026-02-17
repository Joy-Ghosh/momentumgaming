import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft, BarChart, CheckCircle } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  sponsor: string;
  banner_url: string;
  summary: string;
  services: string[];
  results: string[];
}

const CaseStudy: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProject(id);
    }
  }, [id]);

  const fetchProject = async (projectId: string) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (error) throw error;
      setProject(data);
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center animate-pulse">
          <h1 className="text-xl font-bold uppercase tracking-widest">Loading Case Study...</h1>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-black italic mb-4">Project Not Found</h1>
          <Link to="/projects" className="text-orange-500 underline uppercase tracking-widest font-bold">Back to Projects</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] border-b border-white/10">
        {project.banner_url ? (
          <img src={project.banner_url} alt={project.title} className="w-full h-full object-cover opacity-50" />
        ) : (
          <div className="w-full h-full bg-zinc-900 opacity-50 flex items-center justify-center">
            <span className="text-white font-bold opacity-20 text-4xl">NO IMAGE</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <div className="max-w-7xl mx-auto">
            <button onClick={() => navigate(-1)} className="flex items-center text-zinc-400 hover:text-white mb-8 transition-colors">
              <ArrowLeft size={16} className="mr-2" /> Back
            </button>
            <span className="text-orange-500 font-black uppercase tracking-[0.2em] mb-4 block">
              Case Study // {project.sponsor || 'Momentum Gaming'}
            </span>
            <h1 className="text-5xl md:text-8xl font-black italic text-white uppercase tracking-tighter leading-none mb-6">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter mb-8 border-b border-orange-600 pb-2 inline-block">The Summary</h2>
            <p className="text-xl text-zinc-300 leading-relaxed mb-10 whitespace-pre-wrap">
              {project.summary}
            </p>

            {project.results && project.results.length > 0 && (
              <>
                <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter mb-8 border-b border-blue-600 pb-2 inline-block">Impact & Results</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
                  {project.results.map((result, i) => (
                    <div key={i} className="flex items-center space-x-4 p-6 bg-zinc-900 border border-white/5">
                      <BarChart className="text-orange-500 shrink-0" size={32} />
                      <span className="text-xl font-black italic text-white uppercase tracking-tighter leading-tight">{result}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="bg-zinc-950 p-8 border border-white/5 h-fit">
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-8 pb-4 border-b border-white/5">Services Delivered</h3>
            <ul className="space-y-4">
              {project.services && project.services.map((d, i) => (
                <li key={i} className="flex items-center text-white font-bold uppercase tracking-wider text-sm">
                  <CheckCircle size={16} className="mr-3 text-orange-600 shrink-0" /> {d}
                </li>
              ))}
            </ul>
            <div className="mt-12 pt-8 border-t border-white/5">
              <Link to="/contact" className="w-full block bg-orange-600 hover:bg-orange-700 text-white text-center py-4 font-black uppercase tracking-widest text-sm transition-all -skew-x-12">
                <span className="skew-x-12 inline-block">Partner with us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudy;
