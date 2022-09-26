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
  info(message: string, payload: unknown): void;
  warn(message: string, payload: unknown): void;
  error(message: string, payload: unknown): void;
}

export interface ApplicationConfig {
  apiKey: string;
  baseUrl: string;
  allOutagesPath: string;
  siteInfoPath: string;
  siteOutagePath: string;
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
  filterOutagesPriorToDateTime(outages: Outage[], filterDate: Date): Outage[];
}

export interface SiteService {
  getSiteInfo(siteId: string): Promise<SiteInfo>;
  getOutagesForSite(
    siteInfo: SiteInfo,
    outages: Outage[]
  ): OutageWithDeviceName[];
  postOutagesForSite(
    siteId: string,
    outages: OutageWithDeviceName[]
  ): Promise<void>;
}

export interface OutageReporter {
  reportOutagesForSitePriorToDate(id: string, date: string): void;
}

export type OutageWithDeviceName = Outage & { name: Device["name"] };
