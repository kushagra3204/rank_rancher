export const getAllServicesAPI = async (body) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/services/getAllServices`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to get all services');

    return data;
  } catch (err) {
    throw err;
  }
};