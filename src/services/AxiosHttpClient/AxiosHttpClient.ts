import axios from "axios";
import {
  ApplicationConfigService,
  HttpClient,
  HttpOptions,
} from "../../../types/internal";
import { COMMON_CONSTANTS } from "../../constants";

class AxiosHttpClient implements HttpClient {
  private apiKey;
  private baseUrl;
  constructor(configService: ApplicationConfigService) {
    this.apiKey = configService.get("apiKey");
    this.baseUrl = configService.get("baseUrl");
  }
  async get<T>(
    path: string,
    config: HttpOptions = { sendApiKey: true },
    retry = false
  ): Promise<T> {
    const headers: Record<string, string> = {};
    if (config.sendApiKey) {
      headers[COMMON_CONSTANTS.HEADERS.X_API_KEY] = this.apiKey;
    }

    try {
      const response = await axios.get<T>(`${this.baseUrl}${path}`, {
        headers,
      });
      return response?.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status && e.response.status > 499 && !retry) {
          return this.get(path, config, true);
        }
      }
      throw e;
    }
  }

  async post<T, Y>(
    path: string,
    payload: Y,
    config: HttpOptions = { sendApiKey: true },
    retry = false
  ): Promise<T> {
    const headers: Record<string, string> = {};
    if (config.sendApiKey) {
      headers[COMMON_CONSTANTS.HEADERS.X_API_KEY] = this.apiKey;
    }

    try {
      const response = await axios.post<T>(`${this.baseUrl}${path}`, payload, {
        headers,
      });
      return response?.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status && e.response.status > 499 && !retry) {
          return this.post(path, payload, config, true);
        }
      }
      throw e;
    }
  }
}

export default AxiosHttpClient;
