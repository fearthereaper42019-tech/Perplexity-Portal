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
  panicKey: string;
  setPanicKey: (key: string) => void;
  panicAction: 'abort' | 'redirect';
  setPanicAction: (action: 'abort' | 'redirect') => void;
  guardianAlertEnabled: boolean;
  setGuardianAlertEnabled: (enabled: boolean) => void;
  guardianSensitivity: MonitoringLevel;
  setGuardianSensitivity: (level: MonitoringLevel) => void;
  triggerAlertManual?: () => void;
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
  panicKey,
  setPanicKey,
  panicAction,
  setPanicAction,
  guardianAlertEnabled,
  setGuardianAlertEnabled,
  guardianSensitivity,
  setGuardianSensitivity,
  triggerAlertManual
}) => {
  const [stealthMode, setStealthMode] = useState(false);
  const [cloakType, setCloakType] = useState('none');
  const [backendEngine, setBackendEngine] = useState('ultraviolet');
  const [enhancedSafety, setEnhancedSafety] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  
  // Custom Background Modal State
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

  const handleCloakChange = (val: string) => {
    setCloakType(val);
    const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    
    switch (val) {
      case 'google':
        document.title = 'Google';
        if (favicon) favicon.href = 'https://www.google.com/favicon.ico';
        break;
      case 'drive':
        document.title = 'My Drive - Google Drive';
        if (favicon) favicon.href = 'https://ssl.gstatic.com/docs/doclist/images/infinite_arrow_favicon_5.ico';
        break;
      case 'canvas':
        document.title = 'Dashboard';
        if (favicon) favicon.href = 'https://du11hjcvx0uqb.cloudfront.net/br/dist/images/favicon-e1067b0c11.ico';
        break;
      case 'powerschool':
        document.title = 'PowerSchool';
        if (favicon) favicon.href = 'https://www.powerschool.com/favicon.ico';
        break;
      case 'clever':
        document.title = 'Clever | Portal';
        if (favicon) favicon.href = 'https://clever.com/favicon.ico';
        break;
      default:
        document.title = 'Perplexity Proxy';
        if (favicon) favicon.href = '/favicon.ico'; 
    }
  };

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
    { name: 'Classic Black', url: 'none', thumbnail: 'black' },
    { name: 'Alpine Lake', url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=200' },
    { name: 'Scenic View', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=200' },
    { name: 'Cyber City', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000', thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=200' },
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
        
        {/* Backend Engine Settings */}
        <section className="glass rounded-[2.5rem] p-8 border border-accent/10 space-y-6 flex flex-col">
          <div className="pb-4 border-b border-accent/10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Proxy Engine</h3>
          </div>
          
          <div className="space-y-6 flex-1">
            <div className="flex flex-col gap-3">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-600">Active Backend</label>
              <select 
                value={backendEngine}
                onChange={(e) => setBackendEngine(e.target.value)}
                className="bg-black border border-accent/20 rounded-full p-4 focus:outline-none focus:border-accent text-white font-black text-[11px] appearance-none transition-all uppercase tracking-widest cursor-pointer hover:bg-accent/5"
              >
                <option value="ultraviolet">Ultraviolet (Optimized)</option>
                <option value="scramjet">Scramjet Engine</option>
                <option value="rhodium">Rhodium Interface</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between p-5 bg-accent/5 rounded-[2rem] border border-accent/10 hover:border-accent/20 transition-all">
              <div className="space-y-1">
                <p className="text-xs font-black uppercase tracking-widest">Enhanced Safety</p>
                <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest">WSS Encryption Layer</p>
              </div>
              <button 
                onClick={() => setEnhancedSafety(!enhancedSafety)}
                className={`w-14 h-7 rounded-full transition-all relative border border-accent/20 active:scale-95 ${enhancedSafety ? 'bg-accent shadow-glow' : 'bg-black'}`}
              >
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 ${enhancedSafety ? 'left-8' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
        </section>

        {/* Guardian Detection Module */}
        <section className="glass rounded-[2.5rem] p-8 border border-red-500/20 space-y-6 flex flex-col bg-red-950/5">
          <div className="pb-4 border-b border-red-500/10 flex justify-between items-center">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">Guardian Alert</h3>
            <span className="text-[8px] text-red-500/40 uppercase font-black tracking-[0.2em]">Heuristic Scan</span>
          </div>
          
          <div className="space-y-6 flex-1">
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

            <button 
              onClick={triggerAlertManual}
              className="w-full bg-red-600/10 border border-red-600/30 text-red-500 py-4 rounded-full hover:bg-red-600 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest active:scale-[0.98] shadow-glow-hover mt-2"
            >
              TEST_REALTIME_ALERT
            </button>
          </div>
        </section>

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

        {/* Panic Protocol module */}
        <section className="glass rounded-[2.5rem] p-10 border border-red-900/20 space-y-8 md:col-span-2">
          <div className="pb-4 border-b border-red-900/10 flex justify-between items-center">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500">Emergency Protocol</h3>
            <span className="text-[8px] text-red-500/40 uppercase font-black tracking-[0.2em]">Manual Trigger</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="flex justify-between items-center px-2">
                <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">Bind Panic Key</p>
                {panicKey && !isRecording && (
                  <button 
                    onClick={() => setPanicKey('')}
                    className="text-[8px] font-black uppercase text-red-500/60 hover:text-red-500 transition-colors tracking-widest"
                  >
                    [ CLEAR_BIND ]
                  </button>
                )}
              </div>
              <button 
                onClick={() => setIsRecording(true)}
                className={`w-full py-6 rounded-[1.5rem] border font-black uppercase tracking-[0.2em] transition-all active:scale-95 ${
                  isRecording 
                    ? 'bg-red-500 border-white text-white animate-pulse shadow-[0_0_20px_rgba(255,255,255,0.4)]' 
                    : 'bg-black/60 border-red-900/20 text-red-500 hover:border-red-500 shadow-xl'
                }`}
              >
                {isRecording ? 'AWAITING KEY...' : panicKey ? `CURRENT KEY: [ ${panicKey.toUpperCase()} ]` : 'CLICK TO BIND'}
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">System Response</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setPanicAction('abort')}
                  className={`flex-1 py-4 rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest transition-all border ${
                    panicAction === 'abort' 
                      ? 'bg-red-500 border-transparent text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]' 
                      : 'bg-black/40 border-red-900/20 text-red-500/60 hover:text-red-500'
                  }`}
                >
                  CLOSE SESSION
                </button>
                <button 
                  onClick={() => setPanicAction('redirect')}
                  className={`flex-1 py-4 rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest transition-all border ${
                    panicAction === 'redirect' 
                      ? 'bg-red-500 border-transparent text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]' 
                      : 'bg-black/40 border-red-900/20 text-red-500/60 hover:text-red-500'
                  }`}
                >
                  CLEVER REDIRECT
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Atmospheric Systems */}
        <section className="glass rounded-[2.5rem] p-10 border border-accent/10 space-y-6 md:col-span-2">
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

        {/* Background Selection */}
        <section className="glass rounded-[2.5rem] p-10 border border-accent/10 space-y-8 md:col-span-2 relative">
          <div className="pb-4 border-b border-accent/10 flex justify-between items-center">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Neural Environment</h3>
            <button 
              onClick={() => setIsBgModalOpen(true)}
              className="px-6 py-2 bg-accent/10 hover:bg-accent border border-accent/20 text-accent hover:text-white rounded-full transition-all text-[9px] font-black uppercase tracking-widest active:scale-95 shadow-glow-hover"
            >
              ADD_IMAGE
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Default Backgrounds */}
            {defaultBackgrounds.map((bg) => (
              <button
                key={bg.name}
                onClick={() => setBgImage(bg.url)}
                className={`group flex flex-col gap-4 rounded-[1.5rem] overflow-hidden border transition-all active:scale-95 ${bgImage === bg.url ? 'border-accent shadow-glow scale-105' : 'border-accent/10 hover:border-accent/30'}`}
              >
                <div className="h-32 w-full relative overflow-hidden bg-black">
                  {bg.thumbnail === 'black' ? (
                    <div className="w-full h-full bg-black flex items-center justify-center overflow-hidden">
                       <div className="opacity-40 flex gap-2">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce"></div>
                          <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce delay-75"></div>
                          <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce delay-150"></div>
                       </div>
                    </div>
                  ) : (
                    <img src={bg.thumbnail} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt={bg.name} />
                  )}
                  {bgImage === bg.url && (
                    <div className="absolute inset-0 bg-accent/20 backdrop-blur-[1px] flex items-center justify-center">
                      <div className="bg-white text-accent font-black text-[9px] px-3 py-1 rounded-full uppercase tracking-widest shadow-xl">ACTIVE</div>
                    </div>
                  )}
                </div>
                <div className="pb-4 px-4 text-[10px] font-black uppercase tracking-widest text-center text-gray-500 group-hover:text-accent transition-colors">
                  {bg.name}
                  {bg.url === 'none' && <span className="block text-[8px] text-accent/50">Core Particle Stream</span>}
                </div>
              </button>
            ))}

            {/* Custom Backgrounds */}
            {customBackgrounds.map((bg) => (
              <div key={bg.url} className="relative group">
                <button
                  onClick={() => setBgImage(bg.url)}
                  className={`w-full flex flex-col gap-4 rounded-[1.5rem] overflow-hidden border transition-all active:scale-95 ${bgImage === bg.url ? 'border-accent shadow-glow scale-105' : 'border-accent/10 hover:border-accent/30'}`}
                >
                  <div className="h-32 w-full relative overflow-hidden bg-black">
                    <img src={bg.url} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt={bg.name} />
                    {bgImage === bg.url && (
                      <div className="absolute inset-0 bg-accent/20 backdrop-blur-[1px] flex items-center justify-center">
                        <div className="bg-white text-accent font-black text-[9px] px-3 py-1 rounded-full uppercase tracking-widest shadow-xl">ACTIVE</div>
                      </div>
                    )}
                  </div>
                  <div className="pb-4 px-4 text-[10px] font-black uppercase tracking-widest text-center text-gray-500 group-hover:text-accent transition-colors">
                    {bg.name}
                  </div>
                </button>
                <button 
                  onClick={() => handleRemoveCustomBg(bg.url)}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-600/80 text-white rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Background Addition Modal */}
          {isBgModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/40 animate-in fade-in duration-300">
              <div className="glass max-w-md w-full p-8 rounded-[2.5rem] border border-accent/40 shadow-[0_0_100px_rgba(0,0,0,0.8)] space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-black italic uppercase text-accent tracking-tighter">ADD_CUSTOM_ENVIRONMENT</h3>
                  <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest leading-relaxed">Provide a direct URL to an image asset for environmental projection.</p>
                </div>
                
                <form onSubmit={handleAddCustomBg} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-600 ml-2">Label</label>
                    <input 
                      type="text" 
                      value={newBgName}
                      onChange={(e) => setNewBgName(e.target.value)}
                      placeholder="ENVIRONMENT_NAME..."
                      required
                      className="w-full bg-black/40 border border-accent/20 rounded-full py-4 px-6 text-white placeholder-gray-800 focus:outline-none focus:border-accent transition-all text-xs font-black tracking-widest"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-600 ml-2">Source URL</label>
                    <input 
                      type="url" 
                      value={newBgUrl}
                      onChange={(e) => setNewBgUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      required
                      className="w-full bg-black/40 border border-accent/20 rounded-full py-4 px-6 text-white placeholder-gray-800 focus:outline-none focus:border-accent transition-all text-xs font-black tracking-widest"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button 
                      type="submit"
                      className="flex-1 bg-accent text-white py-4 rounded-full font-black uppercase tracking-widest text-[10px] shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      SYNC_ENVIRONMENT
                    </button>
                    <button 
                      type="button"
                      onClick={() => setIsBgModalOpen(false)}
                      className="flex-1 bg-black/40 text-gray-500 py-4 rounded-full font-black uppercase tracking-widest text-[10px] border border-white/5 hover:text-white transition-all"
                    >
                      CANCEL
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Danger Zone */}
      <div className="flex flex-col md:flex-row items-center justify-between p-10 glass rounded-[2.5rem] border border-red-900/10 gap-8">
        <div className="text-center md:text-left space-y-1">
          <h4 className="font-black text-red-500 uppercase tracking-widest text-sm italic">System Overwrite</h4>
          <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest">Permanently delete locally stored configuration data and reset UI.</p>
        </div>
        <button 
          onClick={() => {
            if (confirm("Proceed with full system reset? This will wipe your panic key and background settings.")) {
              setAccentColor('168, 85, 247');
              setNeonIntensity(70);
              setSurfaceType('glass');
              setIsRainActive(true);
              setBgImage('none');
              localStorage.removeItem('perplexity_custom_apps');
              localStorage.removeItem('perplexity_custom_backgrounds');
              localStorage.removeItem('perplexity_panic_key');
              localStorage.removeItem('perplexity_panic_action');
              localStorage.removeItem('perplexity_guardian_alert');
              localStorage.removeItem('perplexity_guardian_sensitivity');
              window.location.reload();
            }
          }}
          className="w-full md:w-auto px-12 py-4 bg-red-900/5 text-red-500/60 border border-red-900/20 rounded-full hover:bg-red-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest active:scale-95"
        >
          EXECUTE_WIPE
        </button>
      </div>
    </div>
  );
};

export default SettingsTab;