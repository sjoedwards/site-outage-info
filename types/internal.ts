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
  baseUrl: string;
}

export interface ApplicationConfigService {
  get(key: keyof ApplicationConfig): string;
}

export interface HttpOptions {
  apiKey: boolean;
  baseUrl: string;
}

export interface HttpClient {
  get<T>(path: string, options?: HttpOptions): Promise<T>;
  post<T, Y>(path: string, payload: Y, options?: HttpOptions): Promise<T>;
}

export type OutageWithSiteName = Outage & SiteInfo["name"];
