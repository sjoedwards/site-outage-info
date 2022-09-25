import ConfigService from "../Config/ConfigService";
import AxiosHttpClient from "./AxiosHttpClient";
import axios from "axios";
import { COMMON_CONSTANTS } from "../../constants";
import { ApplicationConfig } from "../../../types/internal";

jest.mock("axios");

describe("AxiosHttpClient Class - unit tests", () => {
  let axiosHttpClient: AxiosHttpClient;
  let configService: ConfigService;
  let apiKey: string;
  let baseUrl: string;
  let testPath: string;
  let testPayload: unknown;
  beforeEach(() => {
    apiKey = "test-api-key";
    baseUrl = "http://base-url";
    configService = new ConfigService({ apiKey, baseUrl } as ApplicationConfig);
    axiosHttpClient = new AxiosHttpClient(configService);
    testPath = "/testpath";
    testPayload = { testPayload: "test" };
  });

  afterEach(() => {
    jest.restoreAllMocks;
  });

  it("Get: Calls the correct url when getting a resource", async () => {
    await axiosHttpClient.get(testPath);
    expect(axios.get).toHaveBeenCalledWith(
      `${baseUrl}${testPath}`,
      expect.anything()
    );
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
      headers: { [COMMON_CONSTANTS.HEADERS.X_API_KEY]: apiKey },
    });
  });

  it("Post: Calls the correct url when posting a resource", async () => {
    await axiosHttpClient.post(testPath, testPayload);
    expect(axios.post).toHaveBeenCalledWith(
      `${baseUrl}${testPath}`,
      testPayload,
      expect.anything()
    );
  });

  it("Post: Returns the correct response when getting a resource", async () => {
    const testResponse = { response: "test" };
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: testResponse,
    });
    const response = await axiosHttpClient.post<{ response: string }, unknown>(
      testPath,
      testPayload
    );
    expect(response).toEqual(testResponse);
  });

  it("Post: Sends the configured api key by default", async () => {
    await axiosHttpClient.post<{ response: string }, unknown>(
      testPath,
      testPayload
    );
    expect(axios.post).toHaveBeenCalledWith(
      `${baseUrl}${testPath}`,
      testPayload,
      {
        headers: { [COMMON_CONSTANTS.HEADERS.X_API_KEY]: apiKey },
      }
    );
  });
});
