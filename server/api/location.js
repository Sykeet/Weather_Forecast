export default function (server, mongoose) {
  let connected = true

  // Skapar ett schema för "locations", vilket definierar strukturen för varje "location"-dokument i databasen.
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

  /*
  Skapar en GET-route på '/api/locations'. 
  När denna route anropas, hämtar den alla dokument från vår "locations"-samling och skickar tillbaka dem som ett JSON-svar.
  */
  server.get('/api/locations', async (req, res) => {
    try {
      if (req.query.disconnect === 'true') { // if query request for disconnect=true our database will stop being connected.
        if (connected) {
          await mongoose.disconnect();
          connected = false;
          console.log("Database connection now offline.");
        }
      } else {
        if (!connected) { //reconnect if not connected
          await mongoose.connect("mongodb+srv://kalle:kalle12345@cluster0.ql5uged.mongodb.net/");
          connected = true;
          console.log("Database connection back online.");
        }
      }

      let query = {};
      if (req.query.city) {
        query.city = new RegExp('^' + req.query.city + '$', 'i');
      }

      const locations = await Location.find(query);
      if (locations.length === 0 && req.query.city) {
        return res.status(404).json({ message: "Staden hittades inte." });
      }


      res.json(locations);
    } catch (error) {
      res.status(500).json({ message: "Ett fel uppstod på servern vid hämtning av platser." });
    }
  });

  // Skapar en GET-route för att hämta en specifik plats med ett specifikt ID.
  server.get('/api/locations/:id', async (req, res) => {
    try {
      const location = await Location.findById(req.params.id); // Hämtar platsen med ID från databasen.
      if (!location) {
        return res.status(404).json({ message: "Platsen hittades inte" });
      }
      res.json(location);
    } catch (error) {
      res.status(500).json({ message: "Ett fel uppstod på servern vid hämtning av en plats." });
    }
  });

  // Skapar en POST-route för att lägga till en ny plats.
  server.post('/api/locations', async (req, res) => {
    try {
      const newLocation = new Location(req.body); // Skapar en ny plats med data från request body.
      const savedLocation = await newLocation.save(); // Sparar den nya platsen i databasen.
      res.status(201).json(savedLocation); // Skickar tillbaka den sparade platsen som JSON.
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ett fel uppstod på servern vid skapande av ny plats." });
    }
  });

  // Skapar en PUT-route för att uppdatera en plats med ett specifikt ID.
  server.put('/api/locations/:id', async (req, res) => {
    try {
      const updatedLocation = await Location.findByIdAndUpdate(req.params.id, req.body,{ new: true }); // Returnerar den uppdaterade platsen.
      if (!updatedLocation) {
        return res.status(404).json({ message: "Platsen hittades inte" });
      }
      res.json(updatedLocation); // Skickar tillbaka den uppdaterade platsen som JSON.
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ett fel uppstod på servern vid uppdatering av plats." });
    }
  });

  // Skapar en DELETE-route för att radera en plats med ett specifikt ID.
  server.delete('/api/locations/:id', async (req, res) => {
    try {
      const deletedLocation = await Location.findByIdAndDelete(req.params.id);
      if (!deletedLocation) {
        return res.status(404).json({ message: "Platsen hittades inte" });
      }
      res.json({ message: "Platsen har raderats!" }); // Bekräftelse på att platsen har raderats.
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ett fel uppstod på servern vid radering av plats." });
    }
  });

}
