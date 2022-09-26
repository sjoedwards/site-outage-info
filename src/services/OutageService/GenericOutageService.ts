import {
  ApplicationConfigService,
  ApplicationLogger,
  HttpClient,
  Outage,
  OutageService,
} from "../../../types/internal";

class GenericOutageService implements OutageService {
  private allOutagesPath: string;
  constructor(
    private logger: ApplicationLogger,
    private httpClient: HttpClient,
    configService: ApplicationConfigService
  ) {
    this.allOutagesPath = configService.get("allOutagesPath");
  }

  async getAllOutages(): Promise<Outage[]> {
    const outages = await this.httpClient.get<Outage[]>(this.allOutagesPath);
    return outages;
  }

  filterOutagesPriorToDateTime(outages: Outage[], filterDate: Date): Outage[] {
    return outages.filter((outage) => new Date(outage.begin) >= filterDate);
  }
}

export default GenericOutageService;
