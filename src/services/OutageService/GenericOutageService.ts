import {
  ApplicationConfigService,
  HttpClient,
  Outage,
  OutageService,
} from "../../../types/internal";
import Logger from "../Logger/LoggerService";

class GenericOutageService implements OutageService {
  private allOutagesPath: string;
  constructor(
    private logger: Logger,
    private httpClient: HttpClient,
    configService: ApplicationConfigService
  ) {
    this.allOutagesPath = configService.get("allOutagesPath");
  }

  async getAllOutages(): Promise<Outage[]> {
    const outages = await this.httpClient.get<Outage[]>(this.allOutagesPath);
    return outages;
  }

  filterOutagesPriorToDateTime(outages: Outage[], date: Date): Outage[] {
    return [];
  }
}

export default GenericOutageService;
