import {
  ApplicationConfig,
  ApplicationConfigService,
} from "../../../types/internal";

class ConfigService implements ApplicationConfigService {
  constructor(private config: ApplicationConfig) {}
  get(key: keyof ApplicationConfig): string {
    return this.config[key];
  }
}

export default ConfigService;
