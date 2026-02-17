import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); // Simple password field
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            // Check credentials against the custom admins table
            const { data, error } = await supabase
                .from('admins')
                .select('*')
                .eq('email', email)
                .eq('password', password) // In a real app, use hashing!
                .single();

            if (error || !data) {
                throw new Error('Invalid credentials');
            }

            // Successful login (mock session for now)
            localStorage.setItem('admin_session', JSON.stringify(data));
            navigate('/admin-zd');
        } catch (err: any) {
            setError(err.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-10">
                    <img
                        src="/images/Momemtum Gaming - Icon - Inverted.png"
                        alt="Momentum Gaming"
                        className="h-12 w-auto mx-auto mb-6 opacity-80"
                    />
                    <h1 className="text-3xl font-black italic text-white uppercase tracking-tighter mb-2">
                        Admin <span className="text-orange-500">Access</span>
                    </h1>
                    <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">
                        Authorized Personnel Only
                    </p>
                </div>

                <div className="bg-zinc-950 border border-white/10 p-8 rounded-lg shadow-2xl backdrop-blur-sm">
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded flex items-center gap-3 text-red-400">
                            <AlertCircle size={20} />
                            <span className="text-sm font-bold">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-zinc-900 border border-white/10 text-white pl-10 pr-4 py-3 rounded focus:outline-none focus:border-orange-500 transition-colors placeholder:text-zinc-700 font-medium"
                                    placeholder="admin@momentumgaming.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-zinc-900 border border-white/10 text-white pl-10 pr-4 py-3 rounded focus:outline-none focus:border-orange-500 transition-colors placeholder:text-zinc-700 font-medium"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-white text-black py-4 font-black uppercase tracking-widest text-sm hover:bg-orange-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {loading ? (
                                'Authenticating...'
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    Login Dashboard <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
