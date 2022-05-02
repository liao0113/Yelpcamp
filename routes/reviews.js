const express = require("express");
const router = express.Router({ mergeParams: true }); //mergeParams 讓這routes可以得到appjs的傳的ID_params
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const reviews = require("../controllers/reviews");

const { isLoggedIn, isReviewAuthor, validateReview } = require("../middleware");

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

module.exports = router;
