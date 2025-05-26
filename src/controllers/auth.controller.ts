import { NextFunction, Request, Response } from "express";
import { config } from "../config/app.config";
import { HTTPSTATUS } from "../config/http.config";
import passport from "passport";
import { asyncHandler } from "../middleware/asyncHandler";

export const googleLoginCallback = asyncHandler(
  async (req: Request, res: Response) => {
    const currentWorkspace = req.user?.currentWorkspace;

    if (!currentWorkspace) {
      return res.redirect(
        `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`
      );
    }

    return res.redirect(
      `${config.FRONTEND_ORIGIN}/workspace/${currentWorkspace}`
    );
  }
);
