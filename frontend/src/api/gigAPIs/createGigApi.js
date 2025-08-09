export const createGigAPI = async (body) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/gigs/createGig`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify(body)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create gig');

    return data;
  } catch (err) {
    throw err;
  }
};