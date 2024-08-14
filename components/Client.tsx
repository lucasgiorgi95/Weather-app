// app/client.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ForecastResponse } from "@/types/types";
import { cities, City } from '@/types/cities';
import { getWeatherData } from "./Server"; 
import { IoMoonSharp } from "react-icons/io5";
import { FaSun } from "react-icons/fa";

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
  const dailyWeather = forecastData?.timelines.daily[0]?.values;

  const formatTemperature = (value: number | null) =>
    value !== null ? Math.round(value) : "N/A";

  // Obtener la hora local de la ciudad seleccionada
  const cityTime = new Date().toLocaleTimeString("es-AR", {
    timeZone: selectedCity.timeZone, // Asegúrate de tener el campo timeZone en tu lista de ciudades
    hour: "2-digit",
    hour12: false,
  });

  const hour = parseInt(cityTime);
  const isDayTime = hour >= 6 && hour < 18;

  return (
    <div className={`pt-14 h-screen bg-cover bg-center  ${
        isDayTime ? 'bg-[#245dd992]' : 'bg-[#102C54]'
      } `}>


      <div className={`w-[40%]  mx-auto bg-cover bg-center border border-white rounded-lg p-6 ${
        isDayTime ? 'bg-[url("/image/dia2.jpg")]' : 'bg-[url("/image/noche2.jpg")]'
      } bg-opacity-40`}>

        <div className="bg-black bg-opacity-60 p-4 rounded-lg">

        <h1 className="text-center text-white text-2xl pb-4">Clima Actual</h1>

        <div className="flex items-center justify-center mb-4 ">
          <h2 className="pr-4 py-2 text-white">Seleccione una provincia: </h2>
          <select onChange={handleCityChange} value={selectedCity.name} className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1">
            {cities.map((city) => (
                <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}

        {forecastData && (
            <div className="">
            <h2 className="text-center text-white text-xl mb-4">
              {selectedCity.name} {formatTemperature(latestWeather?.temperature ?? null)}°C
            </h2>

            <div className="flex items-center justify-center py-4">
              <p className="text-center text-white">
                {isDayTime ? (
                  <FaSun className="text-yellow-500 text-4xl" />
                ) : (
                    <IoMoonSharp className="text-blue-500 text-4xl" />
                )}
              </p>
            </div>

            {dailyWeather && (
                <div className="flex items-center justify-around py-4 text-white">
                <p >{formatTemperature(dailyWeather.temperatureMax)}°C</p>
                <p className="px-3 text-gray-400">{formatTemperature(dailyWeather.temperatureMin)}°C</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 py-4 text-white">
              <p>Sensación Térmica: {latestWeather?.temperatureApparent}°C</p>
              <p>Humedad: {latestWeather?.humidity}%</p>
              <p className="text-[15px]">Velocidad del Viento: {latestWeather?.windSpeed} km/h</p>
              <p className="text-[15px]">Cobertura de Nubes: {latestWeather?.cloudCover}%</p>
              {/* <p>Presión: {latestWeather?.pressureSurfaceLevel} hPa</p> */}
              {/* <p>Visibilidad: {latestWeather?.visibility} km</p> */}
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
