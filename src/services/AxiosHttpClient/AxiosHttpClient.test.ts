import ConfigService from "../Config/ConfigService";
import AxiosHttpClient from "./AxiosHttpClient";
import axios from "axios";
import { COMMON_CONFIG } from "../../constants";

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

  afterEach(() => {
    jest.restoreAllMocks;
  });

  it("Get: Calls the correct url when getting a resource", async () => {
    await axiosHttpClient.get(testPath);
    expect(axios.get).toHaveBeenCalledWith(`${baseUrl}${testPath}`);
  });

  it("Get: Returns the correct response when getting a resource", async () => {
    const testResponse = { response: "test" };
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: testResponse,
    });
    const response = await axiosHttpClient.get<{ response: string }>(testPath);
    expect(response).toEqual(testResponse);
  });

  it("Get: Sends the configured api key by default", async () => {
    await axiosHttpClient.get<{ response: string }>(testPath);
    expect(axios.get).toHaveBeenCalledWith(`${baseUrl}${testPath}`, {
      headers: { [COMMON_CONFIG.HEADERS.X_API_KEY]: apiKey },
    });
  });

  // TODO auth
});
