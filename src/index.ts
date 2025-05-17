import express from "express";
import sessionMiddleware from "./utils/session";
import passport from "passport";
import oauthRouter from "./routes/oauth";
import { googleStrategy } from "./auth.config";
const app = express();
const port = 3000;
passport.use(googleStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user as Express.User));

app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/oauth2", oauthRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
