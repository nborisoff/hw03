import { req } from "./test-helpers";
import { ADMIN_AUTH } from "../src/controllers/posts/middlewares";
import { SETTINGS } from "../src/app/settings";
import {connectToDB, postCollection} from "../src/db/mongo-db";

// console.log(process.env.NODE_ENV);
describe("/post", () => {
  beforeAll(async () => {
    await connectToDB();
    await req.delete(`${SETTINGS.PATH.TESTING}/all-data`).set({ Authorization: "Basic " + codedAuth }).expect(204);
  });

  const buff2 = Buffer.from(ADMIN_AUTH, "utf8");
  const codedAuth = buff2.toString("base64");

  it("should get empty array", async () => {
    const res = await req
      .get(SETTINGS.PATH.POSTS)
      .expect(200);

    // console.log(res.body)

    // expect(res.body.length).toBe(0)
  });

  it("should create post", async () => {
    await postCollection.drop();

    const newPost = {
      title: "testT",
      shortDescription: "testSD",
      content: "testC",
      blogId: "66150620eb42d5165c1214e4",
    };

    await req
      .post(SETTINGS.PATH.POSTS)
      .set({ Authorization: "Basic " + codedAuth })
      .send(newPost)
      .expect(201);
  });

  it(`should update post`, async () => {
    await req
      .put(`${SETTINGS.PATH.POSTS}/1`)
      .set({ Authorization: "Basic " + codedAuth })
      .send({
        title: "testP2",
        shortDescription: "testSD2",
        content: "testC2",
        blogId: "2",
      })
      .expect(204);
  });

  it("should return 404 after trying deleting non-existent post", async () => {
    await req
      .delete(`${SETTINGS.PATH.POSTS}/9999`)
      .set({ Authorization: "Basic " + codedAuth })
      .expect(404);
  });

  it("should return 404 after deleting post", async () => {
    await req
      .delete(`${SETTINGS.PATH.POSTS}/1`)
      .set({ Authorization: "Basic " + codedAuth })
      .expect(204);
    await req.get(`${SETTINGS.PATH.POSTS}/1`).expect(404);
  });

  // it("should return empty array after deleting", async () => {
  //   await req.delete(`${SETTINGS.PATH.TESTING}/all-data`).set({ Authorization: "Basic " + codedAuth }).expect(204);
  // });
});
