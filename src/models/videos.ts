import { type VideoDBType } from "../types/videos";

export type InputVideoType = {
  title: string;
  author: string;
  availableResolutions?: VideoDBType["availableResolutions"];
};

export type VideoIdModel = {
  /**
   * id существующего курса
   */
  id: string;
};

export type UpdateVideoModel = Pick<
  InputVideoType,
  "title" | "author" | "availableResolutions"
> & {
  canBeDownloaded?: boolean;
  minAgeRestriction?: number;
  publicationDate?: string;
};

export type OutputVideoType = {};
export type OutputErrorsType = {
  errorsMessages: { message: string; field: string }[];
};
