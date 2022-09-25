import { Outage } from "../../types/internal";
import merge from "lodash/merge";
export const outageFactory = (outage?: Partial<Outage>): Outage => {
  return merge(
    {
      id: "44c02564-a229-4f51-8ded-cc7bcb202566",
      begin: "2022-01-01T00:00:00.000Z",
      end: "2022-01-02T12:01:59.123Z",
    },
    outage
  );
};
