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
    try {
      const outages = await this.outageService.getAllOutages();
      this.logger.info(`Retrieved ${outages.length} outages`);
      const outageDate = new Date(date);
      const filteredOutages = this.outageService.filterOutagesPriorToDateTime(
        outages,
        outageDate
      );
      this.logger.info(
        `${filteredOutages.length} outages remaining beyond the target dateTime of ${date}`
      );

      const siteInfo = await this.siteService.getSiteInfo(siteId);
      this.logger.info(`siteInfo retrieved`, siteInfo);
      const outagesForSite = this.siteService.getOutagesForSite(
        siteInfo,
        filteredOutages
      );
      this.logger.info(`outages for ${siteId} retrieved`, outagesForSite);

      await this.siteService.postOutagesForSite(siteId, outagesForSite);
      this.logger.info(
        `outage info for 1 outage for site ${siteId} posted successfully`
      );
      return;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}

export default GenericOutageReporterService;
