// routes/oauth.ts
import { Router } from "express";
import passport from "passport";
import { getCurrentUser } from "../controllers/oauth.controller";
import { Request, Response } from "express";
const router = Router();

// 🔐 구글 로그인 시작
router.get("/login/google", passport.authenticate("google"));

// 🔐 구글 로그인 콜백
router.get(
  "/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect("/"); // 로그인 성공 시 리디렉션
  }
);

// 로그인된 사용자 정보
router.get("/me", getCurrentUser);

export default router;
