import { Response } from "express";
import { RequestWithParams } from "../../types/common-types";
import { HTTP_STATUSES } from "../../app/settings";
import { BlogIdModel } from "../../models/blogs";
import { blogRepository } from "./blogRepository";
import { ObjectId } from "mongodb";

export const findBlog = async (
  req: RequestWithParams<BlogIdModel>,
  res: Response,
) => {
  let foundBlog = await blogRepository.findForOutput(new ObjectId(req.params.id));

  if (!foundBlog) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  res.status(HTTP_STATUSES.OK_200).json(foundBlog);
};
