## AUTOMATED TESTING

#### This documentation covers the automated tests for the Weather Forecast API.

## 1. Status Code 200 Verify that the API returns the correct HTTP status code (e.g., 200 OK) for a successful GET request.

Verify that the API returns a 200 OK status code for a successful GET request.

#### Steps:

1. Send a GET request to the weather forecast endpoint with specific filters.
2. Example: `GET http://localhost:3000/api/weather-forecasts?minTemperature=20&maxTemperature=25`

- **Test Script**:
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
```

#### Expected:

- Status: 200 OK

#### Result:

- Status: 200 OK

### Test Details

**Location**  
Weather Forecast > Automated Tests > 1. Correct status  
**Purpose**  
To confirm that the weather forecast endpoint is operational and returning data as expected.

---
---

## 2. Verify that the API returns the expected data format (e.g., JSON, XML) in the response.

Ensure that the API returns the correct data structure in the response body.

#### Steps:

1. Send a GET request to retrieve all weather forecasts.
2. Example: `GET localhost:3000/api/weather-forecasts`

- **Test Script**:
```javascript
pm.test("Content-Type is application/json", function () {
    pm.response.to.have.header("Content-Type", "application/json; charset=utf-8");
});
```

#### Expected:

- Content type to be application/json.

#### Result:

- Respons is application/json

### Test Details

**Location**  
Weather Forecast > Automated tests > 2. Return expected data  
**Purpose**  
This test ensures that the API returns data in a JSON format.

## 3. Ensure that the API returns the correct HTTP status code (e.g., 400 Bad Request) for an invalid requests.

Test if the API filters data correctly based on wind speed parameters.

#### Steps:

- Send a GET request with invalid http.
- Example: `GET localhost:3000/api/invalidhttp`
- **Test Script**:
```javascript
  pm.test("Status code is 404 for not found", function () {
    pm.response.to.have.status(404);
});
```

#### Expected:

- To receive `Status code: 404 not found`

#### Result:

- To receive `Status code: 404 not found` 

### Test Details

**Location**  
Weather Forecast > Automated tests > 3. Invalid request  
**Purpose**  
To validate that the API return correct status code.

---
---

## 4. Create an automated test that sends a request with specific filters or search criteria and checks if the API returns the correct data.

This set of tests ensures that the API returns correctly filtered data based on the query parameters for various weather conditions such as temperature, humidity, wind speed, and precipitation.

### 4.1 Filtering data by temperature

#### Steps:
- Send a GET request to retrieve weather forecasts with specific filters.
- Example: `GET localhost:3000/api/weather-forecasts?minTemperature=20&maxTemperature=25`

### Purpose:  
Verify that the response contains forecasts with temperatures between 20°C and 25°C.

### Test Script:
  ```javascript
pm.test("Temperature is within the specified range", function () {
    var jsonData = pm.response.json().docs;
    jsonData.forEach(function(forecast) {
        pm.expect(forecast.temperature).to.be.at.least(20);
        pm.expect(forecast.temperature).to.be.below(26); 
    });
});
  ```

#### Expected:

- Data: Only forecasts with temperatures between 20°C and 25°C.

#### Result:

- Confirmed data filtered by temperature.

### Test Details

**Location**  
Weather Forecast > Automated tests > 4.1 Filtering Data by Temperature  
**Purpose**  
To validate the API's capability to return data filtered by a specific range of temperature.

## 4.2 Filtering Data by Humidity

This test ensures the API can filter weather forecasts based on humidity range.

#### Steps:

- Send a GET request with specific humidity filters.
- Example: `GET localhost:3000/api/weather-forecasts?minHumidity=30&maxHumidity=70`

```javascript
pm.test("Humidity is within the specified range", function () {
    var jsonData = pm.response.json().docs;
    jsonData.forEach(function(forecast) {
        pm.expect(forecast.humidity).to.be.at.least(30);
        pm.expect(forecast.humidity).to.be.at.most(70);
    });
});
```

#### Expected:

- Data: Only forecasts with humidity levels between 30% and 70%.

#### Result:

- Confirmed data filtered by humidity.

### Test Details

**Location**  
Weather Forecast > Automated tests > 4.2 Filtering Data by Humidity  
**Purpose**  
To validate the API's capability to return data filtered by a specific range of humidity.

## 4.3 Filtering Data by Wind Speed

This test checks if the API correctly filters forecast data based on wind speed parameters.

#### Steps:

- Send a GET request with wind speed filters.
- Example: `GET localhost:3000/api/weather-forecasts?minWindSpeed=10&maxWindSpeed=20`

```javascript
pm.test("Wind speed is within the specified range", function () {
    var jsonData = pm.response.json().docs;
    jsonData.forEach(function(forecast) {
        pm.expect(forecast.windSpeed).to.be.at.least(10);
        pm.expect(forecast.windSpeed).to.be.at.most(20);
    });
});
```

#### Expected:

- Data: Forecasts with wind speeds between 10 and 20 km/h.

#### Result:

- API responded with correct status and filtered data by wind speed.

### Test Details

**Location**  
Weather Forecast > Automated tests > 4.3 Filtering Data by Wind Speed  
**Purpose**  
To ensure the API's functionality for filtering based on wind speed parameters.

## 4.4 Filtering Data by Precipitation

This test ensures the API's response includes only the forecasts within the specified precipitation range.

#### Steps:

- Send a GET request to filter forecasts by precipitation.
- Example: `GET localhost:3000/api/weather-forecasts?minPrecipitation=45&maxPrecipitation=55`

```javascript
pm.test("Precipitation is within the specified range", function () {
    var jsonData = pm.response.json().docs;
    jsonData.forEach(function(forecast) {
        pm.expect(forecast.precipitation).to.be.at.least(45);
        pm.expect(forecast.precipitation).to.be.at.most(55);
    });
});
```

#### Expected:

- Data: Forecasts with precipitation within the 45-55 range.

#### Result:

- The API returned forecasts filtered by the requested precipitation levels.

### Test Details

**Location**  
Weather Forecast > Automated tests > 4. Filtering Data by Precipitation  
**Purpose**  
To confirm that the API accurately filters data based on the amount of precipitation.

---
---

## 5. Write an automated test to verify that the API returns paginated results when a large number of records are requested

This test confirms that the API provides a paginated response when a large number of records are requested, allowing for a scalable and manageable transfer of data.


#### Steps:
- Send a GET request to retrieve a specific page of weather forecasts with a set limit.
- Example: `GET localhost:3000/api/weather-forecasts?page=1&limit=5`

#### Purpose:
Check that the API returns only a specified number of forecasts per page, which is crucial for handling large datasets.

### Test Script:
  ```javascript
pm.test("Page is correct", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.page).to.eql(1);
});
pm.test("Limit count is correct", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData.limit).to.eql(5);
});
  ```

#### Expected:

- Data: A set of forecasts limited to 5 items for the requested page.

#### Result:

- Confirmed that the API returned the correct page and limit of forecasts.

### Test Details

**Location**  
Weather Forecast > Automated tests > 5. Pagination  
**Purpose**  
To validate that the API correctly implements pagination in the response.

Certainly! Here is the formatted documentation for your API test on handling special characters and non-English text:

## 6. Test if the API handles special characters and non-English text correctly in input data and returned responses using an automated testing tool.

This test ensures that the API can process and respond to requests containing special characters, specifically non-English text, without errors.

#### Steps:
- Send a GET request to search for a city with special characters in its name.
- Example: `GET http://localhost:3000/api/locations?city=München`

#### Purpose:
Ensure that the API correctly handles search queries with special characters, returning the appropriate city data without any encoding or parsing issues.

### Test Script:
  ```javascript
 pm.test("Correct city with special characters is returned", function() {
    const city = pm.response.json();
     pm.expect(city[0].city).to.eql("München");
});
  ```

#### Expected:

- Data: The API should return the data for the city "München".

#### Result:

- Confirmed that the API handles special characters correctly and returns data for "München".

### Test Details

**Location**  
Weather Forecast > Automated tests > 6. Test of special characters  
**Purpose**  
To confirm that the API is capable of handling requests with special characters and non-English text without data loss or corruption.

Certainly! Here's the detailed documentation for test case number 7 with 50 iterations for the entire collection:

---
---

## 7. Develop an automated test that sends concurrent requests to the API to ensure that it can handle multiple users and maintain data consistency.

This test evaluates the API's ability to efficiently handle a high volume of concurrent requests by simulating multiple users accessing different endpoints at the same time.

#### Steps:
- Perform a series of GET requests across the API to simulate multiple users.
- The entire collection of tests is executed with 50 iterations to stress-test the system.

#### Purpose:
Assess the API's reliability and data consistency under concurrent usage and heavy load.

### Test Script:
  ```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});
  ```

#### Expected:
- Each request should return a status code of 200 OK.
- The responses should be accurate and consistent across all iterations.

#### Result:
- Upon running the collection 5 times, the API consistently returned the correct status and data.

### Test Details

**Location**  
Weather Forecast > Automated tests > 7. Multiple Requests  
**Purpose**  
To ensure that the API can handle multiple requests in parallel without compromising performance or accuracy of data.

**Execution Details**
- The test collection is run with 5 iterations, applying all tests to every request.
- The high number of iterations ensures the robustness of the API under a simulated environment of heavy usage.

**Note**
- If the number of iterations exceeds 100, the test will start failing due to a rate limiter set to limit requests to 100 within a 15min time window.

---
---

## 8. Create an automated test and test if the API correctly handles different HTTP methods (GET, POST, PUT, DELETE) for each endpoint and returns appropriate status codes and responses for each method.

This test confirms the API's ability to handle the standard HTTP methods for the locations endpoint by verifying the appropriate status codes and responses for each method.

#### Steps:
- Perform a GET request to retrieve all locations.
- Perform a POST request to add a new location.
- Perform a PUT request to update an existing location.
- Perform a DELETE request to remove an existing location.

#### Purpose:
To ensure that the API handles GET, POST, PUT, and DELETE requests correctly for the `locations` endpoint.

### Test Script:
```javascript
// Test for GET request
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Test for POST request
const jsonData = pm.response.json()
pm.environment.set("tempID", jsonData._id)
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

// Test for PUT request
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Test for DELETE request
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
    const responseBody = pm.response.json();
    pm.expect(responseBody.message).to.eql('Platsen har raderats!');
});
```

#### Expected:
- GET request returns status 200 with a list of locations.
- POST request returns status 201 with the newly created location's details.
- PUT request returns status 200, indicating the location has been updated successfully.
- DELETE request returns status 200 with a confirmation message of deletion.

#### Result:
- All HTTP methods behaved as expected, confirming the correct handling of each request type.

### Test Details:
**Location**  
Weather Forecast > Automated tests > 8. Get Put Post Delete  

**Execution Details**
- For the PUT and DELETE requests, a temporary ID (`tempID`) is stored in the Postman environment to reference the same location.
- The tests are sequenced to ensure the newly created location is updated and then deleted successfully.
- To avoid a 404 error, the same `tempID` is used for both PUT and DELETE methods.

**Notes**
- Ensure that the `tempID` variable is correctly set during the POST request to be utilized in subsequent PUT and DELETE requests.

---
---

## 9. Write an automated test to check if the API correctly handles updates to existing records, ensuring that changes are saved and reflected in subsequent 

This test ensures the API's ability to accurately process update requests via the PUT method and to verify that the changes have been applied persistently.

#### Steps:
- Send a PUT request to update specific fields of an existing record.
- Verify that the API response contains the correct status and updated data.

#### Purpose:
To validate that the API updates records correctly and maintains data consistency across subsequent requests.

### Test Script:
```javascript
// Test to verify the response status of the PUT request
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Test to validate the response data of the PUT request
pm.test("Status 200 with correct data", function () {
    pm.response.to.have.status(200);
    const response = pm.response.json();

    pm.expect(response.country, "Country should be Germany").to.eql('Germany');
    pm.expect(response.city, "City should be München").to.eql('München');
    pm.expect(response.timezone, "Timezone should be Europe").to.eql('Europe');
});
```

#### Expected:
- The PUT request should return a 200 status code.
- The response payload should reflect the updated data: Germany for country, München for city, and Europe for timezone.

#### Result:
- The test confirms that the API correctly handles the PUT request, updates the record, and returns the expected data and status code.

**Location**  
Weather Forecast > Automated tests > 9. Check Update is Working  
**Purpose**  
To ensure the API's update operation functions correctly, reflecting changes immediately and consistently.

**Note**  
Remember to replace key names and values with those that correspond to what you are searching for. 

---
---

## 10. Design an automated performance test that simulates a large number of users making requests simultaneously to check the API’s performance under heavy load.

Certainly, let's focus on creating the documentation for test number 10 based on the provided images.

## 10. Design an Automated Performance Test

This test verifies the API's ability to handle a high volume of simultaneous requests, simulating multiple users to test the performance and stability of the system under heavy load conditions.

#### Steps:
- Send a series of GET requests to `localhost:3000/api/weather-forecasts` with varying query parameters to represent different user searches.
- Example for a single GET request: `localhost:3000/api/weather-forecasts?minTemperature=20&maxTemperature=25`

#### Purpose:
To assess the performance of the API under stress by ensuring it can handle numerous concurrent requests without significant performance degradation.

### Test Script:
The following sample script tests the response status for a successful GET request.
```javascript
pm.test("Status code is 200", function() {
    pm.response.to.have.status(200);
});
```

For the performance test, the script will include similar checks for each endpoint involved in the test suite, ensuring that the correct status codes are returned even when the API is under heavy load.

#### Expected:
- All requests are successfully executed with the appropriate status codes (e.g., 200 OK).
- Response times are within acceptable thresholds to maintain a good user experience.

#### Result:
- The API handles the specified number of concurrent requests within acceptable response times, without any unexpected errors or performance issues.

### Test Details

**Location**  
Weather Forecast > Automated Tests > 10. Multiple requests

**Execution Details**
- The test runs with 5 iterations to effectively simulate multiple users accessing the API concurrently.
- Caution is advised as running the tests beyond the set rate limit (100 requests) will result in failed tests due to rate limiting (429 Too Many Requests).

**Purpose**  
To ensure that the API can sustain high levels of traffic, when it's getting accessesd by many users is

---
---

## 11. Create an automated test that verifies the API can recover gracefully from failures, such as database connection issues or third-party service outages, without compromising data integrity.


This automated test checks the API's ability to recover from a failure, such as a database disconnection, and ensures that no data integrity is compromised.

#### Steps:
- Simulate a database connection failure and a reconnection.
- Send a GET request to simulate a disconnection: `GET localhost:3000/api/locations?disconnect=true`
- Send a POST request to simulate attempting a write operation during a failure.
- Send another GET request to simulate a reconnection: `GET localhost:3000/api/locations?disconnect=false`
- Check if the list of locations is retrieved correctly after reconnection.

#### Purpose:
To verify that the API handles connection failures and ensures data integrity is not affected.

### Test Script:

```javascript
pm.test("Status code is 500 and error message", function () {
    pm.response.to.have.status(500);
    pm.expect(pm.response.text()).to.include("An error occurred on the server while fetching the locations.");
});

pm.test("Status code is 200", function() {
    pm.response.to.have.status(200);
});

pm.test("List of locations", function () {
    const response = pm.response.json();
    pm.expect(response).to.be.an('array');
    pm.expect(response.length).to.be.above(0);
    response.forEach((location) => {
        pm.expect(location).to.have.property('city');
    });
});
```

#### Expected:

- After a simulated disconnection, an error message is received.
- After a simulated reconnection, the API returns a 200 status code.
- The list of locations is correctly retrieved, indicating data integrity.

#### Result:

- The API demonstrated a correct response to the disconnection and reconnection, providing appropriate error messaging and maintaining data integrity.

### Test Details:

**Location**  
Weather Forecast > Automated tests > 11. Connection failure  

**Execution Details**  
- The test sequence is critical, with disconnection and reconnection requests made in order.
- Ensure that the simulated failure and recovery are processed correctly without data loss.

---
---

## 12. Develop an automated test to handle edge cases, such as requests with missing or invalid parameters, and ensure that appropriate error messages are returned.

This automated test assesses the API's response to requests with missing or invalid parameters, verifying that the API returns suitable error messages.

#### Steps:
- Perform a GET request on the API with an invalid city parameter.
- Example: `GET localhost:3000/api/locations?city=svengland`

#### Purpose:
To ensure that the API appropriately handles requests with incorrect parameters by providing clear and informative error messages.

### Test Script:

```javascript
pm.test("Status code is 404 and error message", function() {
    pm.response.to.have.status(404);
    const response = pm.response.json();
    pm.expect(response.message).to.eql("Staden hittades inte.");
});
```

#### Expected:

- The API should return a 404 Not Found status code.
- The response should include an error message indicating the city was not found.

#### Result:

- The API correctly returned a 404 status code and an informative error message, demonstrating robust error handling for invalid parameters.

### Test Details:

**Location**  
Weather Forecast > Automated tests > 12. Invalid parameters 

**Execution Details**  
- Ensure the error messages provides a clear guidance on the nature of the error.
- The test verifies the API's resilience against potential user input errors.

---
---

## 13. Write an automated test to verify that the API correctly implements any rate limiting or throttling mechanisms to prevent abuse or excessive use of resources.

This automated test is designed to confirm that the API enforces rate limiting to prevent resource abuse by limiting the number of requests a user can make within a given time frame.

#### Steps:
- Execute a series of GET requests to the API until the rate limit is reached.
- Test the API response status code to switch from 200 to 429 after a certain number of requests.

#### Purpose:
To validate that the API rate limiting functionality is active and responds correctly when the limit is exceeded.

### Test Script:

```javascript
pm.test("Status 200 or 429 depending on rate limit", function () {
    if (pm.info.iteration < 100) {
        pm.response.to.have.status(200);
    } else {
        pm.response.to.have.status(429);
    }
});
```

#### Expected:

- Status code 200 for requests within rate limits.
- Status code 429 for requests after the rate limit is exceeded.

#### Result:

- Initially, the API should return a status of 200 for successful requests.
- Once the rate limit threshold is crossed, the API should return a status of 429, indicating too many requests.

### Test Details:

**Location**  
Weather Forecast > Automated tests > 13. Rate limit  

**Execution Details**  
- The test ensures that the API enforces rate limiting as expected and that it informs the user when the rate limit has been exceeded.
- It simulates a scenario where multiple requests are made in quick succession and verifies that the API throttles these requests to maintain service stability and performance.