import mongoose from 'mongoose';

const weatherForecastSchema = new mongoose.Schema({
  date: { type: Date, required: true }, // Datum och tid för prognosen
  temperature: { type: String, required: true }, // Temperatur inklusive "C" för Celsius
  humidity: { type: String, required: true }, // Luftfuktighet inklusive "%" för procent
  windSpeed: { type: String, required: true }, // Vindhastighet inklusive "m/s" för meter per sekund
  precipitation: { type: String, required: true }, // Nederbördsmängd inklusive "mm" för millimeter
  location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' }, // Referens till platsen
});

// Skapa modellen för väderprognosen
const WeatherForecast = mongoose.model('WeatherForecast', weatherForecastSchema);

export default WeatherForecast;