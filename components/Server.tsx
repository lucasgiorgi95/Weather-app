// app/server.tsx
import { ForecastResponse } from '@/types/types';

// Función para obtener datos del clima
export async function getWeatherData(location: string): Promise<ForecastResponse> {
  const url = `https://api.tomorrow.io/v4/weather/forecast?location=${location}&apikey=ww7lnC8agu4Ff9QPEWuzlbn7nvGb4bRH`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
  const data: ForecastResponse = await response.json();
  return data;
}
