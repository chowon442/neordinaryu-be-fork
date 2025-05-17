import session from "express-session";
import dotenv from "dotenv";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

dotenv.config();

const sessionMiddleware = session({
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // ms
  },
  resave: false,
  saveUninitialized: false,
  secret:
    process.env.EXPRESS_SESSION_SECRET ??
    (() => {
      throw new Error("EXPRESS_SESSION_SECRET is not defined");
    })(),
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000, // ms
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
});

export default sessionMiddleware;
