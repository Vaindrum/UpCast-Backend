"use client";
import { useState } from "react";

type Weather = {
  city: string;
  temperature: number;
  windspeed: number;
  weathercode: number;
  time: string;
};

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) {
      setError("Enter a city name");
      return;
    }
    setError("");
    setLoading(true);
    setWeather(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/weather?city=${encodeURIComponent(
          city
        )}`
      );
      const data: Weather = await res.json();
      setWeather(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-500 to-indigo-600">
      <div className="bg-white/90 rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          🌤️ UpCast
        </h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city..."
            className="flex-1 px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={fetchWeather}
            disabled={loading}
            className="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? "Loading..." : "Get Weather"}
          </button>
        </div>

        {error && (
          <p className="text-red-600 text-center font-medium mb-4">{error}</p>
        )}

        {weather && (
          <div className="bg-indigo-50 rounded-lg p-6 text-center shadow-md">
            <h2 className="text-xl font-semibold text-indigo-800 mb-2">
              {weather.city}
            </h2>
            <p className="text-2xl font-bold text-gray-800">
              {weather.temperature}°C
            </p>
            <p className="text-gray-700 mt-2">
              💨 Wind Speed: {weather.windspeed} km/h
            </p>
            <p className="text-gray-700">
              ☁️ Weather Code: {weather.weathercode}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              ⏰ {new Date(weather.time).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
