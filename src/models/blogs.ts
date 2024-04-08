import { ObjectId } from "mongodb";

export type BlogDBType = {
  _id: ObjectId;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt?: string;
  isMembership?: boolean;
};

export type BlogIdModel = {
  id: ObjectId;
};

export type BlogInputType = Pick<
  BlogDBType,
  "name" | "description" | "websiteUrl"
>;
