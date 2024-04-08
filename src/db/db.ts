import { VideoDBType } from "../types/videos";
import { PostDBType } from "../types/posts";
import { BlogDBType } from "../types/blogs";

export type DBType = {
  videos: VideoDBType[];
  posts: PostDBType[];
  blogs: BlogDBType[];
};

export const db: DBType = {
  videos: [],
  posts: [],
  blogs: [],
};

export const setDB = (
  endpoint: keyof DBType,
  dataset?: DBType[keyof DBType],
) => {
  if (!dataset) {
    db.videos = [];
    db.posts = [];
    db.blogs = [];
    return;
  }
// разобраться с типом
  db[endpoint] = dataset as any;
};
