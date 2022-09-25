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

export interface ApplicationLogger {
  info: (message: string, payload: unknown) => void;
  warn: (message: string, payload: unknown) => void;
  error: (message: string, payload: unknown) => void;
}

export type OutageWithSiteName = Outage & SiteInfo["name"];
