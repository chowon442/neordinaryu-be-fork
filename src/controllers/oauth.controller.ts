// src/controllers/auth.controller.ts
import { Request, Response } from "express";

export const getCurrentUser = (req: Request, res: Response): void => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
  }

  res.json(req.user);
};
