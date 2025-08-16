const Gig = require("../../models/Gig");

const getIndividualGig = async (req, res) => {
  try {
    const gig = await Gig.findOne({ slug: req.params.slug });
    if (!gig) return res.status(404).json({ message: "Gig not found" });
    res.json({ gig });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch gig", error: error.message });
  }
};

module.exports = getIndividualGig;