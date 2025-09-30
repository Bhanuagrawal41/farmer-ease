
// import React, { useState, useEffect } from "react";
// import {
//   Cloud,
//   Sun,
//   CloudRain,
//   Snowflake,
//   Thermometer,
//   Droplets,
//   Wind,
//   Eye,
//   AlertTriangle,
// } from "lucide-react";
// import axios from "axios";

// export default function WeatherPrediction({ onClose }) {
//   const [weather, setWeather] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [location, setLocation] = useState(null);

//   // Fetch weather from backend
//   const fetchWeather = async (lat, lon) => {
//     setLoading(true);
//     try {
//       const res = await axios.get("http://localhost:5000/api/weather", {
//         params: { lat, lon },
//       });
//       setWeather(res.data);
//       setLocation({
//         lat: res.data.location.lat,
//         lon: res.data.location.lon,
//       });
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch weather data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get user location
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           fetchWeather(position.coords.latitude, position.coords.longitude);
//         },
//         (err) => {
//           console.error(err);
//           setError("Failed to get your location");
//         }
//       );
//     } else {
//       setError("Geolocation is not supported by your browser");
//     }
//   }, []);

//   // Map weather type to icons
//   const getWeatherIcon = (main) => {
//     switch (main) {
//       case "Clouds":
//         return <Cloud className="w-6 h-6 text-gray-400" />;
//       case "Rain":
//         return <CloudRain className="w-6 h-6 text-blue-500" />;
//       case "Clear":
//         return <Sun className="w-6 h-6 text-yellow-400" />;
//       case "Snow":
//         return <Snowflake className="w-6 h-6 text-blue-300" />;
//       default:
//         return <Cloud className="w-6 h-6 text-gray-400" />;
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2">
//       <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-y-auto max-h-[90vh] p-6 space-y-6 relative">
//         <div className="flex items-center gap-3">
//           <Cloud className="text-blue-500 w-8 h-8" />
//           <h2 className="text-xl font-bold">Weather Prediction</h2>
//         </div>

//         {error && <p className="text-red-600">{error}</p>}

//         {location && (
//           <p className="text-gray-600">
//             📍 Latitude: {location.lat?.toFixed(2)}, Longitude:{" "}
//             {location.lon?.toFixed(2)}
//           </p>
//         )}

//         {loading ? (
//           <p>Fetching weather...</p>
//         ) : weather ? (
//           <>
//             {/* Current Weather */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               <div className="col-span-3 bg-gray-50 rounded-xl p-4 relative border shadow">
//                 <Cloud className="absolute top-4 right-4 text-gray-300 w-10 h-10" />
//                 <div className="flex items-center gap-3">
//                   <Thermometer className="text-red-500 w-6 h-6" />
//                   <span className="text-2xl font-semibold">
//                     {Math.round(weather.current.temp ?? 0)}°C
//                   </span>
//                 </div>
//                 <p className="text-gray-500">
//                   {weather.current.weather?.[0]?.description ?? "N/A"}
//                 </p>

//                 {/* Weather Details */}
//                 <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
//                   <div className="flex items-center gap-2">
//                     <Droplets className="w-5 h-5 text-blue-400" />
//                     <span>Humidity: {weather.current.humidity ?? "--"}%</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Wind className="w-5 h-5 text-gray-500" />
//                     <span>Wind: {weather.current.wind_speed ?? "--"} km/h</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <CloudRain className="w-5 h-5 text-blue-500" />
//                     <span>
//                       Rain: {weather.daily.precipitation_probability_mean?.[0] ?? 0}%
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Eye className="w-5 h-5 text-indigo-400" />
//                     <span>
//                       Visibility:{" "}
//                       {Math.round((weather.current.visibility ?? 0) / 1000)} km
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Irrigation Advice */}
//               <div className="col-span-1 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4">
//                 <h3 className="font-bold text-yellow-700 mb-2">🌱 Irrigation Advice</h3>
//                 <p className="text-sm text-gray-600">
//                   {(weather.daily.precipitation_probability_mean?.[0] ?? 0) > 50
//                     ? "Rain expected, irrigation not required."
//                     : "No significant rain, moderate irrigation suggested."}
//                 </p>
//               </div>
//             </div>

//             {/* 7-Day Forecast */}
//             <div>
//               <h3 className="text-lg font-bold mb-3">7-Day Forecast & Irrigation Schedule</h3>
//               <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
//                 {weather.daily.time?.map((date, i) => {
//                   const minTemp = Math.round(weather.daily.temperature_2m_min[i]);
//                   const maxTemp = Math.round(weather.daily.temperature_2m_max[i]);
//                   const rainProb = weather.daily.precipitation_probability_mean[i];

//                   return (
//                     <div
//                       key={date}
//                       className="bg-gray-100 rounded-xl p-3 flex flex-col items-center text-center shadow"
//                     >
//                       <span className="font-semibold">
//                         {new Date(date).toLocaleDateString("en-US", {
//                           weekday: "short",
//                           day: "numeric",
//                         })}
//                       </span>

//                       {/* Weather Icon */}
//                       {getWeatherIcon(rainProb > 50 ? "Rain" : "Clear")}

//                       <p className="text-sm">{rainProb > 50 ? "Rain" : "Clear"}</p>

//                       {/* Temp Range */}
//                       <p className="font-bold">
//                         {minTemp}° - {maxTemp}°
//                       </p>

//                       {/* Irrigation Advice */}
//                       <p className="text-xs text-green-600 mt-1">
//                         {rainProb > 50 ? "💧 Skip Irrigation" : "💧 Irrigate"}
//                       </p>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Alerts */}
//             <div className="bg-gray-100 p-4 rounded-xl shadow">
//               <h3 className="font-bold text-lg mb-2">Today’s Detailed Forecast</h3>
//               <p className="text-gray-600">
//                 Feels like {Math.round(weather.current.feels_like ?? 0)}°C with{" "}
//                 {weather.current.weather?.[0]?.description ?? "N/A"}.
//               </p>
//               <div className="mt-3 flex items-center gap-2 text-red-600 font-semibold">
//                 <AlertTriangle className="w-5 h-5" />
//                 <span>
//                   {weather.alerts?.length ? weather.alerts[0].description : "No alerts today"}
//                 </span>
//               </div>
//             </div>
//           </>
//         ) : (
//           <p>No weather data available</p>
//         )}

//         <div className="flex justify-end">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  Cloud,
  Sun,
  CloudRain,
  Snowflake,
  Thermometer,
  Droplets,
  Wind,
  Eye,
  AlertTriangle,
} from "lucide-react";
import axios from "axios";

export default function WeatherPrediction({ onClose }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [city, setCity] = useState("");

  const fetchWeather = async (lat, lon) => {
     console.log("Fetching weather for:", lat, lon);
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("http://localhost:5000/api/weather", {
        params: { lat, lon },
      });

        console.log("Weather response from backend:", res.data);
      setWeather(res.data);
      setLocation({
        lat: res.data.location.lat,
        lon: res.data.location.lon,
        city: res.data.location.city,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  // Search by city name
  const searchCityWeather = async () => {
    if (!city) return;
     console.log("Searching weather for city:", city);
    try {
      const geoRes = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct`,
        {

          params: {
            q: city,
            limit: 1,
            appid:import.meta.env.VITE_RECIPE_OPENWEATHER_API_KEY,
          },
        }
      );
      console.log("Geo API response:", geoRes.data);
      if (geoRes.data.length > 0) {
        const { lat, lon } = geoRes.data[0];
          console.log(`Coordinates found for ${city}: Lat=${lat}, Lon=${lon}`);
        fetchWeather(lat, lon);
      } else {
        setError("City not found");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch city coordinates");
    }
  };

  // Fetch user's geolocation on mountss
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setError("Failed to get your location");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  }, []);

  const getWeatherIcon = (main) => {
    switch (main) {
      case "Clouds":
        return <Cloud className="w-6 h-6 text-gray-400" />;
      case "Rain":
        return <CloudRain className="w-6 h-6 text-blue-500" />;
      case "Clear":
        return <Sun className="w-6 h-6 text-yellow-400" />;
      case "Snow":
        return <Snowflake className="w-6 h-6 text-blue-300" />;
      default:
        return <Cloud className="w-6 h-6 text-gray-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-y-auto max-h-[90vh] p-6 space-y-6 relative">
        <div className="flex items-center gap-3">
          <Cloud className="text-blue-500 w-8 h-8" />
          <h2 className="text-xl font-bold">Weather Prediction</h2>
        </div>

        {/* City Search */}
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={city}
            onChange={(e) =>{ setCity(e.target.value);
 console.log("City typed:", e.target.value);
            }}
            placeholder="Enter city"
            className="flex-1 border rounded-lg p-2"
          />
          <button
            onClick={searchCityWeather}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Search
          </button>
        </div>

        {/* Error / Location */}
        {error && <p className="text-red-600 mt-2">{error}</p>}
        {location && (
          <p className="text-gray-600 mt-1">
            📍 {location.city} (Lat: {location.lat?.toFixed(2)}, Lon:{" "}
            {location.lon?.toFixed(2)})
          </p>
        )}

        {/* Loading / Weather Display */}
        {loading ? (
          <p>Fetching weather...</p>
        ) : weather ? (
          <>
            {/* Current Weather */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
              <div className="col-span-3 bg-gray-50 rounded-xl p-4 relative border shadow">
                <Cloud className="absolute top-4 right-4 text-gray-300 w-10 h-10" />
                <div className="flex items-center gap-3">
                  <Thermometer className="text-red-500 w-6 h-6" />
                  <span className="text-2xl font-semibold">
                    {Math.round(weather?.current?.temp ?? 0)}°C
                  </span>
                </div>
                <p className="text-gray-500">
                  {weather?.current?.weather?.[0]?.description ?? "N/A"}
                </p>

                {/* Weather Details */}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-blue-400" />
                    <span>Humidity: {weather?.current?.humidity ?? "--"}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="w-5 h-5 text-gray-500" />
                    <span>Wind: {weather?.current?.wind_speed ?? "--"} km/h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CloudRain className="w-5 h-5 text-blue-500" />
                    <span>
                      Rain:{" "}
                      {Math.round(
                        (weather?.daily?.precipitation_probability_mean?.[0] ?? 0)
                      )}
                      %
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-indigo-400" />
                    <span>
                      Visibility:{" "}
                      {Math.round((weather?.current?.visibility ?? 0) / 1000)} km
                    </span>
                  </div>
                </div>
              </div>

              {/* Irrigation Advice */}
              <div className="col-span-1 bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4">
                <h3 className="font-bold text-yellow-700 mb-2">🌱 Irrigation Advice</h3>
                <p className="text-sm text-gray-600">
                  {(weather?.daily?.precipitation_probability_mean?.[0] ?? 0) > 50
                    ? "Rain expected, irrigation not required."
                    : "No significant rain, moderate irrigation suggested."}
                </p>
              </div>
            </div>

            {/* 7-Day Forecast */}
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-3">7-Day Forecast & Irrigation Schedule</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {weather?.daily?.time?.map((date, i) => {
                  const minTemp = Math.round(weather.daily.temperature_2m_min[i]);
                  const maxTemp = Math.round(weather.daily.temperature_2m_max[i]);
                  const rainProb = weather.daily.precipitation_probability_mean[i];

                  return (
                    <div
                      key={date}
                      className="bg-gray-100 rounded-xl p-3 flex flex-col items-center text-center shadow"
                    >
                      <span className="font-semibold">
                        {new Date(date).toLocaleDateString("en-US", {
                          weekday: "short",
                          day: "numeric",
                        })}
                      </span>

                      {/* Weather Icon */}
                      {getWeatherIcon(rainProb > 50 ? "Rain" : "Clear")}

                      <p className="text-sm">{rainProb > 50 ? "Rain" : "Clear"}</p>

                      {/* Temp Range */}
                      <p className="font-bold">
                        {minTemp}° - {maxTemp}°
                      </p>

                      {/* Irrigation Advice */}
                      <p className="text-xs text-green-600 mt-1">
                        {rainProb > 50 ? "💧 Skip Irrigation" : "💧 Irrigate"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-gray-100 p-4 rounded-xl shadow mt-6">
              <h3 className="font-bold text-lg mb-2">Today’s Detailed Forecast</h3>
              <p className="text-gray-600">
                Feels like {Math.round(weather?.current?.feels_like ?? 0)}°C with{" "}
                {weather?.current?.weather?.[0]?.description ?? "N/A"}.
              </p>
              <div className="mt-3 flex items-center gap-2 text-red-600 font-semibold">
                <AlertTriangle className="w-5 h-5" />
                <span>
                  {weather?.alerts?.length ? weather.alerts[0].description : "No alerts today"}
                </span>
              </div>
            </div>
          </>
        ) : (
          <p>No weather data available</p>
        )}

        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
