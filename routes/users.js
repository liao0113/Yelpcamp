const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const users = require("../controllers/users");
const passport = require("passport");

router
  .route("/register")
  .get(users.renderRegisterForm)
  .post(catchAsync(users.register));

router
  .route("/login")
  .get(users.renderLoginForm)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    catchAsync(users.login)
  );

router.get("/logout", users.logout);

module.exports = router;
