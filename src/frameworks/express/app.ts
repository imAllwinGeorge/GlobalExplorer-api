import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { AuthRoutes } from "../routes/auth.route";
import session from "express-session";
import dotenv from "dotenv";
import { AdminRoutes } from "../routes/admin.route";
import passport from "passport";
import "../passport/passport.statergy";
import path from "path";
import { UserRoutes } from "frameworks/routes/user.route";
import { HostRoute } from "frameworks/routes/host.route";
import { config } from "shared/config";

dotenv.config();

const app = express();
const authRoutes = new AuthRoutes();
const adminRoutes = new AdminRoutes();
const userRoutes = new UserRoutes();
const hostRoute = new HostRoute();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [config.cors.ALLOWED_ORIGIN!],
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

app.use("/api", authRoutes.router);
app.use("/api/admin", adminRoutes.router);
app.use("/api/user", userRoutes.router);
app.use("/api/host", hostRoute.router);

export default app;
