import "reflect-metadata";
import "./frameworks/di/container";
import app from "./frameworks/express/app";
import { connectDB } from "./lib/db";

connectDB();
app.listen(3000, () => {
  console.log(" server is running, http://localhost:3000");
});
