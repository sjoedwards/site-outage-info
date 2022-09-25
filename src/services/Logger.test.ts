import { ApplicationLogger } from "../../types/internal";
import Logger from "./Logger";

describe("Logger Class - unit tests", () => {
  let instance: ApplicationLogger;
  let warnSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;
  let infoSpy: jest.SpyInstance;

  beforeEach(() => {
    infoSpy = jest.spyOn(global.console, "info");
    warnSpy = jest.spyOn(global.console, "warn");
    errorSpy = jest.spyOn(global.console, "error");
    instance = new Logger();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it("should call the info method with the expected arguments", () => {
    const payload = { a: "a", b: { c: "c" } };
    instance.info("this is a message", payload);
    expect(infoSpy).toHaveBeenCalledWith("this is a message", payload);
  });

  it("should call the warn method with the expected arguments", () => {
    const payload = { a: "a", b: { c: "c" } };
    instance.warn("this is a message", payload);
    expect(warnSpy).toHaveBeenCalledWith("this is a message", payload);
  });
  it("should call the error method with the expected arguments", () => {
    const payload = { a: "a", b: { c: "c" } };
    instance.error("this is a message", payload);
    expect(errorSpy).toHaveBeenCalledWith("this is a message", payload);
  });
});
