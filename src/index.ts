import { ApplicationConfig } from "../types/internal";
import AxiosHttpClient from "./services/AxiosHttpClient/AxiosHttpClient";
import ConfigService from "./services/Config/ConfigService";
import Logger from "./services/Logger/LoggerService";
import GenericOutageReporterService from "./services/OutageReporter/OutageReporterService";
import GenericOutageService from "./services/OutageService/GenericOutageService";
import GenericSiteService from "./services/SiteService/GenericSiteService";
import * as dotenv from "dotenv";
dotenv.config();

// Dependencies
const siteId = "norwich-pear-tree";
const filterDateTime = `2022-01-01T00:00:00.000Z`;
const config: ApplicationConfig = {
  apiKey: process.env["API_KEY"] || "",
  baseUrl: process.env["BASE_URL"] || "",
  allOutagesPath: "/outages",
  siteInfoPath: "/site-info",
  siteOutagePath: "/site-outages",
};

const logger = new Logger();
const configService = new ConfigService(config);
const httpClient = new AxiosHttpClient(configService);
const outageService = new GenericOutageService(
  logger,
  httpClient,
  configService
);
const siteService = new GenericSiteService(logger, httpClient, configService);
const outageReporterService = new GenericOutageReporterService(
  logger,
  outageService,
  siteService
);
const main = async () => {
  try {
    await outageReporterService.reportOutagesForSitePriorToDate(
      siteId,
      filterDateTime
    );
  } catch (e) {
    process.exit(1);
  }
  process.exit(0);
};

(async () => {
  await main();
})();
