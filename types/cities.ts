//cities.ts
export interface City {
  name: string;
  latitude: number;
  longitude: number;
  timeZone: string; // Agregar la propiedad timeZone
}

export const cities: City[] = [
  { name: 'Buenos Aires', latitude: -34.6037, longitude: -58.3816, timeZone: 'America/Argentina/Buenos_Aires' },
  { name: 'Posadas', latitude: -27.3678, longitude: -55.8960, timeZone: 'America/Argentina/Cordoba' },
  { name: 'Córdoba', latitude: -31.4201, longitude: -64.1888, timeZone: 'America/Argentina/Cordoba' },
  { name: 'Rosario', latitude: -32.9468, longitude: -60.6393, timeZone: 'America/Argentina/Cordoba' },
  { name: 'Mendoza', latitude: -32.8895, longitude: -68.8458, timeZone: 'America/Argentina/Mendoza' },
  { name: 'San Juan', latitude: -31.5376, longitude: -68.5252, timeZone: 'America/Argentina/San_Juan' },
  { name: 'San Luis', latitude: -33.2954, longitude: -66.3354, timeZone: 'America/Argentina/San_Luis' },
  { name: 'Salta', latitude: -24.7820, longitude: -65.4232, timeZone: 'America/Argentina/Salta' },
  { name: 'Jujuy', latitude: -24.1850, longitude: -65.2995, timeZone: 'America/Argentina/Jujuy' },
  { name: 'La Plata', latitude: -34.9208, longitude: -57.9560, timeZone: 'America/Argentina/Buenos_Aires' },
  { name: 'Tucumán', latitude: -26.8083, longitude: -65.2174, timeZone: 'America/Argentina/Tucuman' },
  { name: 'Chaco', latitude: -27.4518, longitude: -58.9861, timeZone: 'America/Argentina/Cordoba' },
  { name: 'Chubut', latitude: -43.2955, longitude: -65.1040, timeZone: 'America/Argentina/Catamarca' },
  { name: 'Formosa', latitude: -25.2921, longitude: -58.5834, timeZone: 'America/Argentina/Cordoba' },
  { name: 'Neuquén', latitude: -38.9516, longitude: -68.0590, timeZone: 'America/Argentina/Salta' },
  { name: 'Río Negro', latitude: -40.8136, longitude: -63.0028, timeZone: 'America/Argentina/Salta' },
  { name: 'Santa Cruz', latitude: -51.6230, longitude: -69.2161, timeZone: 'America/Argentina/Rio_Gallegos' },
  { name: 'Santa Fe', latitude: -31.6333, longitude: -60.7167, timeZone: 'America/Argentina/Cordoba' },
  { name: 'Santiago del Estero', latitude: -27.7833, longitude: -64.2667, timeZone: 'America/Argentina/Santiago_del_Estero' },
  { name: 'Tierra del Fuego', latitude: -54.8019, longitude: -68.3030, timeZone: 'America/Argentina/Ushuaia' },
  { name: 'Catamarca', latitude: -28.4690, longitude: -65.7795, timeZone: 'America/Argentina/Catamarca' },
  { name: 'La Rioja', latitude: -29.4131, longitude: -66.8600, timeZone: 'America/Argentina/La_Rioja' },
  { name: 'Corrientes', latitude: -27.4790, longitude: -58.8294, timeZone: 'America/Argentina/Cordoba' },
  
];
