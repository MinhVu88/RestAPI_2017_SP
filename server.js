const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 4000;
const routes = require("./routes/api");
const mongodb_uri =
  "mongodb+srv://mainUser:17Maynard04Keenan1964@nodejs.oacgl.mongodb.net/rest_api_tut?retryWrites=true&w=majority";

// connect to mongodb
mongoose
  .connect(mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() =>
    app.listen(port, () => console.log(`server's listening on port ${port}`))
  )
  .catch(error => console.log(error));
mongoose.Promise = global.Promise;

// middlewares
app.use(cors());
app.use(express.json({ extended: false }));
app.use("/api", routes);

// 404
app.use((req, res, next) =>
  res.status(404).json({ msg: "404 Page Not Found" })
);
