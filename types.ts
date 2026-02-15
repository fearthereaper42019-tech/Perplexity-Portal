export enum TabType {
  PROXY = 'PROXY',
  GAMES = 'GAMES',
  AI = 'AI',
  SETTINGS = 'SETTINGS'
}

export interface AppInfo {
  name: string;
  url: string;
  icon: string;
  description?: string;
  iconClass?: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface GameInfo {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  url: string;
}

export type MonitoringLevel = 'low' | 'medium' | 'high';

export interface GuardianStatus {
  isMonitoringDetected: boolean;
  confidence: number;
  lastCheck: number;
}