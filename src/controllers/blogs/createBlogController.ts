import { Request, Response } from "express";
import { blogRepository } from "./blogRepository";

export const createBlog = async (req: Request, res: Response) => {
  const createdBlog = await blogRepository.create(req.body);

  if (!createdBlog.id) {
    res.status(500).json({});
    return;
  }

  const newBlog = await blogRepository.findForOutput(createdBlog.id);

  res.status(201).json(newBlog);
};
