import { Request, Response } from "express";
import { HTTP_STATUSES } from "../../app/settings";
import { blogCollection } from "../../db/mongo-db";

export const getBlogs = async (req: Request, res: Response) => {
  res
    .status(HTTP_STATUSES.OK_200)
    .json(await blogCollection.find({}).toArray());
};
