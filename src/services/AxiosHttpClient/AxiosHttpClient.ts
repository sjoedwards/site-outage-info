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
  async get<T>(path: string, config: HttpOptions = { sendApiKey: true }) {
    const response = await axios.get<T>(`${this.baseUrl}${path}`, {
      headers: {
        [COMMON_CONSTANTS.HEADERS.X_API_KEY]: this.apiKey,
      },
    });

    return response?.data;
  }

  post<T>() {
    return undefined as T;
  }
}

export default AxiosHttpClient;
