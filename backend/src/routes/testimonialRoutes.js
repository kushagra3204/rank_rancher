const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth")

const getTestimonialController = require("../controllers/testimonialController/getAllTestimonial")
const createTestimonialController = require("../controllers/testimonialController/createTestimonial")

router.get('/getAllTestimonials', getTestimonialController.getAllTestimonial);
router.post('/createTestimonial', auth, createTestimonialController.createTestimonial);

module.exports = router;