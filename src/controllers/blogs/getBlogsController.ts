import { Request, Response } from "express";
import { HTTP_STATUSES } from "../../app/settings";
import { blogCollection } from "../../db/mongo-db";
import {blogRepository} from "./blogRepository";

export const getBlogs = async (req: Request, res: Response) => {
  const foundBlogs = await blogCollection.find({}).toArray();
  const outputBlogs = foundBlogs.map((blog) => blogRepository.mapToOutput(blog));

  res
    .status(HTTP_STATUSES.OK_200)
    .json(outputBlogs);
};
