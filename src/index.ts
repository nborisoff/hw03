import { Request, Response } from "express";
import { SETTINGS } from "./app/settings";
import { app } from "./app/app";
import { connectToDB } from "./db/mongo-db";

const start = async () => {
  app.get("/", (req: Request, res: Response) => {
    res.send("Hello Samurai!");
  });

  if (!(await connectToDB())) {
    console.log("stop");
    process.exit(1);
    return;
  }

  app.listen(SETTINGS.PORT, () => {
    console.log(`App listening on port ${SETTINGS.PORT}`);
  });
};
start();

export default app;
