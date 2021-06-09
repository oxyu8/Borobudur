import { BingResBody } from "../../../types";

export interface Methods {
  get: {
    query?: {
      q: string;
    };
    resBody: BingResBody;
  };
}
