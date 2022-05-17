const mongoose = require("mongoose");

const db_uri = process.env.DB_URI

mongoose
  .connect(db_uri, {})
  .then(() => console.log("Connected to mongodb atlas"))
  .catch((err) => console.error(err));
