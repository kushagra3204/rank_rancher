export const checkAuthAPI = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/check-auth`, {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) throw new Error("Failed to Check Auth");
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};