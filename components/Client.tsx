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

  const dailyWeather = forecastData?.timelines.daily[0]?.values;

  // Filtrar solo los días futuros
  const today = new Date();
  const futureWeather = weeklyWeather.filter((day: DailyWeatherData) =>
    new Date(day.time) >= today
  );

  return (
    <div
      className={`w-full h-screen mx-auto bg-cover bg-center border border-white rounded-lg p-4 md:p-6 ${
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
              <h2 className="text-center text-white text-4xl font-bold md:text-3xl mb-2">
                {selectedCity.name}{" "}
                {formatTemperature(latestWeather?.temperature ?? null)}°C
              </h2>

              <div className="">
                <p className="text-xl font-bold">
                  {formatTemperature(dailyWeather?.temperatureMax ?? null)}°C
                </p>
              </div>

              <div>
                <p className="text-lg font-bold text-gray-400">
                  {formatTemperature(dailyWeather?.temperatureMin ?? null)}°C
                </p>
              </div>
            </div>

            <div className="overflow-x-auto mt-6">
              <div className="flex pb-[2rem] space-x-[10px]">
                {futureWeather.map((day: DailyWeatherData, index: number) => (
                  <div
                    key={index}
                    className="day-card bg-gray-800 rounded-lg p-4 flex flex-col items-center text-white shadow-lg min-w-[200px]"
                  >
                    <p className="text-2xl font-semibold">
                      {new Date(day.time).toLocaleDateString("es-AR", {
                        weekday: "long",
                      })}
                    </p>
                    <p className="text-xl font-bold">
                      {formatTemperature(day.values.temperatureMax)}°C
                    </p>
                    <p className="text-base text-gray-400">
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
