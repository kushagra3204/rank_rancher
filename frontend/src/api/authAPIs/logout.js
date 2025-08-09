export const logoutAPI = async (body) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/logout`,{
            method: 'POST',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            },
        });
        if (!response.ok) return false;
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
};