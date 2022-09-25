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

  afterEach(() => {
    jest.restoreAllMocks;
  });

  it("Calls the correct url when getting a resource", async () => {
    await axiosHttpClient.get(testPath);
    expect(axios.get).toHaveBeenCalledWith(`${baseUrl}${testPath}`);
  });

  it("Returns the correct response when getting a resource", async () => {
    const testResponse = { response: "test" };
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: testResponse,
    });
    const response = await axiosHttpClient.get<{ response: string }>(testPath);
    expect(response).toEqual(testResponse);
  });

  // TODO auth
});
