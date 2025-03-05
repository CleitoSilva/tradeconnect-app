const Review = require("../models/Review");

const createReview = async (req, res) => {
  const { request, professional, rating, comment } = req.body;

  const review = await Review.create({ request, professional, customer: req.user.id, rating, comment });
  res.status(201).json(review);
};

module.exports = { createReview };
