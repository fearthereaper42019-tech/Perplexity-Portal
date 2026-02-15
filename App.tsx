import React, { useState, useEffect } from 'react';
import { TabType, AppInfo, MonitoringLevel } from './types';
import ProxyTab from './components/ProxyTab';
import GamesTab from './components/GamesTab';
import AITab from './components/AITab';
import SettingsTab from './components/SettingsTab';
import { Layout } from './components/Layout';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.PROXY);
  const [showWipWarning, setShowWipWarning] = useState(true);
  const [activeProxyUrl, setActiveProxyUrl] = useState<string>('');
  
  // Theme State
  const [accentColor, setAccentColor] = useState(() => 
    localStorage.getItem('perplexity_accent_color') || '168, 85, 247'
  );
  const [neonIntensity, setNeonIntensity] = useState(() => 
    Number(localStorage.getItem('perplexity_neon_intensity')) || 70
  );
  const [surfaceType, setSurfaceType] = useState<'glass' | 'solid'>(() => 
    (localStorage.getItem('perplexity_surface_type') as 'glass' | 'solid') || 'glass'
  );
  const [isRainActive, setIsRainActive] = useState(() => {
    const saved = localStorage.getItem('perplexity_rain_active');
    return saved === null ? true : saved === 'true';
  });
  const [bgImage, setBgImage] = useState<string>(() => 
    localStorage.getItem('perplexity_bg_image') || 'none'
  );
  const [customBackgrounds, setCustomBackgrounds] = useState<{name: string, url: string}[]>(() => {
    const saved = localStorage.getItem('perplexity_custom_backgrounds');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Proxy Engine State
  const [proxyBackend, setProxyBackend] = useState(() => localStorage.getItem('perplexity_proxy_backend') || 'ultraviolet');
  const [proxyBaseUrl, setProxyBaseUrl] = useState(() => localStorage.getItem('perplexity_proxy_base_url') || window.location.origin);

  // Stealth State (Cloaking)
  const [cloakType, setCloakType] = useState(() => localStorage.getItem('perplexity_cloak_type') || 'none');

  // Panic State
  const [panicKey, setPanicKey] = useState(() => localStorage.getItem('perplexity_panic_key') || '');
  const [panicAction, setPanicAction] = useState<'abort' | 'redirect'>(() => 
    (localStorage.getItem('perplexity_panic_action') as 'abort' | 'redirect') || 'abort'
  );

  // Guardian Alert State
  const [guardianAlertEnabled, setGuardianAlertEnabled] = useState(() => {
    const saved = localStorage.getItem('perplexity_guardian_alert');
    return saved === null ? true : saved === 'true';
  });
  const [guardianSensitivity, setGuardianSensitivity] = useState<MonitoringLevel>(() => 
    (localStorage.getItem('perplexity_guardian_sensitivity') as MonitoringLevel) || 'medium'
  );
  const [isGuardianDetected, setIsGuardianDetected] = useState(false);

  // Custom Apps State
  const [customApps, setCustomApps] = useState<AppInfo[]>(() => {
    const saved = localStorage.getItem('perplexity_custom_apps');
    return saved ? JSON.parse(saved) : [];
  });

  // Cloaking Logic Application
  useEffect(() => {
    const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    localStorage.setItem('perplexity_cloak_type', cloakType);

    switch (cloakType) {
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
  }, [cloakType]);

  // Global Panic Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (panicKey && e.key.toLowerCase() === panicKey.toLowerCase()) {
        executePanic();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [panicKey, panicAction]);

  const executePanic = () => {
    if (panicAction === 'redirect') {
      window.location.replace('https://clever.com');
    } else {
      setActiveProxyUrl('');
      setActiveTab(TabType.PROXY);
      setIsGuardianDetected(false);
    }
  };

  // Advanced Guardian Monitoring Logic
  useEffect(() => {
    if (!guardianAlertEnabled) {
      setIsGuardianDetected(false);
      return;
    }

    const scanEnvironment = async () => {
      let suspicious = false;
      const extensionIds = [
        'haldlgldplgnggkjaoolnadoibebeacu',
        'nmofcdhdgeifgbbagihonffonjkjclio',
        'iadeocmdlklooncafbiibopnohedpcpd'
      ];

      if ((window as any)._gorgon || (window as any).__v_detector || (window as any).guardian) {
        suspicious = true;
      }

      for (const id of extensionIds) {
        try {
          const res = await fetch(`chrome-extension://${id}/manifest.json`);
          if (res.status === 200) {
            suspicious = true;
            break;
          }
        } catch (e) {}
      }

      if (document.documentElement.hasAttribute('data-goguardian-active') || 
          document.querySelector('script[src*="goguardian"]')) {
        suspicious = true;
      }

      if (suspicious && !isGuardianDetected) {
        setIsGuardianDetected(true);
      }
    };

    scanEnvironment();
    const interval = setInterval(scanEnvironment, 5000);
    return () => clearInterval(interval);
  }, [guardianAlertEnabled, guardianSensitivity, isGuardianDetected]);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('perplexity_custom_apps', JSON.stringify(customApps));
    localStorage.setItem('perplexity_custom_backgrounds', JSON.stringify(customBackgrounds));
    localStorage.setItem('perplexity_panic_key', panicKey);
    localStorage.setItem('perplexity_panic_action', panicAction);
    localStorage.setItem('perplexity_guardian_alert', guardianAlertEnabled.toString());
    localStorage.setItem('perplexity_guardian_sensitivity', guardianSensitivity);
    localStorage.setItem('perplexity_proxy_backend', proxyBackend);
    localStorage.setItem('perplexity_proxy_base_url', proxyBaseUrl);
  }, [customApps, customBackgrounds, panicKey, panicAction, guardianAlertEnabled, guardianSensitivity, proxyBackend, proxyBaseUrl]);

  useEffect(() => {
    localStorage.setItem('perplexity_accent_color', accentColor);
    localStorage.setItem('perplexity_neon_intensity', neonIntensity.toString());
    localStorage.setItem('perplexity_surface_type', surfaceType);
    localStorage.setItem('perplexity_rain_active', isRainActive.toString());
    localStorage.setItem('perplexity_bg_image', bgImage);
    
    const root = document.documentElement;
    root.style.setProperty('--accent-rgb', accentColor);
    root.style.setProperty('--glow-strength', (neonIntensity / 100).toString());
    root.style.setProperty('--surface-opacity', surfaceType === 'solid' ? '1' : '0.7');
    root.style.setProperty('--blur-strength', surfaceType === 'solid' ? '0px' : '15px');
  }, [accentColor, neonIntensity, surfaceType, isRainActive, bgImage]);

  const addApp = (name: string, url: string, icon?: string) => {
    const newApp: AppInfo = {
      name,
      url,
      icon: icon || `https://api.dicebear.com/7.x/initials/svg?seed=${name}&backgroundColor=rgb(${accentColor})`
    };
    setCustomApps([...customApps, newApp]);
  };

  const handleNavigate = (url: string) => {
    setActiveProxyUrl(url);
    setActiveTab(TabType.PROXY);
  };

  const renderContent = () => {
    switch (activeTab) {
      case TabType.PROXY:
        return (
          <ProxyTab 
            customApps={customApps} 
            onAddApp={addApp} 
            activeUrl={activeProxyUrl}
            onNavigate={setActiveProxyUrl}
            proxyBackend={proxyBackend}
            proxyBaseUrl={proxyBaseUrl}
          />
        );
      case TabType.GAMES:
        return <GamesTab />;
      case TabType.AI:
        return <AITab />;
      case TabType.SETTINGS:
        return (
          <SettingsTab 
            accentColor={accentColor} 
            setAccentColor={setAccentColor}
            neonIntensity={neonIntensity}
            setNeonIntensity={setNeonIntensity}
            surfaceType={surfaceType}
            setSurfaceType={setSurfaceType}
            isRainActive={isRainActive}
            setIsRainActive={setIsRainActive}
            bgImage={bgImage}
            setBgImage={setBgImage}
            customBackgrounds={customBackgrounds}
            setCustomBackgrounds={setCustomBackgrounds}
            cloakType={cloakType}
            setCloakType={setCloakType}
            panicKey={panicKey}
            setPanicKey={setPanicKey}
            panicAction={panicAction}
            setPanicAction={setPanicAction}
            guardianAlertEnabled={guardianAlertEnabled}
            setGuardianAlertEnabled={setGuardianAlertEnabled}
            guardianSensitivity={guardianSensitivity}
            setGuardianSensitivity={setGuardianSensitivity}
            triggerAlertManual={() => setIsGuardianDetected(true)}
            executePanicManual={executePanic}
            proxyBackend={proxyBackend}
            setProxyBackend={setProxyBackend}
            proxyBaseUrl={proxyBaseUrl}
            setProxyBaseUrl={setProxyBaseUrl}
          />
        );
      default:
        return <ProxyTab customApps={customApps} onAddApp={addApp} activeUrl={activeProxyUrl} onNavigate={setActiveProxyUrl} proxyBackend={proxyBackend} proxyBaseUrl={proxyBaseUrl} />;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      bgImage={bgImage}
      surfaceType={surfaceType}
      isRainActive={isRainActive}
      showWipWarning={showWipWarning}
      onCloseWip={() => setShowWipWarning(false)}
      currentUrl={activeProxyUrl}
      onUrlChange={handleNavigate}
      isGuardianDetected={isGuardianDetected}
      onClearGuardianAlert={() => setIsGuardianDetected(false)}
      executePanic={executePanic}
    >
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;