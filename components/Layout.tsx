import React, { useState, useMemo, useEffect } from 'react';
import { TabType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  bgImage: string;
  surfaceType: 'glass' | 'solid';
  isRainActive: boolean;
  showWipWarning: boolean;
  onCloseWip: () => void;
  currentUrl: string;
  onUrlChange: (url: string) => void;
  isGuardianDetected: boolean;
  onClearGuardianAlert: () => void;
  executePanic: () => void;
}

const generateRainSeeds = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 20,
    duration: 0.8 + Math.random() * 1.5,
    size: 1 + Math.random() * 2,
    height: 15 + Math.random() * 35,
    opacity: 0.1 + Math.random() * 0.4
  }));
};

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeTab, 
  setActiveTab, 
  bgImage, 
  surfaceType, 
  isRainActive, 
  showWipWarning, 
  onCloseWip,
  currentUrl,
  onUrlChange,
  isGuardianDetected,
  onClearGuardianAlert,
  executePanic
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isUrlBarOpen, setIsUrlBarOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [bottomUrl, setBottomUrl] = useState(currentUrl);
  const rainSeeds = useMemo(() => generateRainSeeds(150), []);

  useEffect(() => {
    setBottomUrl(currentUrl);
  }, [currentUrl]);

  const handleInspect = () => {
    if ((window as any).eruda) {
      (window as any).eruda.show();
      return;
    }
    const script = document.createElement('script');
    script.src = "//cdn.jsdelivr.net/npm/eruda";
    document.body.appendChild(script);
    script.onload = () => {
      (window as any).eruda.init();
      (window as any).eruda.show();
    };
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bottomUrl) return;
    
    let processedUrl = bottomUrl;
    if (!bottomUrl.startsWith('http')) {
      if (bottomUrl.includes('.') && !bottomUrl.includes(' ')) {
        processedUrl = 'https://' + bottomUrl;
      } else {
        processedUrl = 'https://www.google.com/search?q=' + encodeURIComponent(bottomUrl);
      }
    }
    onUrlChange(processedUrl);
    setIsUrlBarOpen(false);
  };

  const handleCloseWip = () => {
    setIsExiting(true);
  };

  const bgStyle: React.CSSProperties = bgImage !== 'none' ? {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed'
  } : {};

  return (
    <div className={`min-h-screen flex bg-black text-white relative overflow-hidden theme-container ${bgImage === 'none' ? 'animated-bg' : ''}`} style={bgStyle}>
      
      {/* Guardian Alert Banner */}
      {isGuardianDetected && (
        <div className="fixed inset-0 z-[1000] pointer-events-none animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-red-600/20 animate-pulse pointer-events-none"></div>
          <div className="absolute top-0 left-0 right-0 bg-red-600 p-4 shadow-[0_10px_50px_rgba(220,38,38,0.8)] border-b border-red-400 flex flex-col items-center justify-center gap-2 pointer-events-auto">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center animate-bounce">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                </div>
                <h2 className="text-xl md:text-3xl font-black italic uppercase tracking-tighter text-white drop-shadow-lg">
                  GO_GUARDIAN MONITORING DETECTED
                </h2>
                <div className="flex gap-2">
                   <button 
                    onClick={executePanic}
                    className="bg-white text-red-600 px-6 py-2 rounded-full font-black uppercase text-xs hover:scale-105 active:scale-95 transition-all shadow-xl"
                   >
                     EXECUTE PANIC
                   </button>
                   <button 
                    onClick={onClearGuardianAlert}
                    className="bg-black/20 text-white px-6 py-2 rounded-full font-black uppercase text-xs hover:bg-black/40 active:scale-95 transition-all"
                   >
                     DISMISS
                   </button>
                </div>
             </div>
             <p className="text-[10px] text-white/80 font-black tracking-[0.3em] uppercase animate-pulse">
               Environmental anomalies detected. Classroom monitoring software may be active on this machine.
             </p>
          </div>
        </div>
      )}

      {/* Background Layers */}
      {bgImage === 'none' && (
        <>
          <div className="grid-overlay pointer-events-none fixed inset-0 -z-30"></div>
          <div className="particle-container pointer-events-none fixed inset-0 -z-20 overflow-hidden">
            <div className="particles"></div>
          </div>
        </>
      )}

      {/* Atmospheric Effect */}
      {isRainActive && (
        <div className="rain-viewport pointer-events-none fixed inset-0 -z-1 overflow-hidden">
          {rainSeeds.map((seed) => (
            <div 
              key={seed.id}
              className="raindrop"
              style={{
                left: `${seed.left}%`,
                width: `${seed.size}px`,
                height: `${seed.height}px`,
                animationDelay: `-${seed.delay}s`,
                animationDuration: `${seed.duration}s`,
                opacity: seed.opacity,
                backgroundColor: 'rgba(255, 255, 255, 0.6)'
              }}
            />
          ))}
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className={`relative h-screen flex flex-col items-center py-10 border-r border-accent/10 glass z-50 transition-all duration-500 ease-in-out ${isSidebarOpen ? 'w-16' : 'w-4'}`}>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-4 h-10 bg-black border border-accent/20 rounded-full flex items-center justify-center hover:bg-accent/20 transition-all z-[60] shadow-glow"
        >
          <svg 
            width="8" height="8" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={`text-accent transition-transform duration-500 ${isSidebarOpen ? 'rotate-180' : ''}`}
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        <div className={`flex flex-col items-center gap-6 transition-all duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <button 
            onClick={() => window.history.back()} 
            title="Back"
            className="w-7 h-7 flex items-center justify-center active:scale-90 transition-all text-gray-600 hover:text-accent group"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(var(--accent-rgb),1)]"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <button 
            onClick={() => window.history.forward()} 
            title="Forward"
            className="w-7 h-7 flex items-center justify-center active:scale-90 transition-all text-gray-600 hover:text-accent group"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(var(--accent-rgb),1)]"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <button 
            onClick={() => window.location.reload()} 
            title="Reload"
            className="w-7 h-7 flex items-center justify-center active:scale-90 transition-all text-gray-600 hover:text-accent group"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(var(--accent-rgb),1)]"><path d="M21 2v6h-6M3 12a9 9 0 0 1 15-6.7L21 8M3 22v-6h6M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>
          </button>
          
          <div className="h-[1px] w-4 bg-accent/20"></div>

          <button 
            onClick={handleInspect} 
            title="Inspect Element (DevTools)"
            className="w-7 h-7 flex items-center justify-center active:scale-90 transition-all text-gray-600 hover:text-accent group"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(var(--accent-rgb),1)]">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
              <line x1="10" y1="22" x2="14" y2="2"></line>
            </svg>
          </button>

          <button 
            onClick={() => setActiveTab(TabType.PROXY)} 
            title="Home"
            className="w-7 h-7 flex items-center justify-center active:scale-90 transition-all text-gray-600 hover:text-accent group"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(var(--accent-rgb),1)]"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative h-screen overflow-y-auto overflow-x-hidden z-10">
        {showWipWarning && (
          <div 
            onAnimationEnd={() => isExiting && onCloseWip()}
            className={`bg-amber-600/10 border-b border-amber-600/30 py-2 text-center text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 relative z-[100] backdrop-blur-xl ${isExiting ? 'animate-exit' : 'animate-in fade-in slide-in-from-top duration-500'}`}
          >
            <span className="text-amber-500">(WARNING) WORK IN PROGRESS. BUGS AND GLITCHES MAY BE PROMINENT</span>
            <button 
              onClick={handleCloseWip} 
              className="hover:text-white text-amber-500/60 font-bold transition-all p-1 active:scale-75"
            >
              ✕
            </button>
          </div>
        )}

        {/* Background Glows */}
        <div className={`fixed top-[-5%] left-[10%] w-[30%] h-[30%] bg-accent/10 blur-[150px] rounded-full -z-10 ${bgImage !== 'none' ? 'opacity-30' : ''}`} />
        <div className={`fixed bottom-[-5%] right-[10%] w-[30%] h-[30%] bg-accent/10 blur-[150px] rounded-full -z-10 ${bgImage !== 'none' ? 'opacity-30' : ''}`} />

        {/* Header */}
        <nav className="sticky top-0 z-50 px-6 py-6 flex items-center justify-center">
          <div className="glass px-6 py-2 rounded-full border border-accent/20 flex items-center gap-8 shadow-2xl relative">
            <h1 className="text-lg font-black tracking-tighter text-glow-strong text-accent px-2 uppercase italic">
              PERPLEXITY
            </h1>

            <div className="flex items-center gap-2">
              {[
                { id: TabType.PROXY, label: 'Proxy' },
                { id: TabType.GAMES, label: 'Games', hazard: true },
                { id: TabType.AI, label: 'AI' },
                { id: TabType.SETTINGS, label: 'Settings' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`px-5 py-2 rounded-full transition-all duration-300 text-[11px] font-black uppercase tracking-widest flex items-center gap-2 active:scale-95 group ${
                    activeTab === tab.id
                      ? 'bg-accent text-white shadow-glow'
                      : 'text-gray-500 hover:text-accent hover:bg-accent/10 hover:shadow-[0_0_25px_rgba(var(--accent-rgb),0.6)]'
                  }`}
                >
                  {tab.label}
                  {tab.hazard && <span className="text-amber-500 animate-pulse text-xs">⚠️</span>}
                </button>
              ))}
            </div>

            {/* Neural Stealth Badge */}
            <div className="hidden md:flex items-center gap-2 ml-4 border-l border-accent/20 pl-4">
               <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse"></div>
               <span className="text-[9px] font-black uppercase text-emerald-500 tracking-widest">Neural Stealth Enabled</span>
            </div>
          </div>
        </nav>

        {/* Content */}
        <main className="flex-1 container mx-auto p-4 md:p-8 flex flex-col relative z-20 mb-20">
          {children}
        </main>

        {/* Footer */}
        <footer className="py-8 text-center flex flex-col gap-2 items-center relative z-20">
          <div className="w-12 h-[1px] bg-accent/20 mb-4 opacity-50"></div>
          <p className="text-gray-600 text-[9px] uppercase tracking-[0.3em] font-black">
            MADE WITH LOVE BY <span className="text-accent/60">Ayden</span>
          </p>
        </footer>

        {/* Bottom Drawer URL Bar */}
        <div className={`fixed bottom-0 left-16 right-0 flex flex-col items-center z-[100] transition-transform duration-500 ease-in-out ${isUrlBarOpen ? 'translate-y-0' : 'translate-y-[calc(100%-24px)]'}`}>
          <button 
            onClick={() => setIsUrlBarOpen(!isUrlBarOpen)}
            className="pointer-events-auto bg-accent/30 border-x border-t border-accent/50 w-36 h-6 flex items-center justify-center rounded-t-[1.2rem] hover:bg-accent/50 transition-all backdrop-blur-2xl group shadow-glow"
          >
            <div className="flex flex-col items-center">
              <svg 
                width="16" height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={`text-accent transition-transform duration-500 ${isUrlBarOpen ? 'rotate-180' : ''}`}
              >
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </div>
          </button>
          
          <div className="w-full max-w-5xl px-4 pointer-events-auto">
            <div className="glass rounded-t-[2rem] border-x border-t border-accent/30 p-5 shadow-[0_-30px_100px_rgba(0,0,0,0.9)]">
              <form onSubmit={handleUrlSubmit} className="relative flex items-center bg-black/90 rounded-full border border-accent/40 p-1.5 focus-within:border-accent transition-all">
                <div className="pl-5 text-accent/50">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </div>
                <input 
                  type="text" 
                  value={bottomUrl}
                  onChange={(e) => setBottomUrl(e.target.value)}
                  placeholder="NAVIGATE_TO_TARGET..."
                  className="w-full bg-transparent border-none outline-none py-3 px-4 text-xs text-white placeholder-gray-800 font-black uppercase tracking-widest"
                />
                <button 
                  type="submit"
                  className="bg-accent h-10 w-10 rounded-full flex items-center justify-center text-white shadow-glow hover:opacity-80 active:scale-90 transition-all"
                >
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        :root {
          --accent-rgb: 168, 85, 247;
          --glow-strength: 0.7;
          --surface-opacity: 0.7;
          --blur-strength: 15px;
        }

        .raindrop {
          position: absolute;
          top: -100px;
          border-radius: 2px;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 100%);
          animation: rain-fall linear infinite;
        }

        @keyframes rain-fall {
          from { transform: translateY(-100px) skewX(-15deg); }
          to { transform: translateY(110vh) skewX(-15deg); }
        }

        .grid-overlay {
          background-image: 
            linear-gradient(rgba(var(--accent-rgb), 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(var(--accent-rgb), 0.12) 1px, transparent 1px);
          background-size: 50px 50px;
          background-position: center center;
          perspective: 1200px;
          transform: rotateX(65deg) translateY(-20%) scale(2.5);
          transform-origin: center top;
          animation: grid-pulse 6s ease-in-out infinite;
        }

        @keyframes grid-pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }

        .particles {
          width: 100%;
          height: 300%;
          position: absolute;
          top: -200%;
          left: 0;
          background-image: 
            radial-gradient(circle at 15% 25%, rgba(255, 255, 255, 0.4) 1.5px, transparent 1.5px),
            radial-gradient(circle at 35% 55%, rgba(255, 255, 255, 0.2) 2px, transparent 2px),
            radial-gradient(circle at 65% 85%, rgba(255, 255, 255, 0.3) 1.8px, transparent 1.8px),
            radial-gradient(circle at 85% 45%, rgba(255, 255, 255, 0.25) 1.5px, transparent 1.5px);
          background-size: 600px 600px;
          animation: particle-drift 80s linear infinite;
        }

        @keyframes particle-drift {
          from { transform: translateY(0); }
          to { transform: translateY(66.6%); }
        }

        @keyframes fadeOutUp {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-100%); }
        }
        .animate-exit {
          animation: fadeOutUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .text-accent { color: rgb(var(--accent-rgb)); }
        .bg-accent { background-color: rgb(var(--accent-rgb)); }
        .border-accent { border-color: rgb(var(--accent-rgb)); }
        .text-glow-strong {
          text-shadow: 0 0 calc(20px * var(--glow-strength)) rgba(var(--accent-rgb), 0.8);
        }
        .shadow-glow {
          box-shadow: 0 0 calc(25px * var(--glow-strength)) rgba(var(--accent-rgb), 0.4);
        }
        .glass {
          background: rgba(8, 8, 8, var(--surface-opacity));
          backdrop-filter: blur(var(--blur-strength));
        }
      `}</style>
    </div>
  );
};