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
  getOutagesForSite(site: SiteInfo, outages: Outage[]): OutageWithDeviceName[] {
    const normalisedDevices = site.devices.reduce<Record<string, string>>(
      (acc, device) => {
        return { ...acc, [device.id]: device.name };
      },
      {}
    );

    const matchingOutages = outages
      .map((outage) => {
        const matchingDevice = normalisedDevices[outage.id];
        if (matchingDevice) {
          return {
            ...outage,
            name: matchingDevice,
          };
        }
      })
      .filter(
        (
          outage: OutageWithDeviceName | undefined
        ): outage is OutageWithDeviceName => {
          return !!outage;
        }
      );

    return matchingOutages;
  }
  async postOutagesForSite(
    siteId: string,
    outages: OutageWithDeviceName[]
  ): Promise<void> {
    await this.httpClient.post(`${this.siteOutagePath}/${siteId}`, outages);
    return;
  }
}

export default GenericSiteService;
