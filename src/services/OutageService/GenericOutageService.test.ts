import GenericOutageService from "./GenericOutageService";
import {
  ApplicationConfig,
  ApplicationConfigService,
  ApplicationLogger,
  HttpClient,
  Outage,
  OutageService,
} from "../../../types/internal";
import AxiosHttpClient from "../AxiosHttpClient/AxiosHttpClient";
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
      await genericOutageService.getAllOutages();
      expect(httpClient.get).toHaveBeenCalledWith(
        applicationConfig.allOutagesPath
      );
    });
  });
});
