const express = require('express');
const router = express.Router();

const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const gigRoutes = require("./routes/gigRoutes")

router.use('/blogs', blogRoutes);
router.use('/auth', authRoutes);
router.use('/services', serviceRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/gigs', gigRoutes);

module.exports = router;