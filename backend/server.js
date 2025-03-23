require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();


//---middleware----
app.use(cors()); // Enable CORS for all origins (adjust in production)
app.use(express.json()); // Parse JSON bodies


const PORT = process.env.PORT || 3001;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

app.get('/api/weather', async(req,res)=>{
    const cityData= req.query
    const city = cityData.city;

    if (!city) { return res.status(400).json({ error: 'City parameter is required.' });   }
    try{
        const response = await axios.get('http://api.weatherapi.com/v1/current.json', {
            params: {
                q: city,
                key: WEATHER_API_KEY,
                aqi: 'yes', 
            },
        });
        const weatherData = response.data;
        res.json(weatherData);
    }

    catch (error) {
        console.error(error.message);
        if (error.response) {
            // The request was made, and the server responded with a status code out of the 2xx range
            res.status(error.response.status).json({ error: error.response.data.message });
        } else if (error.request) {
            // The request was made, but no response was received
            res.status(500).json({ error: 'No response received from weather service.' });
        } else {
            // Something else happened while setting up the request
            res.status(500).json({ error: 'Error fetching weather data.' });
        }
    }
})

app.get('/api/forecast', async (req, res) => {
    console.log("Received request for /api/forecast");
    const city = req.query.city;
    const days = req.query.days ? parseInt(req.query.days) : 3; // Default to 3 days

    if (!city) {
        return res.status(400).json({ error: 'City parameter is required.' });
    }

    try {
        const response = await axios.get('http://api.weatherapi.com/v1/forecast.json', {
            params: {
                key: WEATHER_API_KEY,
                q: city,
                days: days,
                aqi: 'yes',
                alerts: 'yes',
            },
        });

        let forecastData = response.data.forecast.forecastday;
        console.log(forecastData)
        // Extend to 7 days by duplicating the last day
        //while (forecastData.length < 7) {
       //     const lastDay = { ...forecastData[forecastData.length - 1] };
        //    forecastData.push(lastDay);
      //  }

        // Define specific times to extract
        const specificTimes = ['06:00', '09:00', '12:00', '15:00','18:00', '21:00'];

        // Process forecast data to include only specific times
        const processedForecast = forecastData.map(day => {
            const selectedHours = specificTimes.map(time => {
                const hourData = day.hour.find(hour => hour.time.slice(-5) === time);
                return hourData ? {
                    time: hourData.time,
                    temp_c: hourData.temp_c,
                    condition: hourData.condition.text,
                    icon: hourData.condition.icon,
                    precip_mm: hourData.precip_mm,
                    wind_kph: hourData.wind_kph,
                } : null;
            }).filter(hour => hour !== null); // Remove null entries

            return {
                date: day.date,
                day: day.day,
                selectedHours: selectedHours,
            };
        });

        res.json({ location: response.data.location, forecast: processedForecast });
    }
    catch (error) {
        console.error(error.message);

        if (error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
            res.status(error.response.status).json({ error: error.response.data.error.message });
        } else if (error.request) {
            res.status(500).json({ error: 'No response received from weather service.' });
        } else {
            res.status(500).json({ error: 'Error fetching forecast data.' });
        }
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});