import axios from 'axios'

const BASE_URL = "https://ai-interview-prepration-platform-hvi2.onrender.com"

// Helper: get stored token from localStorage
function getStoredToken() {
    return localStorage.getItem('auth_token');
}

// Helper: build Authorization header
function authHeaders() {
    const token = getStoredToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function register({username, email, password}){
    try {
        const response = await axios.post(`${BASE_URL}/api/auth/register`, {
            username,
            email,
            password
        }, {
            withCredentials: true
        });

        // Store token in localStorage to bypass cross-origin cookie issues
        if (response.data.token) {
            localStorage.setItem('auth_token', response.data.token);
        }

        return response.data;
    }
    catch(err){
        console.error('Error registering user:', err);
        throw err;
    }
}

export async function login({email, password}){
    try {
        const response = await axios.post(`${BASE_URL}/api/auth/login`, {
            email,
            password
        }, {
            withCredentials: true
        });

        // Store token in localStorage to bypass cross-origin cookie issues
        if (response.data.token) {
            localStorage.setItem('auth_token', response.data.token);
        }

        return response.data;
    }
    catch(err){
        console.error('Error logging in user:', err);
        throw err;
    }
}

export async function logout(){
    try {
        await axios.get(`${BASE_URL}/api/auth/logout`, {
            withCredentials: true,
            headers: authHeaders()
        });

        // Clear token from localStorage
        localStorage.removeItem('auth_token');
    }
    catch(err){
        console.error('Error logging out user:', err);
        // Always clear local token even if server request fails
        localStorage.removeItem('auth_token');
    }
}

export async function getMe(){
    try {
        const response = await axios.get(`${BASE_URL}/api/auth/get-me`, {
            withCredentials: true,
            headers: authHeaders()
        });

        return response.data;
    }
    catch(err){
        // 401 is expected when user is not logged in — don't log it as an error
        if (err?.response?.status !== 401) {
            console.error('Error fetching user data:', err);
        }
        return null;
    }
}
