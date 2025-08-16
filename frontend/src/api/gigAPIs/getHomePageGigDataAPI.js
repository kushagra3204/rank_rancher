export const getHomePageGigDataAPI = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/gigs/getAllHomePageGigData`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch homepage gigs');
    return data;
  } catch (err) {
    // throw err;
    return [];
  }
};