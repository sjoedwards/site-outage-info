import axios from "axios";
import { ApplicationConfigService, HttpClient } from "../../../types/internal";

class AxiosHttpClient implements HttpClient {
  private apiKey;
  private baseUrl;
  constructor(configService: ApplicationConfigService) {
    this.apiKey = "";
    this.baseUrl = configService.get("baseUrl");
  }
  async get<T>(path: string) {
    const response = await axios.get<T>(`${this.baseUrl}${path}`);

    return response?.data;
  }

  post<T>() {
    return undefined as T;
  }
}

export default AxiosHttpClient;
