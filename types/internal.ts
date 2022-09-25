import { COMMON_CONSTANTS } from "../src/constants";

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
  allOutagesPath: string;
}

export interface ApplicationConfigService {
  get(key: keyof ApplicationConfig): string;
}

export interface HttpOptions {
  sendApiKey?: boolean;
}

export interface HttpClient {
  get<T>(path: string, options?: HttpOptions): Promise<T>;
  post<T, Y>(path: string, payload: Y, options?: HttpOptions): Promise<T>;
}

export interface OutageService {
  getAllOutages(): Promise<Outage[]>;
  filterOutagesPriorToDateTime(outages: Outage[], date: Date): Outage[];
}

export type OutageWithDeviceName = Outage & Device["name"];
