export interface Device {
  id: string;
  name: string;
}

export interface Outage {
  id: string;
  begin: Date;
  end: Date;
}

export interface SiteInfo {
  id: string;
  name: string;
  devices: Device[];
}

// Interfaces

export interface ApplicationLogger {
  info(message: string, payload: unknown): void;
  warn(message: string, payload: unknown): void;
  error(message: string, payload: unknown): void;
}

export interface ApplicationConfig {
  apiKey: string;
}

export interface ApplicationConfigService {
  get(key: keyof ApplicationConfig): string;
}

export type OutageWithSiteName = Outage & SiteInfo["name"];
