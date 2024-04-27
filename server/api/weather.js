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
      const weatherForecasts = await WeatherForecast.find();
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
