import { ErrorCodeEnum, ErrorCodeEnumType } from "./enums/error-code.enum";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import session from "cookie-session";
import { config } from "./config/app.config";
import connectDatabase from "./config/database.config";
import { errorHandler } from "./middleware/errorHandler";
import { BadRequestException } from "./utils/appError";
import "./config/passport.config";
import passport from "passport";
import authRoutes from "./routes/auth.route";

const app = express();
const BASE_PATH = config.BASE_PATH;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: "session",
    keys: [config.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000,
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
  })
);

app.use(
  cors({
    origin: config.FRONTEND_ORIGIN,
    credentials: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(`/`, (req: Request, res: Response, next: NextFunction) => {
  // throw new BadRequestException(
  //   "Bad Request",
  //   ErrorCodeEnum.INTERNAL_SERVER_ERROR
  // );

  res.send("Hello From Node JS With Express AND Typescript Starter ");
});

app.use(`${BASE_PATH}/auth`, authRoutes);

app.use(errorHandler);
app.listen(config.PORT, async () => {
  console.log(`Server listening on port ${config.PORT} in ${config.NODE_ENV}`);
  await connectDatabase();
});
