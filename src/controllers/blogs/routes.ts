import { Router } from "express";
import { getBlogs } from "./getBlogsController";
import { authMiddleware } from "../posts/middlewares";
import { createBlog } from "./createBlogController";
import { blogInputValidators, inputCheckErrorsMiddleware } from "./middlewares";
import { findBlog } from "./findBlogController";
import { updateBlog } from "./updateBlogController";
import { deleteBlog } from "./deleteBlogController";

export const blogRouter = Router();

blogRouter.get("/", getBlogs);
blogRouter.post(
  "/",
  authMiddleware,
  ...blogInputValidators,
  inputCheckErrorsMiddleware,
  createBlog,
);
blogRouter.get("/:id", findBlog);
blogRouter.put(
  "/:id",
  authMiddleware,
  ...blogInputValidators,
  inputCheckErrorsMiddleware,
  updateBlog,
);
blogRouter.delete("/:id", authMiddleware, deleteBlog);
