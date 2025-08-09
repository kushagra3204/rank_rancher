export const createTestimonialAPI = async (body) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/testimonials/createTestimonial`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify(body)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create testimonial');

    return data;
  } catch (err) {
    throw err;
  }
};