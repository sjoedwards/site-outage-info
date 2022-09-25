import { outageFactory } from "../../../test/factories/outage.factory";
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
    it("gets site infomation given a valid id", async () => {
      const siteInfo = await genericSiteService.getSiteInfo(mockSiteInfo.id);
      expect(httpClient.get).toHaveBeenCalledWith(
        `${applicationConfig.siteInfoPath}/${mockSiteInfo.id}`
      );
      expect(siteInfo).toEqual(mockSiteInfo);
    });
  });
  describe("getOutagesForSite", () => {
    it("omits any outages which do not match devices for a specific site", () => {
      const matchingDevice1 = { id: "1", name: "device-1" };
      const matchingOutage1 = outageFactory({ id: matchingDevice1.id });
      const matchingDevice2 = { id: "2", name: "device-2" };
      const matchingOutage2 = outageFactory({ id: matchingDevice2.id });
      const nonMatchingOutage = outageFactory({ id: "3" });
      const mockOutages = [matchingOutage1, matchingOutage2, nonMatchingOutage];
      mockSiteInfo = siteInfoFactory({
        devices: [matchingDevice1, matchingDevice2],
      });
      const outagesForSite = genericSiteService.getOutagesForSite(
        mockSiteInfo,
        mockOutages
      );
      expect(outagesForSite).toEqual([
        { ...matchingOutage1, name: matchingDevice1.name },
        { ...matchingOutage2, name: matchingDevice2.name },
      ]);
    });
  });
  describe("postOutagesForSite", () => {
    it("calls the httpClient post method with an array of outages for a specific site", async () => {
      const outagesForSite = [
        {
          ...outageFactory({ id: "1" }),
          name: "device-1",
        },
        {
          ...outageFactory({ id: "1" }),
          name: "device-2",
        },
      ];
      const siteInfo = await genericSiteService.postOutagesForSite(
        mockSiteInfo.id,
        outagesForSite
      );
      expect(httpClient.post).toHaveBeenCalledWith(
        `${applicationConfig.siteOutagePath}/${mockSiteInfo.id}`,
        outagesForSite
      );
      expect(siteInfo).toEqual(mockSiteInfo);
    });
  });
});
