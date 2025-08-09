const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  country: String,
  countryFlag: String,
  rating: Number,
  date: Date,
  comment: String,
  sellerResponse: { type: String, default: null }
}, { _id: false });

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String
}, { _id: false });

const packageSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  deliveryTime: Number,
  features: [String]
}, { _id: false });

const compareFeatureSchema = new mongoose.Schema({
  name: String,
  values: [String]
}, { _id: false });

const sellerSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  level: String,
  rating: Number,
  reviews: Number,
  country: String,
  languages: [String],
  ordersInQueue: Number,
  completedOrders: Number
}, { _id: false });

const gigSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  seller: sellerSchema,
  subDescription: {type: String},
  description: { type: String },
  expertiseAreas: [String],
  languages: [{
    name: String,
    level: String
  }],
  images: [String],
  averageRating: Number,
  reviews: [reviewSchema],
  faqs: [faqSchema],
  packages: [packageSchema],
  comparePackages: { type: Boolean, default: false },
  compareFeatures: [compareFeatureSchema]
}, { timestamps: true });

module.exports = mongoose.model('Gig', gigSchema);