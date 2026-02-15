import React, { useState, useRef, useEffect } from 'react';
import { QUICK_APPS } from '../constants';
import { AppInfo } from '../types';

interface ProxyTabProps {
  customApps: AppInfo[];
  onAddApp: (name: string, url: string, icon?: string) => void;
  activeUrl: string;
  onNavigate: (url: string) => void;
  proxyBackend: string;
  proxyBaseUrl: string;
}

const ProxyTab: React.FC<ProxyTabProps> = ({ customApps, onAddApp, activeUrl, onNavigate, proxyBackend, proxyBaseUrl }) => {
  const [url, setUrl] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newIcon, setNewIcon] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const encodeUrl = (str: string) => {
    if (!str) return str;
    // Standard Ultraviolet XOR implementation
    return encodeURIComponent(str.split('').map((char, i) => i % 2 ? String.fromCharCode(char.charCodeAt(0) ^ 2) : char).join(''));
  };

  const processUrl = (target: string) => {
    let processed = target;
    if (!target.startsWith('http')) {
      if (target.includes('.') && !target.includes(' ')) {
        processed = 'https://' + target;
      } else {
        processed = 'https://www.google.com/search?q=' + encodeURIComponent(target);
      }
    }
    
    // Normalize Base URL (remove trailing slash)
    const normalizedBase = proxyBaseUrl.endsWith('/') ? proxyBaseUrl.slice(0, -1) : proxyBaseUrl;

    // Engine specific routing
    if (proxyBackend === 'ultraviolet') {
      return `${normalizedBase}/service/${encodeUrl(processed)}`;
    } else if (proxyBackend === 'womginx') {
      return `https://womginx.perplexity.io/main/${processed}`;
    }
    
    return `${normalizedBase}/service/${encodeUrl(processed)}`;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    onNavigate(processUrl(url));
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName && newUrl) {
      onAddApp(newName, newUrl, newIcon);
      setIsAddModalOpen(false);
      setNewName('');
      setNewUrl('');
      setNewIcon('');
      setIsCreating(false);
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (containerRef.current?.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (err) {
      console.warn("Fullscreen toggle interrupted:", err);
    }
  };

  const handleCloseSession = async () => {
    if (document.fullscreenElement && document.visibilityState === 'visible') {
      try {
        await document.exitFullscreen();
      } catch (e) {}
    }
    onNavigate('');
  };

  const handleQuickCreate = () => {
    if (url) {
      setNewUrl(url);
      setNewName(url.split('.')[0].replace('https://', '').replace('http://', '').split('/')[0].toUpperCase());
      setIsAddModalOpen(true);
      setIsCreating(true);
    }
  };

  if (activeUrl) {
    return (
      <div 
        ref={containerRef}
        className={`flex-1 flex flex-col h-full w-full relative animate-in fade-in duration-500 overflow-hidden ${isFullscreen ? 'bg-black' : 'rounded-t-[2.5rem]'}`}
      >
        {!isFullscreen && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
            <div className="bg-black/85 backdrop-blur-2xl border border-accent/40 rounded-full px-8 py-2 text-[11px] font-black text-accent uppercase tracking-widest shadow-glow flex items-center gap-3">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-glow"></span>
              {proxyBackend.toUpperCase()} Architecture Active
            </div>
          </div>
        )}
        
        <div className="absolute top-6 right-6 flex items-center gap-3 z-50">
           <button 
            onClick={toggleFullscreen}
            className="bg-black/60 backdrop-blur-md border border-accent/40 text-accent w-12 h-12 rounded-xl flex items-center justify-center hover:bg-accent hover:text-white transition-all shadow-2xl"
          >
            {isFullscreen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 15v6h-6M3 9V3h6"/></svg>
            )}
          </button>
          
          <button 
            onClick={handleCloseSession}
            className="bg-black/60 backdrop-blur-md border border-accent/40 text-accent w-12 h-12 rounded-xl flex items-center justify-center hover:bg-accent hover:text-white transition-all group shadow-2xl"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition-transform duration-300"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <iframe 
          src={activeUrl}
          className="w-full h-full border-none bg-white"
          title="Proxy Frame"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-16 py-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative group">
          <div className="absolute inset-0 bg-accent/20 blur-[60px] rounded-full group-hover:bg-accent/30 transition-all duration-700"></div>
          <h2 className="text-7xl font-black italic tracking-tighter text-glow-strong text-accent uppercase relative">
            PERPLEXITY
          </h2>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.6em] mb-4">Neural Gateway System v.4.0.1</p>
          <div className="h-0.5 w-12 bg-accent/40 rounded-full"></div>
        </div>
      </div>

      <div className="w-full max-w-3xl space-y-4">
        <form onSubmit={handleSearch} className="relative group">
          <div className="absolute inset-0 bg-accent/5 blur-2xl rounded-full opacity-0 group-focus-within:opacity-100 transition-all duration-700"></div>
          <div className="relative glass border border-accent/20 rounded-full p-2 flex items-center shadow-2xl focus-within:border-accent/60 transition-all duration-500">
            <div className="pl-6 text-accent">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <input 
              type="text" 
              className="w-full bg-transparent border-none outline-none py-5 px-6 text-base text-white placeholder-gray-700 font-black uppercase tracking-widest"
              placeholder="Search or enter target URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button 
              type="submit"
              className="bg-accent h-14 w-32 rounded-full text-white font-black uppercase text-xs tracking-widest shadow-glow hover:scale-[1.05] active:scale-95 transition-all flex items-center justify-center gap-2 mr-1"
            >
              NAVIGATE
            </button>
          </div>
        </form>
        {url && url.includes('.') && (
          <div className="flex justify-center animate-in fade-in slide-in-from-top-2 duration-300">
            <button 
              onClick={handleQuickCreate}
              className="text-[9px] font-black uppercase tracking-[0.2em] text-accent/60 hover:text-accent transition-colors flex items-center gap-2 px-4 py-1 rounded-full border border-accent/10 hover:border-accent/30"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Create Persistence Node for this Target
            </button>
          </div>
        )}
      </div>

      <div className="w-full max-w-5xl space-y-12">
        <div className="space-y-6">
          <div className="flex items-center gap-4 px-2">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-500">Core Network Nodes</h3>
            <div className="h-[1px] flex-1 bg-accent/10"></div>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {QUICK_APPS.map((app) => (
              <button 
                key={app.name} 
                onClick={() => onNavigate(processUrl(app.url))}
                className="group flex flex-col items-center gap-4 transition-all duration-300"
              >
                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center border border-accent/10 group-hover:border-accent/60 group-hover:shadow-glow group-hover:-translate-y-2 transition-all duration-500">
                  <img src={app.icon} className={`w-8 h-8 object-contain transition-all duration-500 group-hover:scale-110 ${app.iconClass}`} alt={app.name} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 group-hover:text-accent transition-colors">{app.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4 px-2">
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-500">User Defined Nodes</h3>
            <div className="h-[1px] flex-1 bg-accent/10"></div>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
            {customApps.map((app) => (
              <button 
                key={app.name} 
                onClick={() => onNavigate(processUrl(app.url))}
                className="group flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center border border-accent/10 group-hover:border-accent group-hover:shadow-glow group-hover:-translate-y-2 transition-all duration-500">
                  <img src={app.icon} className="w-8 h-8 object-contain rounded-lg" alt={app.name} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-600 group-hover:text-accent transition-colors">{app.name}</span>
              </button>
            ))}
            
            <button 
              onClick={() => { setIsAddModalOpen(true); setIsCreating(false); }}
              className="group flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center border border-accent/10 border-dashed hover:border-accent hover:border-solid transition-all group-active:scale-95 duration-500">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-accent/40 group-hover:text-accent group-hover:rotate-90 transition-all duration-500"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-accent/40 group-hover:text-accent transition-colors">Add Node</span>
            </button>
          </div>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/40 animate-in fade-in duration-300">
          <div className="glass max-w-md w-full p-8 rounded-[2.5rem] border border-accent/40 shadow-[0_0_100px_rgba(0,0,0,0.8)] space-y-8">
            <div className="space-y-2">
              <h3 className="text-3xl font-black italic uppercase text-accent tracking-tighter">{isCreating ? 'SYNC_NODE' : 'ADD_CUSTOM_NODE'}</h3>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest leading-relaxed">Initialize a new network waypoint in the terminal interface.</p>
            </div>
            
            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-600 ml-2">Display ID</label>
                <input 
                  type="text" 
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="NODE_NAME..."
                  required
                  className="w-full bg-black/40 border border-accent/20 rounded-full py-4 px-6 text-white placeholder-gray-800 focus:outline-none focus:border-accent transition-all text-xs font-black tracking-widest"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-600 ml-2">Target URL</label>
                <input 
                  type="text" 
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://example.com"
                  required
                  className="w-full bg-black/40 border border-accent/20 rounded-full py-4 px-6 text-white placeholder-gray-800 focus:outline-none focus:border-accent transition-all text-xs font-black tracking-widest"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-600 ml-2">Icon Asset URL (Optional)</label>
                <input 
                  type="text" 
                  value={newIcon}
                  onChange={(e) => setNewIcon(e.target.value)}
                  placeholder="https://example.com/icon.png"
                  className="w-full bg-black/40 border border-accent/20 rounded-full py-4 px-6 text-white placeholder-gray-800 focus:outline-none focus:border-accent transition-all text-xs font-black tracking-widest"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="submit"
                  className="flex-1 bg-accent text-white py-4 rounded-full font-black uppercase tracking-widest text-[11px] shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  LINK_NODE
                </button>
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 bg-black/40 text-gray-500 py-4 rounded-full font-black uppercase tracking-widest text-[11px] border border-white/5 hover:text-white transition-all"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProxyTab;