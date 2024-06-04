const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);


const { connectDB } = require("./config/database");
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Import the cron job file
const resetRatingsCronJob = require("./cron-jobs/resetRatings");

// Start the cron job
resetRatingsCronJob();

const port = process.env.PORT || 3000;

app.use("/api/v1/student", require("./routes/StudentRoute"));
app.use("/api/v1/admin", require("./routes/AdminRoute"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
