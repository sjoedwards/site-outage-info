import { outageFactory } from "../../../test/factories/outage.factory";
import { siteInfoFactory } from "../../../test/factories/siteInfo.factory";
import {
  ApplicationConfig,
  ApplicationConfigService,
  ApplicationLogger,
  Outage,
  OutageReporterService,
  OutageService,
  SiteInfo,
  SiteService,
} from "../../../types/internal";
import Logger from "../Logger/LoggerService";
import GenericOutageReporterService from "./OutageReporterService";

describe("GenericOutageReporterService", () => {
  let genericOutageReporterService: OutageReporterService;
  let outageService: OutageService;
  let siteService: SiteService;
  let mockOutages: Outage[];
  let filterDateTime: string;
  let siteId: string;
  let siteInfo: SiteInfo;

  let loggerService: ApplicationLogger;

  beforeEach(() => {
    filterDateTime = "2022-01-01T00:00:00.000Z";
    siteInfo = siteInfoFactory();
    siteId = siteInfo.id;

    mockOutages = [
      outageFactory({ id: "1" }),
      outageFactory({ id: "2" }),
      outageFactory({ id: "3" }),
    ];
    outageService = {
      getAllOutages: jest.fn().mockResolvedValue(mockOutages),
      filterOutagesPriorToDateTime: jest
        .fn()
        .mockReturnValue([mockOutages[0], mockOutages[1]]),
    };
    siteService = {
      getSiteInfo: jest.fn().mockResolvedValue(siteInfo),
      getOutagesForSite: jest
        .fn()
        .mockReturnValue([{ ...mockOutages[2], name: "device-name" }]),
      postOutagesForSite: jest.fn().mockResolvedValue(undefined),
    };
    loggerService = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
    genericOutageReporterService = new GenericOutageReporterService(
      loggerService,
      outageService,
      siteService
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("reportOutagesForSitePriorToDate", () => {
    it("gets outage information, gets site outage information and reports it", async () => {
      await genericOutageReporterService.reportOutagesForSitePriorToDate(
        siteId,
        filterDateTime
      );
      expect(outageService.getAllOutages).toHaveBeenCalledTimes(1);
      expect(loggerService.info).toHaveBeenCalledWith(
        `Retrieved ${mockOutages.length} outages`
      );
      expect(outageService.filterOutagesPriorToDateTime).toHaveBeenCalledWith(
        mockOutages,
        new Date(filterDateTime)
      );
      expect(loggerService.info).toHaveBeenCalledWith(
        `2 outages remaining beyond the target dateTime of ${filterDateTime}`
      );

      expect(siteService.getSiteInfo).toHaveBeenCalledWith(siteId);
      expect(loggerService.info).toHaveBeenCalledWith(
        `siteInfo retrieved`,
        siteInfo
      );
      expect(siteService.getOutagesForSite).toHaveBeenCalledWith(siteInfo, [
        mockOutages[0],
        mockOutages[1],
      ]);
      expect(loggerService.info).toHaveBeenCalledWith(
        `outages for ${siteInfo.id} retrieved`,
        [{ ...mockOutages[2], name: "device-name" }]
      );
      expect(siteService.postOutagesForSite).toHaveBeenCalledWith(siteId, [
        { ...mockOutages[2], name: "device-name" },
      ]);
      expect(loggerService.info).toHaveBeenCalledWith(
        `outage info for 1 outage for site ${siteInfo.id} posted successfully`
      );
    });
  });
});
