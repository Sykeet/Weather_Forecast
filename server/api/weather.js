// Importera nödvändiga moduler och modeller
import mongoose from 'mongoose';

// Skapa schema för väderprognosen (Weather Forecast)
const weatherForecastSchema = new mongoose.Schema({
  location: { type: String, required: true }, // Platsens namn
  date: { type: Date, required: true }, // Datum och tid för prognosen
  temperature: { type: Number, required: true }, // Temperatur
  humidity: { type: Number, required: true }, // Luftfuktighet
  windSpeed: { type: Number, required: true }, // Vindhastighet
  precipitation: { type: Number, required: true } // Nederbördsmängd
});

// Skapa modell för väderprognosen
const WeatherForecast = mongoose.model('WeatherForecast', weatherForecastSchema);

// Definiera API-endpoints
export default function (server, mongoose) {
  // GET /api/weather-forecasts
server.get('/api/weather-forecasts', async (req, res) => {
  try {
    let query = {};
    
    // Filtering by location (string match)
    if (req.query.location) {
      query.location = req.query.location;
    }

    // Filtering by date (specific day)
    if (req.query.date) {
      const date = new Date(req.query.date);
      date.setHours(0, 0, 0, 0);
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);
      query.date = {
        $gte: date,
        $lt: nextDay
      };
    }

    // Filtering by temperature range
    if (req.query.minTemperature || req.query.maxTemperature) {
      query.temperature = {};
      if (req.query.minTemperature) {
        query.temperature.$gte = Number(req.query.minTemperature);
      }
      if (req.query.maxTemperature) {
        query.temperature.$lte = Number(req.query.maxTemperature);
      }
    }

    // Filtering by humidity range
    if (req.query.minHumidity || req.query.maxHumidity) {
      query.humidity = {};
      if (req.query.minHumidity) {
        query.humidity.$gte = Number(req.query.minHumidity);
      }
      if (req.query.maxHumidity) {
        query.humidity.$lte = Number(req.query.maxHumidity);
      }
    }

    // Filtering by wind speed range
    if (req.query.minWindSpeed || req.query.maxWindSpeed) {
      query.windSpeed = {};
      if (req.query.minWindSpeed) {
        query.windSpeed.$gte = Number(req.query.minWindSpeed);
      }
      if (req.query.maxWindSpeed) {
        query.windSpeed.$lte = Number(req.query.maxWindSpeed);
      }
    }

    // Filtering by precipitation range
    if (req.query.minPrecipitation || req.query.maxPrecipitation) {
      query.precipitation = {};
      if (req.query.minPrecipitation) {
        query.precipitation.$gte = Number(req.query.minPrecipitation);
      }
      if (req.query.maxPrecipitation) {
        query.precipitation.$lte = Number(req.query.maxPrecipitation);
      }
    }

    // Execute the query with all the filters applied
    const weatherForecasts = await WeatherForecast.find(query);
    res.json(weatherForecasts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather forecasts.' });
  }
});


  // GET /api/weather-forecasts/:id
  server.get('/api/weather-forecasts/:id', async (req, res) => {
    try {
      const weatherForecast = await WeatherForecast.findById(req.params.id);
      if (!weatherForecast) {
        return res.status(404).json({ message: 'Weather forecast not found.' });
      }
      res.json(weatherForecast);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching weather forecast.' });
    }
  });

  // POST /api/weather-forecasts
  server.post('/api/weather-forecasts', async (req, res) => {
    try {
      const newWeatherForecast = new WeatherForecast(req.body);
      const savedWeatherForecast = await newWeatherForecast.save();
      res.status(201).json(savedWeatherForecast);
    } catch (error) {
      res.status(500).json({ message: 'Error creating weather forecast.' });
    }
  });

  // PUT /api/weather-forecasts/:id
  server.put('/api/weather-forecasts/:id', async (req, res) => {
    try {
      const updatedWeatherForecast = await WeatherForecast.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedWeatherForecast) {
        return res.status(404).json({ message: 'Weather forecast not found.' });
      }
      res.json(updatedWeatherForecast);
    } catch (error) {
      res.status(500).json({ message: 'Error updating weather forecast.' });
    }
  });

  // DELETE /api/weather-forecasts/:id
  server.delete('/api/weather-forecasts/:id', async (req, res) => {
    try {
      const deletedWeatherForecast = await WeatherForecast.findByIdAndDelete(req.params.id);
      if (!deletedWeatherForecast) {
        return res.status(404).json({ message: 'Weather forecast not found.' });
      }
      res.json({ message: 'Weather forecast deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting weather forecast.' });
    }
  });
}
