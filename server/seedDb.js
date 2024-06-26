import { faker } from '@faker-js/faker';
import mongoose from 'mongoose';
import Location from "./model/locationSchema.js";
import WeatherForecast from './model/weatherSchema.js';

const idList = [];
  
console.log("Start seeding databse!")

async function seedDB() {
  try {
    mongoose.connect("mongodb+srv://kalle:kalle12345@cluster0.ql5uged.mongodb.net/")
    const list = await createLocation(200)
    console.log("LocationList - ", list)
    const list2 = await createWeather(200)
    console.log("LocationList - ", list2)
  } catch (error) {
    console.log(`Errormessage: ${error}`)
  }
  
}

async function createLocation(amount) {
  const locationList = []
  for (let i = 0; i < amount; i++) {
    const location = new Location({
      country: faker.location.country(),
      city: faker.location.city(),
      timezone: faker.location.timeZone()
    })
    await location.save()
      .then(object => {
        idList.push(object._id)
      })
      .catch(err => {
        console.error(err);
      });
    locationList.push(location)
  }
  return locationList
}

async function createWeather(amount) {
  const forecastList = []
  for (let i = 0; i < amount; i++) {
    const weatherForecast = new WeatherForecast({
      date: faker.date.future(),
      temperature: faker.number.int({ min: -10, max: 30 }),
      humidity: faker.number.int({ min: 0, max: 100 }),
      windSpeed: faker.number.int({ min: 0, max: 100 }),
      precipitation: faker.number.int({ min: 0, max: 100 }),
      location: idList[i],
    })
    await weatherForecast.save()
    forecastList.push(weatherForecast)
  }
  return forecastList
}


seedDB()
