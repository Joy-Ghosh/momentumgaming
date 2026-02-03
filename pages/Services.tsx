
import React from 'react';
import { SERVICES } from '../data';
import { Shield, Tv, Users, Layers, ChevronRight, CheckCircle } from 'lucide-react';

const iconMap: Record<string, any> = {
  Shield, Tv, Users, Layers
};

const Services: React.FC = () => {
  return (
    <div className="bg-black min-h-screen">
      <div className="pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <header className="mb-20">
          <h1 className="text-6xl md:text-8xl font-black italic text-white uppercase tracking-tighter mb-6">
            Our <span className="text-orange-600">Services</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
            From professional tournament management to high-end broadcast production, we provide everything needed to build a successful esports ecosystem.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <div key={service.id} className="bg-zinc-950 border border-white/5 p-10 hover:border-orange-500/30 transition-all flex flex-col h-full group">
                <div className="flex items-center space-x-6 mb-10">
                  <div className="w-16 h-16 bg-white/5 flex items-center justify-center rounded-sm group-hover:bg-orange-600 transition-colors">
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter leading-none">{service.title}</h3>
                </div>
                
                <p className="text-lg text-orange-500 font-bold mb-8 italic">
                  "{service.benefit}"
                </p>

                <div className="space-y-6 flex-grow mb-10">
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start">
                      <CheckCircle size={20} className="text-zinc-600 mt-1 shrink-0" />
                      <span className="ml-4 text-zinc-300 font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest py-5 px-8 hover:bg-orange-600 hover:border-orange-600 transition-all flex items-center justify-center">
                  Request Info <ChevronRight size={20} className="ml-2" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Business Focus Section */}
      <section className="bg-zinc-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter mb-8">Ready to grow your brand?</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-12">
            We operate on a white-label or collaborative basis. Whether you need a full turnkey solution or support in a specific vertical, Momentum Gaming is your partner.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="p-6 bg-black border border-white/5">
              <span className="text-orange-500 font-black text-2xl mb-2 block">100%</span>
              <p className="text-zinc-500 text-xs uppercase tracking-widest">Brand Ownership</p>
            </div>
            <div className="p-6 bg-black border border-white/5">
              <span className="text-blue-500 font-black text-2xl mb-2 block">24/7</span>
              <p className="text-zinc-500 text-xs uppercase tracking-widest">Technical Support</p>
            </div>
            <div className="p-6 bg-black border border-white/5">
              <span className="text-white font-black text-2xl mb-2 block">Scalable</span>
              <p className="text-zinc-500 text-xs uppercase tracking-widest">Global Reach</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
