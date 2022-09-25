import { siteInfoFactory } from "../../../test/factories/siteInfo.factory";
import {
  ApplicationConfig,
  ApplicationConfigService,
  ApplicationLogger,
  HttpClient,
  SiteInfo,
  SiteService,
} from "../../../types/internal";
import ConfigService from "../Config/ConfigService";
import Logger from "../Logger/LoggerService";
import GenericSiteService from "./GenericSiteService";

describe("GenericSiteService", () => {
  let httpClient: HttpClient;
  let configService: ApplicationConfigService;
  let loggerService: ApplicationLogger;
  let applicationConfig: ApplicationConfig;
  let genericSiteService: SiteService;
  let mockSiteInfo: SiteInfo;

  beforeEach(() => {
    applicationConfig = {
      siteInfoPath: "/site-info",
      siteOutagePath: "/site-outage",
    } as ApplicationConfig;
    configService = new ConfigService(applicationConfig);
    loggerService = new Logger();
    mockSiteInfo = siteInfoFactory();
    httpClient = {
      get: jest.fn().mockResolvedValue(mockSiteInfo),
      post: jest.fn().mockResolvedValue(undefined),
    };
    genericSiteService = new GenericSiteService(
      loggerService,
      httpClient,
      configService
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("getSite", () => {
    it("gets site infomation given a valid id", () => {
      const siteInfo = genericSiteService.getSiteInfo(mockSiteInfo.id);
      expect(httpClient.get).toHaveBeenCalledWith(
        `${applicationConfig.siteInfoPath}/${mockSiteInfo.id}`
      );
    });
  });
  // describe("getOutagesForSite", () => {});
  // describe("postOutagesForSite", () => {});
});
