const Gig = require("../../models/Gig");

const getHomePageGigData = async (req, res) => {
  try {
    const gigs = await Gig.find({}, "title slug description images");

    const formattedGigs = gigs.map((gig, index) => ({
      id: index + 1,
      title: gig.title,
      slug: gig.slug,
      description: gig.description,
      images: gig.images,
    }));

    res.json(formattedGigs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch homepage gigs", error: error.message });
  }
};

module.exports = getHomePageGigData;