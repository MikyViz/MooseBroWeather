/**
 * Weather Service - encapsulates all OpenWeatherMap API calls
 */

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || '';
const BASE_URL = import.meta.env.VITE_OPENWEATHER_BASE_URL || 'https://api.openweathermap.org/data/2.5';

class WeatherService {
  /**
   * Build URL with query parameters
   */
  buildUrl(endpoint, params) {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key]);
      }
    });
    
    if (API_KEY) {
      url.searchParams.append('appid', API_KEY);
    }
    
    return url.toString();
  }

  /**
   * Make API request with error handling
   */
  async request(url) {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Weather API request failed:', error);
      throw error;
    }
  }

  /**
   * Get current weather by coordinates
   */
  async getCurrentWeatherByCoords(lat, lon, units = 'metric') {
    const url = this.buildUrl('weather', {
      lat,
      lon,
      units
    });
    
    return this.request(url);
  }

  /**
   * Get current weather by city name
   */
  async getCurrentWeatherByCity(city, units = 'metric') {
    const url = this.buildUrl('weather', {
      q: city,
      units
    });
    
    return this.request(url);
  }

  /**
   * Get 5-day forecast by coordinates
   */
  async getForecastByCoords(lat, lon, units = 'metric') {
    const url = this.buildUrl('forecast', {
      lat,
      lon,
      units
    });
    
    return this.request(url);
  }

  /**
   * Get 5-day forecast by city name
   */
  async getForecastByCity(city, units = 'metric') {
    const url = this.buildUrl('forecast', {
      q: city,
      units
    });
    
    return this.request(url);
  }

  /**
   * Get both current weather and forecast at once
   */
  async getWeatherData(params) {
    const { city, lat, lon, units = 'metric' } = params;
    
    try {
      let weatherPromise, forecastPromise;
      
      if (city) {
        weatherPromise = this.getCurrentWeatherByCity(city, units);
        forecastPromise = this.getForecastByCity(city, units);
      } else if (lat && lon) {
        weatherPromise = this.getCurrentWeatherByCoords(lat, lon, units);
        forecastPromise = this.getForecastByCoords(lat, lon, units);
      } else {
        throw new Error('Either city or coordinates must be provided');
      }
      
      const [weather, forecast] = await Promise.all([
        weatherPromise,
        forecastPromise
      ]);
      
      return { weather, forecast };
    } catch (error) {
      throw error;
    }
  }
}

// Export singleton instance
export const weatherService = new WeatherService();

// Export class for testing
export { WeatherService };
