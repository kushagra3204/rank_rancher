const Gig = require("../../models/Gig");

const getAllGigs = async (req, res) => {
  try {
    const gigs = await Gig.find();

    const formattedGigs = gigs.map((gig, index) => ({
      id: index + 1,
      slug: gig.slug,
      title: gig.title,
      seller: gig.seller,
      description: gig.description,
      subDescription: gig.subDescription,
      expertiseAreas: gig.expertiseAreas,
      languages: gig.languages,
      images: gig.images,
      averageRating: gig.averageRating,
      reviews: gig.reviews,
      faqs: gig.faqs,
      packages: gig.packages,
      comparePackages: gig.comparePackages,
      compareFeatures: gig.compareFeatures,
      gigURL: gig.gigURL,
    }));

    res.json(formattedGigs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch gigs", error: error.message });
  }
};

module.exports = getAllGigs;