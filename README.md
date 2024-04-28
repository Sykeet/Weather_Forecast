# Weather Forecast API

My mission with this project is to deliver weather predictions and to get `VG` on this assignment.

## Introduction

This API provides detailed weather forecasts including temperature, humidity, wind speed, and precipitation. It's designed to help users plan their days effectively by being aware of the weather conditions.



## MongoDB Connection String
Please replace `<username>`, `<password>`, and `<database>` with your actual credentials.

```
mongodb+srv://kalle:kalle12345@cluster0.ql5uged.mongodb.net/
```

## Dependencies
Use these commands to set up your project environment.

```
npm init -y
```
Initializes the project and creates a package.json file.

```
npm i express mongoose
```
Installs Express.js for building the API and Mongoose for interacting with MongoDB.

```
npm install mongoose-paginate-v2
```
Adds pagination capabilities to our Mongoose models.

```
npm i express-rate-limit
```
Implements rate limiting to protect the API from excessive use.

```
npm install -g nodemon
```
Installs Nodemon globally, which will auto-restart the server after changes.

## Postman

Use the provided Postman collection and environment to test the API's endpoints.

**Test collection:** [Weather Forecast API Testing](https://postman.com/collections/123456)


## API Endpoints

### Weather Forecasts

#### GET `/api/weather-forecasts`
Retrieve a list of all weather forecasts.

#### GET `/api/weather-forecasts/:id`
Fetch a specific weather forecast by ID.

#### POST `/api/weather-forecasts`
Create a new weather forecast record.

#### PUT `/api/weather-forecasts/:id`
Update an existing weather forecast by ID.

#### DELETE `/api/weather-forecasts/:id`
Remove a weather forecast from the database.

### Locations

#### GET `/api/locations`
Get all locations with weather data.

#### POST `/api/locations`
Add a new location for weather tracking.

## Rate Limiting

The API enforces a rate limit of 100 requests per 15min. If this limit is exceeded, the server will respond with a `429 Too Many Requests` status code.

## Running the API

Start the API server with:

```
nodemon server.js
```

This will launch the API on `http://localhost:3000`.







## Using Faker

## Mock Data Generation

For this project, i have utilized the faker library to generate mock data for my database, ensuring that i have a rich dataset to work with for testing and development purposes.

## Using Faker

Faker is a powerful npm package that allows you to create fake data for various purposes. I've employed it to populate our weather forecasts and locations collections in MongoDB.

To use Faker in your project, first install the package:

```
npm install @faker-js/faker --save-dev
```
Once installed, you can require it in your seeding script:

```javascript
const { faker } = require('@faker-js/faker');

// Example to generate a location
const generateLocation = () => {
  return {
    country: faker.address.country(),
    city: faker.address.city(),
    timezone: faker.address.timeZone()
  };
};

// Example to generate a weather forecast
const generateWeatherForecast = () => {
  return {
    date: faker.date.soon(),
    temperature: faker.random.number({ min: -20, max: 35 }),
    humidity: faker.random.number({ min: 0, max: 100 }),
    windSpeed: faker.random.number({ min: 0, max: 100 }),
    precipitation: faker.random.number({ min: 0, max: 100 })
  };
};
```

In the script above, we create functions that return objects with properties filled with fake data generated by Faker. You can use these functions to seed your database as needed.

### Seeding the Database

To seed your MongoDB database with this mock data, you could use a script similar to the following:

```javascript
const mongoose = require('mongoose');
const Location = require('./models/Location');
const WeatherForecast = require('./models/WeatherForecast');

mongoose.connect('<your-mongodb-connection-string>');

const seedLocations = async () => {
  for (let i = 0; i < 10; i++) {
    const newLocation = new Location(generateLocation());
    await newLocation.save();
  }
};

const seedWeatherForecasts = async () => {
  for (let i = 0; i < 50; i++) {
    const newWeatherForecast = new WeatherForecast(generateWeatherForecast());
    await newWeatherForecast.save();
  }
};

const seedDB = async () => {
  await seedLocations();
  await seedWeatherForecasts();
};

seedDB().then(() => {
  mongoose.disconnect();
});
```

In this script, we connect to MongoDB using Mongoose, then run our `seedLocations` and `seedWeatherForecasts` functions to populate the database with fake data. Once seeding is complete, we disconnect from the database.