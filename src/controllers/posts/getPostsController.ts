import { Request, Response } from "express";
import { HTTP_STATUSES } from "../../app/settings";
import { postCollection } from "../../db/mongo-db";
import { postRepository } from "./postRepository";

export const getPosts = async (req: Request, res: Response) => {
  const foundPosts = await postCollection.find({}).toArray();
  const outputPosts = foundPosts.map((post) =>
    postRepository.mapToOutput(post),
  );

  res.status(HTTP_STATUSES.OK_200).json(outputPosts);
};
