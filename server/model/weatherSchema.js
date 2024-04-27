import mongoose from "mongoose";

const weatherForecastSchema = new mongoose.Schema({
  date: { type: Date, required: true }, // Datum och tid för prognosen
  temperature: { type: Number, required: true }, // Temperatur
  humidity: { type: Number, required: true }, // Luftfuktighet
  windSpeed: { type: Number, required: true }, // Vindhastighet
  precipitation: { type: Number, required: true }, // Nederbördsmängd
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' }, // Platsens namn
});

// Skapa modell för väderprognosen
const WeatherForecast = mongoose.model('WeatherForecast', weatherForecastSchema);

export default WeatherForecast;