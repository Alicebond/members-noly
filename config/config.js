if (process.env.NODE_ENV !== "production") require("dotenv").config();

module.exports = {
  username: process.env.NAME,
  password: process.env.PASSWORD,
  secret: process.env.SESSION_SECRET,
};
