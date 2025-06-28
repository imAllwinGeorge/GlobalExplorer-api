import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { UserRoutes } from "../routes/user.route";
import session from "express-session";
import dotenv from "dotenv";
import { AdminRoutes } from "../routes/admin.route";
import passport from "passport";
import "../passport/passport.statergy";
import path from "path";

dotenv.config();

const app = express();
const userRoutes = new UserRoutes();
const adminRoutes = new AdminRoutes();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

app.use(morgan("tiny"));
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 },
  }),
);

app.use("/uploads", express.static(path.join(__dirname, "multer", "uploads")));
app.use("/uploads", express.static("uploads"));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", userRoutes.router);
app.use("/api/admin", adminRoutes.router);

export default app;
