import location from "./api/location.js";
import weather from "./api/weather.js";

export default function (server, mongoose) {
  location(server, mongoose); // Registrera platsrutter
  weather(server, mongoose);
}