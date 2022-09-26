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
    const outages = this.outageService.getAllOutages();
    return;
  }
}

export default GenericOutageReporterService;
