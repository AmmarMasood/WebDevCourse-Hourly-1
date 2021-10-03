const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/error");

const cors = require("cors");

//Load env vars
dotenv.config();

// connect to database
connectDB();

// route files
const auth = require("./routes/auth");
const app = express();
// middleswares
// body parser
app.use(express.json());
// enables cors
app.use(cors());

// mount routes
app.use("/api/v1/auth", auth);

// we gonne put this middleware here because we want this routes errors and because middlewares works in linear order
app.use(errorHandler);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Server is running on mode on the port ${port}`);
});

// handles the unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Unhandeled Rejection: ${err.message}`);
  // close the server and exit the process
  server.close(() => process.exit(1));
});
