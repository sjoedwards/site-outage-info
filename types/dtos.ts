export type GetOutagesDTO = {
  id: string;
  begin: string;
  end: string;
}[];

export type GetSiteInfoDTO = {
  id: string;
  name: string;
  devices: {
    id: string;
    name: string;
  }[];
};

export type PostSiteInfoDTO = {
  id: string;
  name: string;
  begin: string;
  end: string;
}[];
