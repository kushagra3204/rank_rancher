export const fetchAllBlogs = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/blogs/getAllBlogs`);
        if (!response.ok) throw new Error("Failed to fetch blogs");
        return await response.json();
    }
    catch (error) {
        console.error(error);
        return [];
    }
};