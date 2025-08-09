export const getAllGigAPI = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/gigs/getAllGigs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create gig');
    return data;
  } catch (err) {
    throw err;
    return [];
  }
};