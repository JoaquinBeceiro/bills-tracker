import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

export const getRefreshToken = async (code) => {
    try {
        const response = await axios.get(`${baseURL}/oauth2callback?code=${code}`);
        return response;
    } catch (error) {
        return null;
    }
}
