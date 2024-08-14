// app/page.tsx
import React from 'react';
import { getWeatherData } from '@/components/Server'; 
import Client from '@/components/Client';
import { ForecastResponse } from '@/types/types';


interface PageProps {
  initialData: ForecastResponse | null;
}

export default async function Page() {
  // Obtener datos iniciales
  const initialData = await getWeatherData('-27.3678,-55.8960'); // Datos para Posadas, Argentina

  return <Client initialData={initialData} />;
}
