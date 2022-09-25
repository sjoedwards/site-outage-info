import { ApplicationLogger } from "../../types/internal";

class Logger implements ApplicationLogger {
  info(message: string, payload: unknown): void {
    console.info(message, payload);
    return;
  }
  warn(message: string, payload: unknown): void {
    console.warn(message, payload);
    return;
  }
  error(message: string, payload: unknown): void {
    console.error(message, payload);
    return;
  }
}

export default Logger;
