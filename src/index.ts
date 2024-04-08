import express, { Request, Response } from "express";
import { SETTINGS } from "./app/settings";
import { connectToDB } from "./db/mongo-db";
import cors from "cors";
import {blogRouter} from "./controllers/blogs/routes";
import {postRouter} from "./controllers/posts/routes";


export const app = express();

const start = async () => {
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello Samurai!");
  });

  if (!(await connectToDB())) {
    console.log("stop");
    process.exit(1);
    return;
  }
  const parseBodyMiddleware = express.json();
  app.use(parseBodyMiddleware);
  app.use(cors());

  app.use(SETTINGS.PATH.BLOGS, blogRouter);
  app.use(SETTINGS.PATH.POSTS, postRouter);

  app.listen(SETTINGS.PORT, () => {
    console.log(`App listening on port ${SETTINGS.PORT}`);
  });
};
start();
