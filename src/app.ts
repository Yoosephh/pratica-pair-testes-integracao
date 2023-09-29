import express from 'express'
import { json, Request, Response } from "express";
import dotenv from "dotenv";
import fruitsRouter from "./routers/fruits-router";

const app = express();
dotenv.config();

app.use(json());

app.get("/health", (req: Request, res: Response) => res.send("ok!"));
app.use(fruitsRouter);
export {app};
