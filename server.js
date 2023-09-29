import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import expressEjsLayouts from "express-ejs-layouts";
import userRouter from "./routes/user.js";

// init envionment var
dotenv.config();
const PORT = process.env.PORT || 6060;

// init express
const app = express();

// express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ejs setup
app.set("view engine", "ejs");
app.use(expressEjsLayouts);

// static folder
app.use(express.static("public"));

// routers
app.use(userRouter);

// server listen
app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`.bgGreen.black);
});
