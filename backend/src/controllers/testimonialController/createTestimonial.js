const Testimonial = require("../../models/Testimonial");

exports.createTestimonial = async (req, res) => {
  try {
    const { name, position, content, rating, image } = req.body;

    const newTestimonial = new Testimonial({
      name,
      position,
      content,
      rating,
      image
    });

    const savedTestimonial = await newTestimonial.save();
    res.status(201).json(savedTestimonial);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create testimonial', error });
  }
};