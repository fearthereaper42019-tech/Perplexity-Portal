import React, { useState, useEffect } from 'react';
import { MonitoringLevel } from '../types';

interface SettingsTabProps {
  accentColor: string;
  setAccentColor: (color: string) => void;
  neonIntensity: number;
  setNeonIntensity: (intensity: number) => void;
  surfaceType: 'glass' | 'solid';
  setSurfaceType: (type: 'glass' | 'solid') => void;
  isRainActive: boolean;
  setIsRainActive: (active: boolean) => void;
  bgImage: string;
  setBgImage: (img: string) => void;
  customBackgrounds: {name: string, url: string}[];
  setCustomBackgrounds: React.Dispatch<React.SetStateAction<{name: string, url: string}[]>>;
  cloakType: string;
  setCloakType: (val: string) => void;
  panicKey: string;
  setPanicKey: (key: string) => void;
  panicAction: 'abort' | 'redirect';
  setPanicAction: (action: 'abort' | 'redirect') => void;
  guardianAlertEnabled: boolean;
  setGuardianAlertEnabled: (enabled: boolean) => void;
  guardianSensitivity: MonitoringLevel;
  setGuardianSensitivity: (level: MonitoringLevel) => void;
  triggerAlertManual: () => void;
  executePanicManual: () => void;
  proxyBackend: string;
  setProxyBackend: (val: string) => void;
  proxyBaseUrl: string;
  setProxyBaseUrl: (val: string) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({
  accentColor,
  setAccentColor,
  neonIntensity,
  setNeonIntensity,
  surfaceType,
  setSurfaceType,
  isRainActive,
  setIsRainActive,
  bgImage,
  setBgImage,
  customBackgrounds,
  setCustomBackgrounds,
  cloakType,
  setCloakType,
  panicKey,
  setPanicKey,
  panicAction,
  setPanicAction,
  guardianAlertEnabled,
  setGuardianAlertEnabled,
  guardianSensitivity,
  setGuardianSensitivity,
  triggerAlertManual,
  executePanicManual,
  proxyBackend,
  setProxyBackend,
  proxyBaseUrl,
  setProxyBaseUrl
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isBgModalOpen, setIsBgModalOpen] = useState(false);
  const [newBgUrl, setNewBgUrl] = useState('');
  const [newBgName, setNewBgName] = useState('');

  useEffect(() => {
    if (!isRecording) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      setPanicKey(e.key);
      setIsRecording(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRecording, setPanicKey]);

  const handleAboutBlank = () => {
    const win = window.open();
    if (!win) return;
    const url = window.location.href;
    const iframe = win.document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.src = url;
    win.document.body.appendChild(iframe);
    window.location.replace('https://google.com');
  };

  const colors = [
    { name: 'Purple', rgb: '168, 85, 247' },
    { name: 'Blue', rgb: '37, 99, 235' },
    { name: 'Emerald', rgb: '5, 150, 105' },
    { name: 'Rose', rgb: '225, 29, 72' },
  ];

  const defaultBackgrounds = [
    { name: 'Default Black', url: 'none', thumbnail: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=' },
    { name: 'Neural Grid', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop', thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=200&auto=format&fit=crop' },
    { name: 'Cyberspace', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop', thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=200&auto=format&fit=crop' },
    { name: 'Deep Nebula', url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop', thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=200&auto=format&fit=crop' },
  ];

  const handleAddCustomBg = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBgUrl && newBgName) {
      setCustomBackgrounds([...customBackgrounds, { name: newBgName, url: newBgUrl }]);
      setBgImage(newBgUrl);
      setNewBgUrl('');
      setNewBgName('');
      setIsBgModalOpen(false);
    }
  };

  const handleRemoveCustomBg = (url: string) => {
    setCustomBackgrounds(customBackgrounds.filter(bg => bg.url !== url));
    if (bgImage === url) setBgImage('none');
  };

  return (
    <div className="max-w-4xl mx-auto w-full space-y-12 animate-in fade-in duration-700">
      <header className="text-center space-y-3">
        <h2 className="text-5xl font-black text-glow-strong text-accent tracking-tighter italic uppercase">SETTINGS</h2>
        <div className="h-[2px] w-12 bg-accent mx-auto opacity-30 rounded-full"></div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Appearance Settings */}
        <section className="glass rounded-[2.5rem] p-10 border border-accent/10 space-y-10 md:col-span-2">
          <div className="pb-4 border-b border-accent/10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Interface Calibration</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            <div className="space-y-4">
              <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">Neon Accent</p>
              <div className="flex gap-4">
                {colors.map((c) => (
                  <button
                    key={c.rgb}
                    onClick={() => setAccentColor(c.rgb)}
                    style={{ backgroundColor: `rgb(${c.rgb})` }}
                    className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-110 active:scale-90 ${accentColor === c.rgb ? 'border-white scale-110 shadow-glow' : 'border-white/5'}`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">Glow Intensity</p>
                <span className="text-[10px] text-accent font-black">{neonIntensity}%</span>
              </div>
              <input 
                type="range" 
                className="w-full h-1.5 bg-accent/10 rounded-full appearance-none cursor-pointer accent-accent" 
                min="0" 
                max="100" 
                value={neonIntensity}
                onChange={(e) => setNeonIntensity(parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-4">
              <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">Material Finish</p>
              <div className="flex gap-2 p-1 bg-black/40 rounded-full border border-accent/10">
                <button 
                  onClick={() => setSurfaceType('solid')}
                  className={`flex-1 rounded-full py-3 text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 ${surfaceType === 'solid' ? 'bg-accent text-white shadow-glow' : 'text-gray-600'}`}
                >
                  Solid
                </button>
                <button 
                  onClick={() => setSurfaceType('glass')}
                  className={`flex-1 rounded-full py-3 text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 ${surfaceType === 'glass' ? 'bg-accent/20 text-accent shadow-glow' : 'text-gray-600'}`}
                >
                  Glass
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Proxy Backend Selection & Configuration */}
        <section className="glass rounded-[2.5rem] p-10 border border-accent/10 space-y-8 md:col-span-2">
          <div className="pb-4 border-b border-accent/10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Network Architecture</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { id: 'ultraviolet', label: 'Ultraviolet', desc: 'Secure XOR Encryption (Recommended)' },
              { id: 'womginx', label: 'Womginx', desc: 'High Compatibility Legacy Engine' },
              { id: 'dynamic', label: 'Dynamic', desc: 'Auto-Switching Protocol V4' }
            ].map(engine => (
              <button
                key={engine.id}
                onClick={() => setProxyBackend(engine.id)}
                className={`flex flex-col gap-2 p-6 rounded-[2rem] border transition-all text-left ${proxyBackend === engine.id ? 'bg-accent/20 border-accent shadow-glow' : 'bg-black/40 border-accent/10 hover:border-accent/40'}`}
              >
                <span className={`text-[11px] font-black uppercase tracking-widest ${proxyBackend === engine.id ? 'text-white' : 'text-accent'}`}>{engine.label}</span>
                <span className="text-[9px] text-gray-600 font-black uppercase tracking-tighter leading-none">{engine.desc}</span>
              </button>
            ))}
          </div>

          <div className="pt-6 space-y-4">
            <div className="flex flex-col gap-3">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-600 ml-2">Ultraviolet Backend URL</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={proxyBaseUrl}
                  onChange={(e) => setProxyBaseUrl(e.target.value)}
                  placeholder="https://your-uv-backend.com"
                  className="flex-1 bg-black/40 border border-accent/20 rounded-full py-4 px-6 text-white placeholder-gray-800 focus:outline-none focus:border-accent transition-all text-xs font-black tracking-widest"
                />
                <button 
                  onClick={() => setProxyBaseUrl(window.location.origin)}
                  className="bg-black/40 border border-accent/20 text-accent px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-accent/10"
                >
                  RESET
                </button>
              </div>
              <p className="text-[8px] text-gray-700 font-black uppercase tracking-widest ml-4">
                NOTE: Relative paths like "/service/" will fail on Static Hosts (Netlify/Vercel). Point this to a real UV instance to fix redirect loops.
              </p>
            </div>
          </div>
        </section>

        {/* Background Gallery Section */}
        <section className="glass rounded-[2.5rem] p-10 border border-accent/10 space-y-8 md:col-span-2">
          <div className="pb-4 border-b border-accent/10 flex justify-between items-center">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Neural Backgrounds</h3>
            <button 
              onClick={() => setIsBgModalOpen(true)}
              className="text-[9px] font-black uppercase tracking-widest text-accent/60 hover:text-accent flex items-center gap-2 transition-all"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Upload_Node
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-6">
            {defaultBackgrounds.map((bg) => (
              <button
                key={bg.name}
                onClick={() => setBgImage(bg.url)}
                className={`group relative aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all ${bgImage === bg.url ? 'border-accent shadow-glow' : 'border-transparent hover:border-accent/40'}`}
              >
                <img src={bg.thumbnail} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={bg.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[8px] font-black uppercase tracking-widest text-white/80">{bg.name}</span>
                </div>
              </button>
            ))}

            {customBackgrounds.map((bg) => (
              <div key={bg.url} className="relative group aspect-[4/3]">
                <button
                  onClick={() => setBgImage(bg.url)}
                  className={`w-full h-full rounded-2xl overflow-hidden border-2 transition-all ${bgImage === bg.url ? 'border-accent shadow-glow' : 'border-transparent hover:border-accent/40'}`}
                >
                  <img src={bg.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={bg.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                    <span className="text-[8px] font-black uppercase tracking-widest text-white/80 truncate">{bg.name}</span>
                  </div>
                </button>
                <button 
                  onClick={() => handleRemoveCustomBg(bg.url)}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Tab Cloaking & About:Blank */}
        <section className="glass rounded-[2.5rem] p-8 border border-accent/10 space-y-6 flex flex-col">
          <div className="pb-4 border-b border-accent/10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Stealth & Cloaking</h3>
          </div>
          
          <div className="space-y-6 flex-1">
            <div className="flex flex-col gap-3">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-600">Active Cloak</label>
              <select 
                value={cloakType}
                onChange={(e) => setCloakType(e.target.value)}
                className="bg-black border border-accent/20 rounded-full p-4 focus:outline-none focus:border-accent text-white font-black text-[11px] appearance-none transition-all uppercase tracking-widest cursor-pointer hover:bg-accent/5"
              >
                <option value="none">None (Perplexity)</option>
                <option value="google">Google Search</option>
                <option value="drive">Google Drive</option>
                <option value="canvas">Canvas Dashboard</option>
                <option value="powerschool">PowerSchool</option>
                <option value="clever">Clever Portal</option>
              </select>
            </div>
            
            <button 
              onClick={handleAboutBlank}
              className="w-full bg-accent/10 border border-accent/30 text-accent py-4 rounded-full hover:bg-accent hover:text-white transition-all text-[10px] font-black uppercase tracking-widest active:scale-[0.98] shadow-glow-hover"
            >
              CREATE ABOUT:BLANK PORTAL
            </button>
          </div>
        </section>

        {/* Panic Control Module */}
        <section className="glass rounded-[2.5rem] p-8 border border-red-500/20 space-y-6 flex flex-col bg-red-950/5">
          <div className="pb-4 border-b border-red-500/10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">Panic Protocol</h3>
          </div>
          
          <div className="space-y-4 flex-1">
             <div className="flex flex-col gap-3">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-600">Panic Trigger Key</label>
              <button 
                onClick={() => setIsRecording(true)}
                className={`w-full py-4 rounded-full font-black uppercase tracking-widest text-[11px] transition-all border ${isRecording ? 'bg-red-600 text-white animate-pulse border-white' : 'bg-black/40 text-accent border-accent/20'}`}
              >
                {isRecording ? 'PRESS_ANY_KEY' : (panicKey ? `BOUND_TO: [ ${panicKey.toUpperCase()} ]` : 'SET_TRIGGER_KEY')}
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-600">Reaction Event</label>
              <div className="flex gap-2 p-1 bg-black/40 rounded-full border border-red-900/10">
                {(['abort', 'redirect'] as const).map((action) => (
                  <button 
                    key={action}
                    onClick={() => setPanicAction(action)}
                    className={`flex-1 rounded-full py-2 text-[9px] font-black uppercase tracking-widest transition-all ${panicAction === action ? 'bg-red-600 text-white shadow-lg' : 'text-gray-600'}`}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={executePanicManual}
              className="w-full bg-red-600 text-white py-4 rounded-full font-black uppercase tracking-widest text-[11px] shadow-glow active:scale-95 transition-all mt-2"
            >
              EXECUTE_PANIC_MANUAL
            </button>
          </div>
        </section>

        {/* Guardian Detection Module */}
        <section className="glass rounded-[2.5rem] p-8 border border-red-500/20 space-y-6 flex flex-col bg-red-950/5 md:col-span-2">
          <div className="pb-4 border-b border-red-500/10 flex justify-between items-center">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">Guardian Alert</h3>
            <button 
              onClick={triggerAlertManual}
              className="text-[9px] font-black uppercase tracking-[0.2em] text-red-500/60 hover:text-red-500 transition-colors flex items-center gap-2"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
              TEST_ENVIRONMENT
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex items-center justify-between p-5 bg-red-500/5 rounded-[2rem] border border-red-500/10 hover:border-red-500/20 transition-all">
              <div className="space-y-1">
                <p className="text-xs font-black uppercase tracking-widest text-red-400">Scanner Status</p>
                <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest">Background detection</p>
              </div>
              <button 
                onClick={() => setGuardianAlertEnabled(!guardianAlertEnabled)}
                className={`w-14 h-7 rounded-full transition-all relative border border-accent/20 active:scale-95 ${guardianAlertEnabled ? 'bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]' : 'bg-black'}`}
              >
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 ${guardianAlertEnabled ? 'left-8' : 'left-1'}`}></div>
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-600">Detection Level</label>
              <div className="flex gap-2 p-1 bg-black/40 rounded-full border border-red-900/10">
                {(['low', 'medium', 'high'] as MonitoringLevel[]).map((level) => (
                  <button 
                    key={level}
                    onClick={() => setGuardianSensitivity(level)}
                    className={`flex-1 rounded-full py-2 text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 ${guardianSensitivity === level ? 'bg-red-600 text-white shadow-lg' : 'text-gray-600'}`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Atmospheric Systems */}
      <section className="glass rounded-[2.5rem] p-10 border border-accent/10 space-y-6">
        <div className="pb-4 border-b border-accent/10">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Atmospheric Systems</h3>
        </div>
        
        <div className="flex items-center justify-between p-6 bg-accent/5 rounded-[2rem] border border-accent/10 hover:border-accent/20 transition-all">
          <div className="space-y-1">
            <p className="text-sm font-black uppercase tracking-widest">Neural Rainfall</p>
            <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest">Dynamic particle synthesis with organic light refraction</p>
          </div>
          <button 
            onClick={() => setIsRainActive(!isRainActive)}
            className={`w-16 h-8 rounded-full transition-all relative border border-accent/20 active:scale-95 ${isRainActive ? 'bg-accent shadow-glow' : 'bg-black'}`}
          >
            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${isRainActive ? 'left-9' : 'left-1'}`}></div>
          </button>
        </div>
      </section>

      {/* Background Modal */}
      {isBgModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 backdrop-blur-md bg-black/60 animate-in fade-in duration-300">
          <div className="glass max-w-md w-full p-10 rounded-[2.5rem] border border-accent/40 shadow-2xl space-y-8">
            <div className="space-y-2">
              <h3 className="text-3xl font-black italic uppercase text-accent tracking-tighter">ADD_ATMOSPHERE</h3>
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Link a neural asset to use as a primary environment background.</p>
            </div>
            
            <form onSubmit={handleAddCustomBg} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-600 ml-2">Wallpaper ID</label>
                <input 
                  type="text" 
                  value={newBgName}
                  onChange={(e) => setNewBgName(e.target.value)}
                  placeholder="ENV_NAME..."
                  required
                  className="w-full bg-black/40 border border-accent/20 rounded-full py-4 px-6 text-white placeholder-gray-800 focus:outline-none focus:border-accent transition-all text-xs font-black tracking-widest"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-600 ml-2">Image URL</label>
                <input 
                  type="text" 
                  value={newBgUrl}
                  onChange={(e) => setNewBgUrl(e.target.value)}
                  placeholder="https://..."
                  required
                  className="w-full bg-black/40 border border-accent/20 rounded-full py-4 px-6 text-white placeholder-gray-800 focus:outline-none focus:border-accent transition-all text-xs font-black tracking-widest"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="submit"
                  className="flex-1 bg-accent text-white py-4 rounded-full font-black uppercase tracking-widest text-[11px] shadow-glow"
                >
                  LOAD_ASSET
                </button>
                <button 
                  type="button"
                  onClick={() => setIsBgModalOpen(false)}
                  className="flex-1 bg-black/40 text-gray-500 py-4 rounded-full font-black uppercase tracking-widest text-[11px]"
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

export default SettingsTab;