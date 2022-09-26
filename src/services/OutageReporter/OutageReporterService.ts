import {
  OutageService,
  ApplicationLogger,
  SiteService,
  OutageReporterService,
} from "../../../types/internal";

class GenericOutageReporterService implements OutageReporterService {
  constructor(
    private logger: ApplicationLogger,
    private outageService: OutageService,
    private siteService: SiteService
  ) {}
  async reportOutagesForSitePriorToDate(
    siteId: string,
    date: string
  ): Promise<void> {
    const outages = await this.outageService.getAllOutages();
    const outageDate = new Date(date);
    const filteredOutages = this.outageService.filterOutagesPriorToDateTime(
      outages,
      outageDate
    );
    const siteInfo = await this.siteService.getSiteInfo(siteId);
    const outagesForSite = this.siteService.getOutagesForSite(
      siteInfo,
      filteredOutages
    );
    await this.siteService.postOutagesForSite(siteId, outagesForSite);
    return;
  }
}

export default GenericOutageReporterService;
