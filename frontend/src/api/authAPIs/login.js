export const loginAPI = async (body) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,{
            method: 'POST',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        if (!response.ok) return false;
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
};