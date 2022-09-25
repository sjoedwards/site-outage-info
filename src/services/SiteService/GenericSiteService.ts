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
    private logger: ApplicationLogger,
    private httpClient: HttpClient,
    configService: ApplicationConfigService
  ) {
    this.siteInfoPath = configService.get("siteInfoPath");
    this.siteOutagePath = configService.get("siteOutagePath");
  }

  async getSiteInfo(siteId: string): Promise<SiteInfo> {
    const siteInfo = await this.httpClient.get<SiteInfo>(
      `${this.siteInfoPath}/${siteId}`
    );
    return siteInfo;
  }
  async getOutagesForSite(
    siteId: string,
    outages: Outage[]
  ): Promise<OutageWithDeviceName[]> {
    return [];
  }
  async postOutagesForSite(
    siteId: string,
    outages: OutageWithDeviceName[]
  ): Promise<void> {
    return;
  }
}

export default GenericSiteService;
