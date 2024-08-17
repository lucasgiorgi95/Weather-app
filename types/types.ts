// types.ts
export interface WeatherValues {
  cloudBase: number | null;
  cloudCeiling: number | null;
  cloudCover: number;
  dewPoint: number;
  freezingRainIntensity: number;
  humidity: number;
  precipitationProbability: number;
  pressureSurfaceLevel: number;
  rainIntensity: number;
  sleetIntensity: number;
  snowIntensity: number;
  temperature: number;
  temperatureApparent: number;
  uvHealthConcern: number;
  uvIndex: number;
  visibility: number;
  weatherCode: number;
  windDirection: number;
  windGust: number;
  windSpeed: number;
}

export interface DailyWeatherValues {
  temperatureMax: number;
  temperatureMin: number;
  weatherCode: number;
  isDayTime: boolean;
  humidity: number;
  uvIndex: number;
  precipitationProbability: number;
  windSpeed: number;
  windDirection: number;
  pressureSurfaceLevel: number;
}

export interface WeatherData {
  time: string;
  values: WeatherValues;
}

export interface DailyWeatherData {
  time: string;
  values: DailyWeatherValues;
}

export interface ForecastResponse {
  timelines: {
    minutely: WeatherData[];
    daily: DailyWeatherData[];
  };
}
