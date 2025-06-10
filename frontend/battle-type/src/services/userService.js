// const BASE_URL = 'http://localhost:8000/api/user';
const BASE_URL = import.meta.env.VITE_API_BASE_URL
export const userService = {
    login: async (credentials) => {
        try {
            const response = await fetch(`${BASE_URL}/api/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.msg);
            return data;
        } catch (error) {
            throw error;
        }
    },

    signup: async (userData) => {
        try {
            const response = await fetch(`${BASE_URL}/api/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.msg);
            return data;
        } catch (error) {
            throw error;
        }
    },

    getProfile: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${BASE_URL}/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.msg);
            return data;
        } catch (error) {
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
};