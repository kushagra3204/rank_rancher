export const getIndividualGigAPI = async (slug) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/gigs/getIndividualGig/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch gig');
    return data;
  } catch (err) {
    // throw err;
    return null;
  }
};