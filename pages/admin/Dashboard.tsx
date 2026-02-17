import React, { useEffect, useState } from 'react';
import { Package, Trophy, Users, TrendingUp, Mail } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const StatCard = ({ title, value, icon: Icon, color }: { title: string, value: string, icon: any, color: string }) => (
    <div className="bg-black border border-white/10 p-6 rounded-lg relative overflow-hidden group">
        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500 ${color}`}>
            <Icon size={64} />
        </div>
        <div className="relative z-10">
            <h3 className="text-zinc-500 text-xs font-black uppercase tracking-widest mb-2">{title}</h3>
            <p className="text-3xl font-black italic text-white tracking-tighter">{value}</p>
        </div>
    </div>
);

const Dashboard: React.FC = () => {
    const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'error'>('checking');
    const [projectCount, setProjectCount] = useState<number | null>(null);

    useEffect(() => {
        const checkConnection = async () => {
            try {
                // Check connection
                const { error } = await supabase.from('admins').select('*').limit(1);
                if (error && error.code !== 'PGRST116') {
                    setDbStatus('error');
                } else {
                    setDbStatus('connected');
                }

                // Fetch Project Count
                const { count, error: countError } = await supabase
                    .from('projects')
                    .select('*', { count: 'exact', head: true });

                if (!countError) {
                    setProjectCount(count);
                }
            } catch (e) {
                console.error("Error:", e);
                setDbStatus('error');
            }
        };
        checkConnection();
    }, []);

    return (
        <div>
            <header className="mb-10">
                <h1 className="text-4xl font-black italic text-white uppercase tracking-tighter">Dashboard</h1>
                <p className="text-zinc-400 mt-2">Welcome back, Admin. Here's what's happening today.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard
                    title="Total Projects"
                    value={projectCount !== null ? projectCount.toString() : '-'}
                    icon={Package}
                    color="text-blue-500"
                />
                <StatCard title="Active Tournaments" value="3" icon={Trophy} color="text-orange-500" />
                <StatCard title="Total Registered" value="1,240" icon={Users} color="text-green-500" />
                <StatCard title="Monthly Views" value="45.2K" icon={TrendingUp} color="text-purple-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-black border border-white/10 rounded-lg p-6">
                    <h2 className="text-xl font-black italic text-white uppercase tracking-tighter mb-6">Recent Activity</h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
                                <div className="w-2 h-2 rounded-full bg-orange-500" />
                                <div>
                                    <p className="text-sm text-white font-bold">New tournament "Summer Clash" created</p>
                                    <p className="text-xs text-zinc-500">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-black border border-white/10 rounded-lg p-6">
                    <h2 className="text-xl font-black italic text-white uppercase tracking-tighter mb-6">System Status</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center bg-zinc-900/50 p-4 rounded border border-white/5">
                            <span className="text-sm font-bold text-zinc-400">Database</span>
                            <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-widest rounded ${dbStatus === 'connected' ? 'bg-green-500/20 text-green-500' :
                                dbStatus === 'error' ? 'bg-red-500/20 text-red-500' : 'bg-yellow-500/20 text-yellow-500'
                                }`}>
                                {dbStatus === 'connected' ? 'Operational' : dbStatus === 'error' ? 'Error' : 'Checking...'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center bg-zinc-900/50 p-4 rounded border border-white/5">
                            <span className="text-sm font-bold text-zinc-400">API Gateway</span>
                            <span className="px-2 py-1 bg-green-500/20 text-green-500 text-[10px] font-black uppercase tracking-widest rounded">Operational</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
