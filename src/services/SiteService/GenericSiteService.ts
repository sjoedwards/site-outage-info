import {
  ApplicationConfigService,
  ApplicationLogger,
  HttpClient,
  Outage,
  OutageWithDeviceName,
  SiteInfo,
  SiteService,
} from "../../../types/internal";

class GenericSiteService implements SiteService {
  private siteInfoPath: string;
  private siteOutagePath: string;
  constructor(
    logger: ApplicationLogger,
    httpClient: HttpClient,
    configService: ApplicationConfigService
  ) {
    this.siteInfoPath = configService.get("siteInfoPath");
    this.siteOutagePath = configService.get("siteOutagePath");
  }

  getSiteInfo(siteId: string): SiteInfo {
    return {} as SiteInfo;
  }
  getOutagesForSite(siteId: string, outages: Outage[]): OutageWithDeviceName[] {
    return [];
  }
  postOutagesForSite(siteId: string, outages: OutageWithDeviceName[]): void {
    return;
  }
}

export default GenericSiteService;
