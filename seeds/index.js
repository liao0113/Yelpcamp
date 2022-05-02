const mongoose = require("mongoose");
const Campground = require("../models/campground-model");
const cities = require("./cities");
const { places, descriptors } = require("./seeHelpers");
//connect mongoDB
main().catch((err) => console.log(err));
async function main() {
  await mongoose
    .connect("mongodb://localhost:27017/yelp-camp")
    .then(() => {
      console.log("Successfully connected to mongoDB.");
    })
    .catch((e) => {
      console.log("Connection Failed.");
      console.log(e);
    });
}

const sample = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "6257ce1fc785ec50f852ab98",
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      images: [
        {
          url: "https://res.cloudinary.com/dssfx2k0n/image/upload/v1650352236/Yelpcamp/ydtp0866w9h3fhqll9ie.webp",
          filename: "Yelpcamp/ydtp0866w9h3fhqll9ie",
        },
      ],
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti ut nulla doloribus qui provident, corporis veritatis excepturi totam aspernatur facere.",
      price: price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
    });
    await camp.save();
  }
};

seedDB();
