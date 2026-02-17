import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { ArrowLeft, Plus, X, Save, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const isEditing = !!id;
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [title, setTitle] = useState('');
    const [sponsor, setSponsor] = useState('');
    const [bannerUrl, setBannerUrl] = useState('');
    const [summary, setSummary] = useState('');
    const [services, setServices] = useState<string[]>([]);
    const [results, setResults] = useState<string[]>([]);

    const [newService, setNewService] = useState('');
    const [newResult, setNewResult] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (isEditing) {
            fetchProject();
        }
    }, [id]);

    const fetchProject = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching project:', error);
            navigate('/admin-zd/projects');
        } else if (data) {
            setTitle(data.title);
            setSponsor(data.sponsor || '');
            setBannerUrl(data.banner_url || '');
            setSummary(data.summary || '');
            setServices(data.services || []);
            setResults(data.results || []);
        }
        setLoading(false);
    };

    const handleAddService = () => {
        if (newService.trim()) {
            setServices([...services, newService.trim()]);
            setNewService('');
        }
    };

    const handleRemoveService = (index: number) => {
        setServices(services.filter((_, i) => i !== index));
    };

    const handleAddResult = () => {
        if (newResult.trim()) {
            setResults([...results, newResult.trim()]);
            setNewResult('');
        }
    };

    const handleRemoveResult = (index: number) => {
        setResults(results.filter((_, i) => i !== index));
    };

    // File Upload Logic
    const uploadImage = async (file: File) => {
        try {
            setUploading(true);
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('project-images')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage
                .from('project-images')
                .getPublicUrl(filePath);

            setBannerUrl(data.publicUrl);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading image!');
        } finally {
            setUploading(false);
        }
    };

    const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            uploadImage(e.target.files[0]);
        }
    };

    const onDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            uploadImage(e.dataTransfer.files[0]);
        }
    }, []);

    const removeImage = () => {
        setBannerUrl('');
        // Optional: Delete from storage if needed, but keeping it simple for now
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const projectData = {
            title,
            sponsor,
            banner_url: bannerUrl,
            summary,
            services,
            results,
        };

        let error;
        if (isEditing) {
            const { error: updateError } = await supabase
                .from('projects')
                .update(projectData)
                .eq('id', id);
            error = updateError;
        } else {
            const { error: insertError } = await supabase
                .from('projects')
                .insert([projectData]);
            error = insertError;
        }

        if (error) {
            console.error('Error saving project:', error);
            alert('Failed to save project');
        } else {
            navigate('/admin-zd/projects');
        }
        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link to="/admin-zd/projects" className="text-zinc-400 hover:text-white transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-3xl font-black italic text-white uppercase tracking-tighter">
                        {isEditing ? 'Edit' : 'Add New'} <span className="text-orange-500">Project</span>
                    </h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-zinc-900 border border-white/10 rounded-lg p-8 shadow-xl">
                <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">
                                Project Title *
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-black border border-white/10 text-white px-4 py-3 rounded focus:outline-none focus:border-orange-500 transition-colors placeholder:text-zinc-700"
                                placeholder="e.g. Red Bull Campus Clutch"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">
                                Title Sponsor
                            </label>
                            <input
                                type="text"
                                value={sponsor}
                                onChange={(e) => setSponsor(e.target.value)}
                                className="w-full bg-black border border-white/10 text-white px-4 py-3 rounded focus:outline-none focus:border-orange-500 transition-colors placeholder:text-zinc-700"
                                placeholder="e.g. Red Bull"
                            />
                        </div>
                    </div>

                    {/* Banner Image Upload */}
                    <div>
                        <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">
                            Banner Image
                        </label>

                        {!bannerUrl ? (
                            <div
                                onDragOver={onDragOver}
                                onDragLeave={onDragLeave}
                                onDrop={onDrop}
                                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragging
                                        ? 'border-orange-500 bg-orange-500/10'
                                        : 'border-white/10 bg-black hover:border-white/20'
                                    }`}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={onFileSelect}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    disabled={uploading}
                                />
                                <div className="flex flex-col items-center gap-2">
                                    {uploading ? (
                                        <>
                                            <Loader2 className="animate-spin text-orange-500" size={32} />
                                            <p className="text-zinc-400 text-sm">Uploading...</p>
                                        </>
                                    ) : (
                                        <>
                                            <div className="p-4 bg-zinc-800 rounded-full mb-2">
                                                <ImageIcon className="text-zinc-400" size={24} />
                                            </div>
                                            <p className="text-zinc-300 font-bold">Click to upload or drag and drop</p>
                                            <p className="text-zinc-500 text-xs">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="relative group rounded-lg overflow-hidden border border-white/10 bg-black">
                                <img
                                    src={bannerUrl}
                                    alt="Banner Preview"
                                    className="w-full h-64 object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                    <button
                                        type="button"
                                        onClick={() => window.open(bannerUrl, '_blank')}
                                        className="p-2 bg-white/10 text-white rounded hover:bg-white/20 transition-colors"
                                    >
                                        <ImageIcon size={20} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="p-2 bg-red-500/20 text-red-500 rounded hover:bg-red-500/30 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Summary */}
                    <div>
                        <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">
                            Project Summary
                        </label>
                        <textarea
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            className="w-full bg-black border border-white/10 text-white px-4 py-3 rounded focus:outline-none focus:border-orange-500 transition-colors placeholder:text-zinc-700 h-32 resize-none"
                            placeholder="Brief description of the project..."
                        />
                    </div>

                    {/* Dynamic Lists: Services & Results */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-white/10">
                        {/* Services */}
                        <div>
                            <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">
                                Services Delivered
                            </label>
                            <div className="flex gap-2 mb-4">
                                <input
                                    type="text"
                                    value={newService}
                                    onChange={(e) => setNewService(e.target.value)}
                                    className="flex-1 bg-black border border-white/10 text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-orange-500"
                                    placeholder="Add service..."
                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddService())}
                                />
                                <button
                                    type="button"
                                    onClick={handleAddService}
                                    className="bg-white/10 hover:bg-white/20 text-white p-2 rounded transition-colors"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                            <ul className="space-y-2">
                                {services.map((service, index) => (
                                    <li key={index} className="flex justify-between items-center bg-black/50 px-3 py-2 rounded border border-white/5 group">
                                        <span className="text-zinc-300 text-sm">{service}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveService(index)}
                                            className="text-zinc-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <X size={16} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Results */}
                        <div>
                            <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">
                                Impact & Results
                            </label>
                            <div className="flex gap-2 mb-4">
                                <input
                                    type="text"
                                    value={newResult}
                                    onChange={(e) => setNewResult(e.target.value)}
                                    className="flex-1 bg-black border border-white/10 text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-orange-500"
                                    placeholder="Add result..."
                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddResult())}
                                />
                                <button
                                    type="button"
                                    onClick={handleAddResult}
                                    className="bg-white/10 hover:bg-white/20 text-white p-2 rounded transition-colors"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                            <ul className="space-y-2">
                                {results.map((result, index) => (
                                    <li key={index} className="flex justify-between items-center bg-black/50 px-3 py-2 rounded border border-white/5 group">
                                        <span className="text-zinc-300 text-sm">{result}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveResult(index)}
                                            className="text-zinc-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                        >
                                            <X size={16} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/10 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded font-black uppercase tracking-widest text-sm flex items-center gap-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100"
                        >
                            {loading ? (
                                'Saving...'
                            ) : (
                                <>
                                    <Save size={18} /> Save Project
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProjectForm;
