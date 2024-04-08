import { Request, Response } from "express";
import { HTTP_STATUSES } from "../../app/settings";
import { postRepository } from "./postRepository";
import { ObjectId } from "mongodb";

export const deletePost = async (
  // req: RequestWithParams<PostIdModel>,
  req: Request,
  res: Response,
) => {
  let foundPost = await postRepository.find(new ObjectId(req.params.id));

  if (!foundPost) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  let deletedPost = await postRepository.delete(foundPost._id);

  if (!deletedPost) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
};
