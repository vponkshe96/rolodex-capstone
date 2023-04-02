import app from "./app";
import "dotenv/config";
import env from "./util/validateEnv";
import mongoose from "mongoose";

//definitely a number, not undefined since env sanitizes
const port = env.PORT;

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose connected");
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(console.error);
