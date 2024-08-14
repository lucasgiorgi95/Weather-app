// app/mockWeatherData.ts
import { ForecastResponse } from '@/types/types';

export const mockWeatherData: ForecastResponse = {
  timelines: {
    minutely: [
      {
          values: {
              temperature: 22.5,
              temperatureApparent: 22.0,
              humidity: 55,
              windSpeed: 5.5,
              cloudCover: 20,
              pressureSurfaceLevel: 1013,
              visibility: 10,
              cloudBase: null,
              cloudCeiling: null,
              dewPoint: 0,
              freezingRainIntensity: 0,
              precipitationProbability: 0,
              rainIntensity: 0,
              sleetIntensity: 0,
              snowIntensity: 0,
              uvHealthConcern: 0,
              uvIndex: 0,
              weatherCode: 0,
              windDirection: 0,
              windGust: 0
          },
          time: ''
      }
    ],
    daily: [
      {
          values: {
              temperatureMax: 25.0,
              temperatureMin: 15.0,
              weatherCode: 0,
              isDayTime: false
          },
          time: ''
      }
    ]
  }
};
