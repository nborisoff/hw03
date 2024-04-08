import { authMiddleware, postInputValidators } from "./middlewares";
import { Router } from "express";
import { getPosts } from "./getPostsController";
import { createPost } from "./createPostController";
import { inputCheckErrorsMiddleware } from "./middlewares";
import { findPost } from "./findPostController";
import { updatePost } from "./updatePostController";
import { deletePost } from "./deletePostController";

export const postRouter = Router();

postRouter.get("/", getPosts);
postRouter.post(
  "/",
  authMiddleware,
  ...postInputValidators,
  inputCheckErrorsMiddleware,
  createPost,
);
postRouter.get("/:id", findPost);
postRouter.put(
  "/:id",
  authMiddleware,
  ...postInputValidators,
  inputCheckErrorsMiddleware,
  updatePost,
);
postRouter.delete("/:id", authMiddleware, deletePost);
