const Gig = require("../../models/Gig");

const createGig = async (req, res) => {
  try {
    const newGig = new Gig(req.body);
    const savedGig = await newGig.save();
    res.status(201).json({ message: "Gig created successfully", gig: savedGig });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create gig", error: error.message });
  }
};

module.exports = createGig;