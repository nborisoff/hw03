import { Request, Response } from "express";
import { HTTP_STATUSES } from "../../app/settings";
import { postCollection } from "../../db/mongo-db";

export const getPosts = async (req: Request, res: Response) => {
  res
    .status(HTTP_STATUSES.OK_200)
    .json(await postCollection.find({}).toArray());
};
