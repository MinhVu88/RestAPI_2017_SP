const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 4000;
const routes = require("./routes/api");

// connect to mongodb
mongoose.connect("mongodb://localhost/rest_api_tut_sp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
mongoose.Promise = global.Promise;

// middlewares
app.use(cors());
app.use(express.json({ extended: false }));
app.use("/api", routes);

app.listen(port, () => console.log(`server's listening on port ${port}`));
