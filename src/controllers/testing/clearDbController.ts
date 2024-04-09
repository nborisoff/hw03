import { Request, Response } from "express";
import { HTTP_STATUSES } from "../../app/settings";
import { blogCollection, postCollection } from "../../db/mongo-db";

export const clearDb = async (req: Request, res: Response) => {
  await blogCollection.deleteMany({});
  await postCollection.deleteMany({});
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
};
