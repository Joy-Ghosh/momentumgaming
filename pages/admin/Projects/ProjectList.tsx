import React, { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Project {
    id: string;
    title: string;
    sponsor: string;
    banner_url: string;
    created_at: string;
}

const ProjectList: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching projects:', error);
        } else {
            setProjects(data || []);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;

        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) {
            alert('Error deleting project');
            console.error(error);
        } else {
            setProjects(projects.filter(p => p.id !== id));
        }
    };

    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.sponsor?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black italic text-white uppercase tracking-tighter">
                        Manage <span className="text-orange-500">Projects</span>
                    </h1>
                    <p className="text-zinc-400 text-sm mt-1">
                        View, create, and manage your portfolio projects.
                    </p>
                </div>
                <Link
                    to="/admin-zd/projects/new"
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded flex items-center gap-2 font-bold uppercase text-xs tracking-widest transition-colors"
                >
                    <Plus size={16} /> Add New Project
                </Link>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-lg overflow-hidden">
                <div className="p-4 border-b border-white/10">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-black border border-white/10 text-white pl-10 pr-4 py-2 rounded focus:outline-none focus:border-orange-500 transition-colors placeholder:text-zinc-600 text-sm"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-zinc-500 uppercase text-xs tracking-widest animate-pulse">
                        Loading Projects...
                    </div>
                ) : filteredProjects.length === 0 ? (
                    <div className="p-8 text-center text-zinc-500">
                        {searchTerm ? 'No projects found matching your search.' : 'No projects found. Create your first one!'}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-black/50 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                                <tr>
                                    <th className="p-4">Project</th>
                                    <th className="p-4">Sponsor</th>
                                    <th className="p-4">Created</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredProjects.map((project) => (
                                    <tr key={project.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-4">
                                                {project.banner_url ? (
                                                    <img
                                                        src={project.banner_url}
                                                        alt={project.title}
                                                        className="w-12 h-12 object-cover rounded bg-zinc-800"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 bg-zinc-800 rounded flex items-center justify-center text-xs text-zinc-600">
                                                        No Img
                                                    </div>
                                                )}
                                                <span className="font-bold text-white max-w-xs truncate">{project.title}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-zinc-400 text-sm">{project.sponsor || '-'}</td>
                                        <td className="p-4 text-zinc-500 text-xs">
                                            {new Date(project.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    to={`/admin-zd/projects/edit/${project.id}`}
                                                    className="p-2 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit size={16} />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(project.id)}
                                                    className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectList;
