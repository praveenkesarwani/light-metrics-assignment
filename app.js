require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./config/config");
const commentRoutes = require("./app/routes/commentRoutes");

app.use(express.json());
app.use(commentRoutes);

const PORT = process.env.PORT || 8000;
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
