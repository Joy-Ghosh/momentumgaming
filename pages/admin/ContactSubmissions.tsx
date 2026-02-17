import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { Mail, Check, Trash2, Search, Inbox, AlertCircle, RotateCcw, X } from 'lucide-react';

interface Submission {
    id: string;
    created_at: string;
    name: string;
    email: string;
    company?: string;
    inquiry_type?: string;
    subject: string;
    message: string;
    status: 'new' | 'read' | 'replied';
}

const ContactSubmissions: React.FC = () => {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<'all' | 'new' | 'read' | 'replied'>('all');
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

    // Undo Delete State
    const [deletedItemSession, setDeletedItemSession] = useState<{ item: Submission, timerId: NodeJS.Timeout } | null>(null);
    const [recentDeleteSuccess, setRecentDeleteSuccess] = useState(false);

    useEffect(() => {
        fetchSubmissions();
        // Cleanup timer on unmount
        return () => {
            if (deletedItemSession?.timerId) {
                clearTimeout(deletedItemSession.timerId);
            }
        };
    }, []);

    const fetchSubmissions = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('contact_submissions')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching submissions:', error);
        } else {
            setSubmissions(data || []);
        }
        setLoading(false);
    };

    const handleMarkAs = async (id: string, status: 'new' | 'read' | 'replied') => {
        console.log(`Marking ${id} as ${status}`);
        const { error } = await supabase
            .from('contact_submissions')
            .update({ status })
            .eq('id', id);

        if (!error) {
            setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status } : s));
            if (selectedSubmission?.id === id) {
                setSelectedSubmission(prev => prev ? { ...prev, status } : null);
            }
        } else {
            console.error('Error updating status:', error);
            alert('Failed to update status. Please try again.');
        }
    };

    const handleDelete = (id: string) => {
        // Find item to delete
        const itemToDelete = submissions.find(s => s.id === id);
        if (!itemToDelete) return;

        // If there's already a pending delete, force it to complete immediately
        if (deletedItemSession) {
            clearTimeout(deletedItemSession.timerId);
            finalizeDelete(deletedItemSession.item.id);
        }

        // Optimistically remove from UI
        setSubmissions(prev => prev.filter(s => s.id !== id));
        if (selectedSubmission?.id === id) {
            setSelectedSubmission(null);
        }

        // Set 5s timer for permanent delete
        const timerId = setTimeout(() => {
            finalizeDelete(id);
        }, 5000);

        setDeletedItemSession({ item: itemToDelete, timerId });
        setRecentDeleteSuccess(false);
    };

    const finalizeDelete = async (id: string) => {
        setDeletedItemSession(null); // Clear undo UI

        try {
            const { error } = await supabase
                .from('contact_submissions')
                .delete()
                .eq('id', id);

            if (error) {
                console.error("Delete failed on server:", error);
                // Optionally restore logic here if needed, but for now we assume success or silent fail
                alert('Failed to delete message from server.');
                fetchSubmissions(); // Re-sync
            } else {
                setRecentDeleteSuccess(true);
                setTimeout(() => setRecentDeleteSuccess(false), 3000); // Hide success message after 3s
            }
        } catch (err) {
            console.error("Error finalizing delete:", err);
            fetchSubmissions();
        }
    };

    const handleUndo = () => {
        if (!deletedItemSession) return;

        // Clear the timer
        clearTimeout(deletedItemSession.timerId);

        // Restore item to UI
        const restoredItem = deletedItemSession.item;
        setSubmissions(prev => {
            const newSubmissions = [restoredItem, ...prev];
            return newSubmissions.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        });

        // Restore selection if it was the one selected (optional, but nice)
        // setSelectedSubmission(restoredItem); 

        // Clear session
        setDeletedItemSession(null);
    };

    const filteredSubmissions = submissions.filter(s => {
        const matchesSearch =
            (s.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (s.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (s.subject?.toLowerCase() || '').includes(searchTerm.toLowerCase());

        const matchesFilter = filter === 'all' || s.status === filter;

        return matchesSearch && matchesFilter;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'text-blue-500 bg-blue-500/10';
            case 'replied': return 'text-green-500 bg-green-500/10';
            default: return 'text-zinc-500 bg-zinc-500/10';
        }
    };

    return (
        <div className="flex h-[calc(100vh-100px)] gap-6 relative">
            {/* Delete Notification / Undo Toast */}
            {(deletedItemSession || recentDeleteSuccess) && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2">
                    {deletedItemSession && (
                        <div className="bg-zinc-800 border border-white/10 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4">
                            <Trash2 size={18} className="text-red-500" />
                            <span className="text-sm">Message deleted</span>
                            <div className="h-4 w-[1px] bg-white/10"></div>
                            <button
                                onClick={handleUndo}
                                className="text-sm font-bold text-orange-500 hover:text-orange-400 flex items-center gap-2"
                            >
                                <RotateCcw size={16} /> Undo
                            </button>
                            <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden ml-2">
                                <div className="h-full bg-orange-500 animate-[progress_5s_linear_forwards] origin-left" />
                            </div>
                        </div>
                    )}
                    {recentDeleteSuccess && (
                        <div className="bg-green-500/10 border border-green-500/20 text-green-500 px-6 py-3 rounded-lg shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
                            <Check size={18} />
                            <span className="text-sm font-bold">Permanently deleted</span>
                        </div>
                    )}
                </div>
            )}

            {/* List View */}
            <div className={`${selectedSubmission ? 'hidden lg:flex' : 'flex'} flex-col w-full lg:w-1/3 bg-zinc-900 border border-white/10 rounded-lg overflow-hidden`}>
                <div className="p-4 border-b border-white/10 space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-black italic text-white uppercase tracking-tighter">Inbox</h2>
                        <span className="text-xs text-zinc-500 font-bold">{submissions.filter(s => s.status === 'new').length} New</span>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-black border border-white/10 text-white pl-10 pr-4 py-2 rounded text-sm focus:outline-none focus:border-orange-500 transition-colors"
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-1">
                        {['all', 'new', 'read', 'replied'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f as any)}
                                className={`px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-colors ${filter === f
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="p-8 text-center text-zinc-500 animate-pulse text-xs uppercase tracking-widest">Loading...</div>
                    ) : filteredSubmissions.length === 0 ? (
                        <div className="p-8 text-center text-zinc-500 text-sm">No messages found.</div>
                    ) : (
                        <div className="divide-y divide-white/5">
                            {filteredSubmissions.map((submission) => (
                                <div
                                    key={submission.id}
                                    onClick={() => {
                                        setSelectedSubmission(submission);
                                        if (submission.status === 'new') handleMarkAs(submission.id, 'read');
                                    }}
                                    className={`p-4 cursor-pointer transition-colors hover:bg-white/5 ${selectedSubmission?.id === submission.id ? 'bg-white/5 border-l-2 border-orange-500' :
                                        submission.status === 'new' ? 'bg-blue-500/5' : ''
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className={`font-bold text-sm truncate pr-2 ${submission.status === 'new' ? 'text-white' : 'text-zinc-400'}`}>
                                            {submission.name}
                                        </h3>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] text-zinc-500 whitespace-nowrap">
                                                {new Date(submission.created_at).toLocaleDateString()}
                                            </span>
                                            {submission.status === 'replied' && (
                                                <span className="text-[10px] text-green-500 font-bold flex items-center gap-1">
                                                    <Check size={10} /> Replied
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-xs text-zinc-300 truncate mb-1">{submission.subject || 'No Subject'}</p>
                                    <p className="text-xs text-zinc-500 truncate">{submission.message}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Detail View */}
            <div className={`${selectedSubmission ? 'flex' : 'hidden lg:flex'} flex-col w-full lg:w-2/3 bg-zinc-900 border border-white/10 rounded-lg overflow-hidden`}>
                {selectedSubmission ? (
                    <>
                        <div className="p-6 border-b border-white/10 flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-black italic text-white uppercase tracking-tighter mb-2">
                                    {selectedSubmission.subject || 'No Subject'}
                                </h1>
                                <div className="flex items-center gap-2 text-sm text-zinc-400">
                                    <span className="font-bold text-white">{selectedSubmission.name}</span>
                                    <span>&lt;{selectedSubmission.email}&gt;</span>
                                </div>
                                <div className="text-xs text-zinc-500 mt-1">
                                    {new Date(selectedSubmission.created_at).toLocaleString()}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleMarkAs(selectedSubmission.id, selectedSubmission.status === 'replied' ? 'read' : 'replied')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded transition-colors text-xs font-bold uppercase tracking-wide border ${selectedSubmission.status === 'replied'
                                            ? 'bg-green-500/10 text-green-500 border-green-500/50 hover:bg-green-500/20'
                                            : 'bg-white/5 text-zinc-400 border-white/10 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    <Check size={16} />
                                    {selectedSubmission.status === 'replied' ? "Replied" : "Mark as Replied"}
                                </button>
                                <button
                                    onClick={() => handleDelete(selectedSubmission.id)}
                                    className="p-2 bg-white/5 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors border border-white/10"
                                    title="Delete"
                                >
                                    <Trash2 size={20} />
                                </button>
                                <button
                                    className="lg:hidden p-2 text-zinc-400"
                                    onClick={() => setSelectedSubmission(null)}
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 p-8 overflow-y-auto">
                            <div className="flex gap-4 mb-6">
                                <div className="bg-zinc-800/50 p-4 rounded-lg flex-1 border border-white/5">
                                    <span className="text-[10px] uppercase font-black tracking-widest text-zinc-500 block mb-1">Company</span>
                                    <span className="text-white font-bold">{selectedSubmission.company || 'N/A'}</span>
                                </div>
                                <div className="bg-zinc-800/50 p-4 rounded-lg flex-1 border border-white/5">
                                    <span className="text-[10px] uppercase font-black tracking-widest text-zinc-500 block mb-1">Inquiry Type</span>
                                    <span className="text-white font-bold capitalize">{selectedSubmission.inquiry_type?.replace('-', ' ') || 'N/A'}</span>
                                </div>
                            </div>

                            <div className="bg-black border border-white/5 p-6 rounded-lg whitespace-pre-wrap text-zinc-300 leading-relaxed font-mono text-sm">
                                {selectedSubmission.message}
                            </div>
                        </div>
                        <div className="p-4 border-t border-white/10 bg-black/20 flex justify-end gap-4">
                            <a
                                href={`mailto:${selectedSubmission.email}?subject=Re: ${selectedSubmission.subject}`}
                                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded font-black uppercase tracking-widest text-xs flex items-center gap-2 transition-colors"
                            >
                                <Mail size={16} /> Reply via Email
                            </a>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-zinc-500">
                        <Inbox size={48} className="mb-4 opacity-20" />
                        <p className="uppercase tracking-widest text-sm font-bold">Select a message to read</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactSubmissions;
