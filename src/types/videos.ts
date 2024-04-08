import { RESOLUTIONS } from "../const/videos";

export type VideoDBType = {
  id: number;
  title: string;
  author: string;
  availableResolutions: RESOLUTIONS[] | null;
  canBeDownloaded?: boolean;
  minAgeRestriction?: number | null;
  createdAt?: string;
  publicationDate?: string;
};
