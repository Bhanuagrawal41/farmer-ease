import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Latitude and Longitude required" });
  }

  try {
    const openWeatherKey = process.env.OPENWEATHER_API_KEY;

    // OpenWeather Current + Alerts
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${openWeatherKey}`;
    const currentRes = await axios.get(currentUrl);

    // Open-Meteo 7-day Forecast
    const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_mean,weathercode&timezone=auto`;
    const forecastRes = await axios.get(forecastUrl);

    // Merge into one format
    const response = {
      current: {
        temp: currentRes.data.main.temp,
        feels_like: currentRes.data.main.feels_like,
        humidity: currentRes.data.main.humidity,
        wind_speed: currentRes.data.wind.speed,
        visibility: currentRes.data.visibility,
        weather: currentRes.data.weather, // array with main + description
      },
      alerts: currentRes.data.alerts || [], // OpenWeather gives alerts if available
      daily: forecastRes.data.daily, // Open-Meteo daily forecast
      location: {
        lat: currentRes.data.coord.lat,
        lon: currentRes.data.coord.lon,
        city: currentRes.data.name,
      },
    };

    res.json(response);
  } catch (err) {
    console.error("Error fetching combined data:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

export default router;
