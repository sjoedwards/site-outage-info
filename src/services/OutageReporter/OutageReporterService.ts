import {
  OutageReporter,
  OutageService,
  ApplicationLogger,
  SiteService,
} from "../../../types/internal";

class GenericOutageReporterService implements OutageReporter {
  constructor(
    private logger: ApplicationLogger,
    private outageService: OutageService,
    private siteService: SiteService
  ) {}
  reportOutagesForSitePriorToDate(id: string, date: string): void {
    return;
  }
}

export default GenericOutageReporterService;
