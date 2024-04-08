import { Request, Response } from "express";
import { HTTP_STATUSES } from "../../app/settings";
import { postRepository } from "../posts/postRepository";
import { ObjectId } from "mongodb";

export const updatePost = async (
  // req: RequestWithParamsAndBody<PostIdModel, PostInputType>,
  req: Request,
  res: Response,
) => {
  let foundPost = await postRepository.find(new ObjectId(req.params.id));

  if (!foundPost) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  let updatedPost = await postRepository.update(foundPost._id, req.body);

  if (!updatedPost) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
};
