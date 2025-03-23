import axios from 'axios';
const BACKEND_URL = 'http://127.0.0.1:3001';


// Fetch current weather data
export const getCityData = async (cityName) => {
    console.log("Fetching weather data for city:", cityName);
    try {
        const response = await axios.get(`${BACKEND_URL}/api/weather`, {
            params: { city: cityName },
        });
        return response.data;
    }
    catch (error) {
        console.error('Error fetching city data:', error.response?.data?.error || error.message);
        throw error.response?.data?.error || 'Error fetching city data.';
    }
}

// Fetch forecast data, this will get both time interval data and the 7 day forecast
export const getForecastData = async (cityName, days = 3) => {
    console.log("Fetching forecast data for city:", cityName);
    try {
        const response = await axios.get(`${BACKEND_URL}/api/forecast`, {
            params: { city: cityName, days: days },
        });
        return response.data;
    }
    catch (error) {
        console.error('Error fetching forecast data:', error.response?.data?.error || error.message);
        throw error.response?.data?.error || 'Error fetching forecast data.';
    }
};