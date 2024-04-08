import { Request, Response } from "express";
import { HTTP_STATUSES } from "../../app/settings";
import { blogRepository } from "./blogRepository";
import { ObjectId } from "mongodb";

export const deleteBlog = async (
  // req: RequestWithParams<BlogIdModel>,
  req: Request,
  res: Response,
) => {
  let foundBlog = await blogRepository.find(new ObjectId(req.params.id));

  if (!foundBlog) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  let deletedBlog = await blogRepository.delete(foundBlog._id);

  if (!deletedBlog) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
};
