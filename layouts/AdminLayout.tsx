import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Folder, Trophy, Settings, LogOut } from 'lucide-react';

const AdminLayout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const session = localStorage.getItem('admin_session');
            if (!session) {
                navigate('/admin-zd/login');
            } else {
                setIsAuthenticated(true);
            }
            setIsLoading(false);
        };
        checkAuth();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('admin_session');
        navigate('/admin-zd/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/admin-zd', icon: LayoutDashboard },
        { name: 'Projects', path: '/admin-zd/projects', icon: Folder },
        { name: 'Tournaments', path: '/admin-zd/tournaments', icon: Trophy },
        { name: 'Settings', path: '/admin-zd/settings', icon: Settings },
    ];

    if (isLoading) {
        return <div className="min-h-screen bg-black flex items-center justify-center text-white font-black italic uppercase tracking-widest animate-pulse">Loading Admin Panel...</div>;
    }

    if (!isAuthenticated) {
        return null; // Will redirect in useEffect
    }

    return (
        <div className="flex h-screen bg-black text-white font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 flex flex-col fixed h-full z-10 bg-black">
                <div className="p-6 border-b border-white/10">
                    <Link to="/" className="flex items-center gap-2 group">
                        <img
                            src="/images/Momemtum Gaming - Icon - Inverted.png"
                            alt="Momentum Gaming Logo"
                            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
                        />
                        <span className="text-lg font-black italic tracking-tighter text-white">
                            ADMIN<span className="text-orange-500">PANEL</span>
                        </span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors border border-transparent ${isActive
                                    ? 'bg-orange-600 text-white'
                                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon size={20} />
                                <span className="font-bold uppercase text-xs tracking-widest">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10 mt-auto">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all group"
                    >
                        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold uppercase text-xs tracking-widest">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 overflow-auto bg-zinc-950 min-h-screen">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
