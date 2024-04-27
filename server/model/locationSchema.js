import mongoose from "mongoose";

const locationsSchema = new mongoose.Schema({
  country: String,
  city: String,  // Varje "location" kommer att ha en stad.
  timezone: String // Tidszon för platsen.
});

/* 
  Skapar en Mongoose-modell baserat på locationsSchema.
  Detta möjliggör för oss att skapa, läsa, uppdatera och radera (CRUD) dokument i vår "locations"-samling (collection).
*/
const Location = mongoose.model("Location", locationsSchema);

export default Location;

