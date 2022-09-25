import { ApplicationConfigService, HttpClient } from "../../../types/internal";

class AxiosHttpClient implements HttpClient {
  private apiKey;
  constructor(configService: ApplicationConfigService) {
    this.apiKey = "";
  }
  get<T>(path: string) {
    return undefined as T;
  }

  post<T>() {
    return undefined as T;
  }
}

export default AxiosHttpClient;
