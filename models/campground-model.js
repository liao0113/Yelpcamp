const mongoose = require("mongoose");
const Review = require("./review-model");
const opts = { toJSON: { virtuals: true } };

const ImageSchema = new mongoose.Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const CampgroundSchema = new mongoose.Schema(
  {
    title: String,
    images: [ImageSchema],
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    price: Number,
    description: String,
    location: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    review: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  opts
);

CampgroundSchema.virtual("properties.popUpMarkup").get(function () {
  return `<strong><a href="/campgrounds/${
    this._id
  }">${this.title}</a></strong><p>${this.description.substring(0, 20)}...</p>`;
});

//middleware
CampgroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.review,
      },
    });
  }
});

module.exports = mongoose.model("Campground", CampgroundSchema);
