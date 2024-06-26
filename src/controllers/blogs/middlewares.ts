import { Router, Response, Request, NextFunction } from "express";
import {
  body,
  FieldValidationError,
  validationResult,
} from "express-validator";
import { blogRepository } from "./blogRepository";

const blogNameInputValidator = body("name")
  .exists()
  .withMessage("field not exist")
  .isString()
  .withMessage("not string")
  .trim()
  .notEmpty()
  .withMessage("field is empty")
  .isLength({ max: 15 })
  .withMessage("length limit exceeded");
const blogDescriptionInputValidator = body("description")
  .exists()
  .withMessage("field not exist")
  .isString()
  .withMessage("not string")
  .trim()
  .notEmpty()
  .withMessage("field is empty")
  .withMessage("not string")
  .isLength({ max: 500 })
  .withMessage("length limit exceeded");
const blogUrlInputValidator = body("websiteUrl")
  .exists()
  .withMessage("field not exist")
  .isString()
  .withMessage("not string")
  .isLength({ max: 100 })
  .withMessage("length limit exceeded")
  .matches(
    /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/,
  )
  .withMessage("wrong pattern");

export const blogInputValidators = [
  blogNameInputValidator,
  blogDescriptionInputValidator,
  blogUrlInputValidator,
];

export const blogUpdateValidator = body("blogId").custom(
  async (blogId, { req }) => {
    const blog = await blogRepository.find(blogId);
    if (!blog) {
      new Error("no blog!");
    }
    return blog;
  },
);

export const inputCheckErrorsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const e = validationResult(req);
  const errors = e.array({ onlyFirstError: true });

  if (errors.length) {
    res.status(400).json({
      errorsMessages: errors.map((error) => {
        const { msg, path } = error as FieldValidationError;
        return { message: `${path} error`, field: path };
      }),
    });
    return;
  }

  next();
};

export const ADMIN_AUTH = "admin:qwerty"; // get from SETTINGS
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const auth = req.headers["authorisation"] as string; // 'Basic xxxx'

  if (!auth) {
    res.status(401).json({});
    return;
  }
  const buff = Buffer.from(auth.slice(6), "base64");
  const decodedAuth = buff.toString("utf8");

  const buff2 = Buffer.from(ADMIN_AUTH, "utf8");
  const codedAuth = buff2.toString("base64");

  // if (decodedAuth !== ADMIN_AUTH || auth.slice(0, 5) !== 'Basic ') {
  if (auth.slice(6) !== codedAuth || auth.slice(0, 5) !== "Basic") {
    res.status(401).json({});
    return;
  }

  next();
};
