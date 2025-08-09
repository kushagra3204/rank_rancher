const Gig = require("../../models/Gig");

const updateGig = async (req, res) => {
  try {
    const updated = await Gig.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Gig not found" });
    res.json({ message: "Gig updated", gig: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update gig", error: error.message });
  }
};

module.exports = updateGig;