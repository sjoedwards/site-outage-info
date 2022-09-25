import {
  ApplicationConfig,
  ApplicationConfigService,
} from "../../../types/internal";
import ConfigService from "./ConfigService";

describe("Config Service - unit tests", () => {
  let config: ApplicationConfig;
  let configService: ApplicationConfigService;
  beforeEach(() => {
    config = {
      apiKey: "test-api-key",
      baseUrl: "test-base-url",
    };
    configService = new ConfigService(config);
  });
  it("Allows retrieval of passed config options using config.get", () => {
    const apiKey = configService.get("apiKey");
    expect(apiKey).toEqual(config.apiKey);
  });
});
