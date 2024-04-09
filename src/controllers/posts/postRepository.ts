import { PostDBType, PostInputType } from "../../models/posts";
import { ObjectId } from "mongodb";
import { postCollection } from "../../db/mongo-db";
import { blogRepository } from "../blogs/blogRepository";

export const postRepository = {
  async create(input: PostInputType) {
    const blogName = await blogRepository.find(new ObjectId(input.blogId));

    if (!blogName) {
      return { error: "Invalid blogId" };
    }

    const newPost = {
      ...input,
      blogName: blogName.name,
      createdAt: new Date().toISOString(),
      _id: new ObjectId(),
    };

    try {
      const insertedInfo = await postCollection.insertOne(newPost);
      return { id: new ObjectId(insertedInfo.insertedId) };
    } catch (e) {
      console.log(e);
      return { error: "e" };
    }
  },
  async find(id: ObjectId) {
    return await postCollection.findOne({ _id: id });
  },
  async update(id: ObjectId, body: PostInputType) {
    const result = await postCollection.updateOne({ _id: id }, { $set: body });
    return Boolean(result.modifiedCount);
  },
  async delete(id: ObjectId) {
    const result = await postCollection.deleteOne({ _id: id });

    return Boolean(result.deletedCount);
  },
  async findForOutput(id: ObjectId) {
    const post = await this.find(id);
    if (!post) {
      return null;
    }
    return this.mapToOutput(post);
  },
  mapToOutput(post: PostDBType) {
    const {
      _id,
      title,
      shortDescription,
      content,
      blogId,
      blogName,
      createdAt,
    } = post;

    return {
      id: _id,
      title,
      shortDescription,
      content,
      blogId,
      blogName,
      createdAt,
    };
  },
};
