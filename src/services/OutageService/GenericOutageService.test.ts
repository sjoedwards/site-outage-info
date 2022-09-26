import GenericOutageService from "./GenericOutageService";
import {
  ApplicationConfig,
  ApplicationConfigService,
  ApplicationLogger,
  HttpClient,
  Outage,
  OutageService,
} from "../../../types/internal";
import Logger from "../Logger/LoggerService";
import ConfigService from "../Config/ConfigService";
import { outageFactory } from "../../../test/factories/outage.factory";

describe("Generic Outage Service - unit tests", () => {
  let genericOutageService: OutageService;
  let httpClient: HttpClient;
  let configService: ApplicationConfigService;
  let loggerService: ApplicationLogger;
  let applicationConfig: ApplicationConfig;
  let mockOutages: Outage[];
  beforeEach(() => {
    applicationConfig = {
      allOutagesPath: "/all-outages",
    } as ApplicationConfig;
    configService = new ConfigService(applicationConfig);
    loggerService = new Logger();
    mockOutages = [outageFactory()];
    httpClient = {
      get: jest.fn().mockResolvedValue(mockOutages),
      post: jest.fn(),
    };
    genericOutageService = new GenericOutageService(
      loggerService,
      httpClient,
      configService
    );
  });
  describe("getAllOutages", () => {
    it("calls httpClient with the correct path and gets all the available outages", async () => {
      const outages = await genericOutageService.getAllOutages();
      expect(httpClient.get).toHaveBeenCalledWith(
        applicationConfig.allOutagesPath
      );

      expect(outages).toEqual(mockOutages);
    });
  });
  describe("filterOutagesPriorToDateTime", () => {
    it("returns outages only before a passed date-time", async () => {
      const filterDate = new Date("2022-01-01T00:00:00.000Z");
      const outageOnDate = outageFactory({
        id: "1",
        begin: new Date(filterDate).toISOString(),
      });
      const outageAfterDate = outageFactory({
        id: "1",
        begin: new Date("2022-06-25T10:17:36.591Z").toISOString(),
      });
      const outageBeforeDate = outageFactory({
          id: "2",
          begin: new Date(filterDate.getTime() - 1).toISOString(),
        }),
        mockOutages = [outageOnDate, outageAfterDate, outageBeforeDate];
      genericOutageService = new GenericOutageService(
        loggerService,
        httpClient,
        configService
      );
      const filteredDates = genericOutageService.filterOutagesPriorToDateTime(
        mockOutages,
        filterDate
      );
      expect(filteredDates).toEqual([outageOnDate, outageAfterDate]);
    });
  });
});
