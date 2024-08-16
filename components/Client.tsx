"use client";

import React, { useState, useEffect } from "react";
import { ForecastResponse, DailyWeatherData } from "@/types/types";
import { cities, City } from "@/types/cities";
import { getWeatherData } from "./Server";
import { IoMdSunny, IoMdCloudy, IoMdRainy, IoMdSnow } from "react-icons/io";

interface ClientProps {
  initialData: ForecastResponse | null;
}

export default function Client({ initialData }: ClientProps) {
  const [selectedCity, setSelectedCity] = useState<City>(cities[0]);
  const [forecastData, setForecastData] = useState<ForecastResponse | null>(
    initialData
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getWeatherData(
          `${selectedCity.latitude},${selectedCity.longitude}`
        );
        setForecastData(data);
      } catch (error) {
        console.error(error);
        setErrorMessage("Failed to load weather data.");
      }
    };

    fetchWeatherData();
  }, [selectedCity]);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityName = event.target.value;
    const city = cities.find((c) => c.name === cityName);
    if (city) {
      setSelectedCity(city);
    }
  };

  const latestWeather = forecastData?.timelines.minutely[0]?.values;
  const weeklyWeather = forecastData?.timelines.daily || [];

  const formatTemperature = (value: number | null) =>
    value !== null ? Math.round(value) : "N/A";

  // Obtener la hora local de la ciudad seleccionada
  const cityTime = new Date().toLocaleTimeString("es-AR", {
    timeZone: selectedCity.timeZone,
    hour: "2-digit",
    hour12: false,
  });

  const hour = parseInt(cityTime);
  const isDayTime = hour >= 6 && hour < 18;

  // Función para seleccionar el icono adecuado basado en las condiciones
  const getWeatherIcon = (weatherCode: number) => {
    if (weatherCode >= 200 && weatherCode < 300) return <IoMdRainy className="text-blue-400 text-4xl" />;
    if (weatherCode >= 300 && weatherCode < 400) return <IoMdRainy className="text-gray-600 text-4xl" />;
    if (weatherCode >= 500 && weatherCode < 600) return <IoMdRainy className="text-blue-500 text-4xl" />;
    if (weatherCode >= 600 && weatherCode < 700) return <IoMdSnow className="text-white text-4xl" />;
    if (weatherCode >= 700 && weatherCode < 800) return <IoMdCloudy className="text-gray-500 text-4xl" />;
    if (weatherCode === 800) return <IoMdSunny className="text-yellow-500 text-4xl" />;
    if (weatherCode > 800) return <IoMdCloudy className="text-gray-300 text-4xl" />;
    return <IoMdCloudy className="text-gray-300 text-4xl" />;
  };

  return (
    <div
      className={`w-full h-screen mx-auto bg-cover bg-center border border-white rounded-lg p-4  md:p-6 ${
        isDayTime
          ? 'bg-[url("/image/dia2.jpg")]'
          : 'bg-[url("/image/noche2.jpg")]'
      } bg-opacity-40`}
    >
      <div className="bg-black bg-opacity-60 p-4 rounded-lg">
        <h1 className="text-center text-white text-xl md:text-2xl pb-4">
          Clima Actual
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center mb-4">
          <h2 className="text-white text-sm sm:text-lg pr-4 py-2">
            Seleccione una provincia:
          </h2>
          <select
            onChange={handleCityChange}
            value={selectedCity.name}
            className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1 text-sm sm:text-base"
          >
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        {errorMessage && (
          <div className="text-red-500 text-center mb-4">{errorMessage}</div>
        )}

        {forecastData && (
          <div>
            <div className="bg-gray-800 w-[40%] mx-auto rounded-lg p-4 flex flex-col items-center text-white shadow-lg min-w-[200px]">

            <h2 className="text-center  text-white text-4xl md:text-3xl mb-2">
              {selectedCity.name}{" "}
              {formatTemperature(latestWeather?.temperature ?? null)}°C
            </h2>

            <div className="flex items-center justify-center py-4">
              {latestWeather && getWeatherIcon(latestWeather.weatherCode)}
            </div>
            
            </div>

            <div className="overflow-x-auto  mt-6">
              <div className="flex pb-[2rem] space-x-[10px]">
                {weeklyWeather.map((day: DailyWeatherData, index: number) => (
                  <div
                    key={index}
                    className="day-card bg-gray-800 rounded-lg p-4 flex flex-col items-center text-white shadow-lg min-w-[200px]"
                  >
                    <p className="text-lg font-semibold">
                      {new Date(day.time).toLocaleDateString("es-AR", {
                        weekday: "long",
                      })}
                    </p>
                    <div className="icon text-4xl my-3">
                      {getWeatherIcon(day.values.weatherCode)}
                    </div>
                    <p className="text-2xl font-bold">
                      {formatTemperature(day.values.temperatureMax)}°C
                    </p>
                    <p className="text-sm text-gray-400">
                      {formatTemperature(day.values.temperatureMin)}°C
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
