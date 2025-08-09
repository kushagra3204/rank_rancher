const Gig = require("../../models/Gig");

const deleteGig = async (req, res) => {
  try {
    const deleted = await Gig.findOneAndDelete({ slug: req.params.slug });
    if (!deleted) return res.status(404).json({ message: "Gig not found" });
    res.json({ message: "Gig deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete gig", error: error.message });
  }
};

module.exports = deleteGig;