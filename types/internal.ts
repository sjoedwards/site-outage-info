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

export type OutageWithSiteName = Outage & SiteInfo["name"];
