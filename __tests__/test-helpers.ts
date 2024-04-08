import { agent } from "supertest";
import { app } from "../src/app/app";

export const req = agent(app);
