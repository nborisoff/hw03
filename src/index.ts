import express, { Request, Response } from "express";
import { SETTINGS } from "./app/settings";
import { connectToDB } from "./db/mongo-db";
import cors from "cors";
import { blogRouter } from "./controllers/blogs/routes";
import { postRouter } from "./controllers/posts/routes";
import { testingRouter } from "./controllers/testing/routes";

const app = express();

const parseBodyMiddleware = express.json();
app.use(parseBodyMiddleware);
app.use(cors());

const start = async () => {
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello Samurai!");
  });

  if (!(await connectToDB())) {
    console.log("stop");
    process.exit(1);
    return;
  }

  app.use(SETTINGS.PATH.BLOGS, blogRouter);
  app.use(SETTINGS.PATH.POSTS, postRouter);
  app.use(SETTINGS.PATH.TESTING, testingRouter);

  app.listen(SETTINGS.PORT, () => {
    console.log(`App listening on port ${SETTINGS.PORT}`);
  });
};
start();

export default app;
