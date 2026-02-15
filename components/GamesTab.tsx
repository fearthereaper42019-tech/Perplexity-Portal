
import React from 'react';
import { GAMES } from '../constants';

const GamesTab: React.FC = () => {
  const launchGame = () => {
    alert("SYSTEM ERROR: Game usage restricted. System under maintenance.");
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 max-w-6xl mx-auto w-full relative">
      {/* Restriction Message */}
      <div className="glass border border-amber-600/20 p-8 rounded-full text-center space-y-3 mb-12 shadow-[0_0_60px_rgba(217,119,6,0.05)]">
        <h2 className="text-2xl font-black text-amber-500 uppercase tracking-[0.2em]">ACCESS RESTRICTED</h2>
        <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.1em] leading-relaxed">
          The entertainment library is currently disabled. 
          <br />
          Usage of digital media is flagged as unauthorized during system recalibration.
        </p>
      </div>

      <header className="text-center space-y-2 opacity-40 grayscale">
        <h2 className="text-5xl font-black text-glow-strong text-accent tracking-tighter italic uppercase">GAMES</h2>
        <div className="h-0.5 w-16 bg-accent mx-auto opacity-30"></div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 opacity-30 grayscale select-none pointer-events-none">
        {GAMES.map((game) => (
          <div 
            key={game.id} 
            className="glass rounded-3xl overflow-hidden flex flex-col text-left shadow-xl border border-accent/10"
          >
            <div className="relative aspect-video overflow-hidden bg-accent/5">
              <img 
                src={game.thumbnail} 
                alt={game.name} 
                className="w-full h-full object-contain p-8"
              />
              <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500/50"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
            </div>
            <div className="p-4 border-t border-accent/10">
              <h3 className="text-lg font-bold text-white uppercase tracking-tighter">{game.name}</h3>
              <p className="text-gray-600 text-[10px] uppercase font-black tracking-widest mt-1">SECURE_LOCK</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute inset-0 z-10 cursor-not-allowed" onClick={launchGame}></div>
    </div>
  );
};

export default GamesTab;
