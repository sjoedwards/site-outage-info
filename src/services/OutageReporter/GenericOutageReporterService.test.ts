import { outageFactory } from "../../../test/factories/outage.factory";
import { siteInfoFactory } from "../../../test/factories/siteInfo.factory";
import {
  ApplicationConfig,
  ApplicationConfigService,
  ApplicationLogger,
  HttpClient,
  Outage,
  OutageService,
  SiteInfo,
  SiteService,
} from "../../../types/internal";
import ConfigService from "../Config/ConfigService";
import Logger from "../Logger/LoggerService";
import GenericOutageService from "../OutageService/GenericOutageService";

describe("GenericOutageReporterService", () => {
  let outageService: OutageService;
  let siteService: SiteService;
  let mockOutages: Outage[];
  let filterDateTime: string;
  let siteId: string;
  let siteInfo: SiteInfo;

  beforeEach(() => {
    filterDateTime = "2022-01-01T00:00:00.000Z";
    siteId = "test-id";
    siteInfo = siteInfoFactory();

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
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("reportOutagesForSitePriorToDate", () => {
    it("gets outage information, gets site outage information and reports it", () => {
      expect(outageService).toHaveBeenCalledWith(siteId);
    });
  });
});
