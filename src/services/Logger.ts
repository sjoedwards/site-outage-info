import { ApplicationLogger } from "../../types/internal";

class Logger implements ApplicationLogger {
  info(message: string, payload: unknown): void {
    console.info(message, payload);
  }
  warn() {
    return;
  }
  error() {
    return;
  }
}

export default Logger;
