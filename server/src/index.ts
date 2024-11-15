import express from "express";
import cors from "cors";
require("dotenv").config();
import { sequelize, connectToDb, rundb } from "./config/db_connection";
const corsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    callback(null, true);
  },
};
const user_route = require("../src/routes/user_routes");
const student_route = require("../src/routes/student_routes");
const app = express();
const PORT = process.env.SERVER_PORT;
app.use(cors(corsOptions));
app.use(express.json());
app.use("/users", user_route);
app.use("/students", student_route);

app.get("/", (req, res) => {
  res.send("welcome snable");
});

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectToDb();
});

