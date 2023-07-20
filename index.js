const express = require('express');
const { errorHandler } = require('./middleware/errorHandler');
const { connectDb } = require('./config/dbConnetions');
const cors = require('cors');
const dotenv = require("dotenv").config();
connectDb();

const app = express();
const port = 9000;

// app.use("/", (req, res) => {
//   res.json({ message: "Hello from express app!" });
// });

app.use(cors());
app.use(express.json());
app.use("/api/projects", require("./routes/projectRoute"));
app.use("/api/queries", require("./routes/queriesRoute"));
app.use("/api/users", require('./routes/userRoute')); 
app.use(errorHandler);

app.listen(port, () => {
  console.log("Hello World!");
  console.log(`Starting server on Port ${port}`);
});
