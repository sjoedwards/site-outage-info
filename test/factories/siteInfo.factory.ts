import { SiteInfo } from "../../types/internal";
import merge from "lodash/merge";
export const siteInfoFactory = (siteInfo?: Partial<SiteInfo>): SiteInfo => {
  return merge(
    {
      id: "pear-tree",
      name: "Pear Tree",
      devices: [
        {
          id: "44c02564-a229-4f51-8ded-cc7bcb202566",
          name: "Partridge",
        },
      ],
    },
    siteInfo
  );
};
