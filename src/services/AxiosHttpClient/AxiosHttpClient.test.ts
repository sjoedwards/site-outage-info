import ConfigService from "../Config/ConfigService";
import AxiosHttpClient from "./AxiosHttpClient";
import axios from "axios";

jest.mock("axios");

describe("AxiosHttpClient Class - unit tests", () => {
  let axiosHttpClient: AxiosHttpClient;
  let configService: ConfigService;
  let apiKey: string;
  let baseUrl: string;
  let testPath: string;
  beforeEach(() => {
    apiKey = "test-api-key";
    baseUrl = "http://base-url";
    configService = new ConfigService({ apiKey, baseUrl });
    axiosHttpClient = new AxiosHttpClient(configService);
    testPath = "/testpath";
  });

  it("Calls the correct url when getting a resource", async () => {
    await axiosHttpClient.get(testPath);
    expect(axios.get).toHaveBeenCalledWith(`${baseUrl}${testPath}`);
  });
});
