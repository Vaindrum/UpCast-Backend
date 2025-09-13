import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// GET /api/weather?city=Delhi
app.get("/api/weather", async (req, res) => {
  const city = req.query.city || "Delhi";

  try {
    // 1. Get lat/lon from geocoding API
    const geoResp = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        city
      )}&count=1`
    );
    const geoData = await geoResp.json();
    if (!geoData.results || geoData.results.length === 0) {
      return res.status(404).json({ error: "City not found" });
    }
    const { latitude, longitude, name, country } = geoData.results[0];

    // 2. Get weather data from forecast API
    const weatherResp = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    const weatherData = await weatherResp.json();

    res.json({
      city: `${name}, ${country}`,
      temperature: weatherData.current_weather.temperature,
      windspeed: weatherData.current_weather.windspeed,
      weathercode: weatherData.current_weather.weathercode,
      time: weatherData.current_weather.time,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch weather", details: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("🌤️ UpCast Backend is running. Use /api/weather?city=Delhi");
});


app.listen(PORT, () => {
  console.log(`UpCast backend running on http://localhost:${PORT}`);
});
