import { Response } from "express";
import { RequestWithParams } from "../../types/common-types";
import { HTTP_STATUSES } from "../../app/settings";
import { PostIdModel } from "../../models/posts";
import { ObjectId } from "mongodb";
import { postRepository } from "./postRepository";

export const findPost = async (
  req: RequestWithParams<PostIdModel>,
  res: Response,
) => {
  let foundPost = await postRepository.findForOutput(
    new ObjectId(req.params.id),
  );

  if (!foundPost) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  res.status(HTTP_STATUSES.OK_200).json(foundPost);
};
