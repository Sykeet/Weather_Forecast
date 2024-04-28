## 1. Verify that the API returns the correct HTTP status code (e.g., 200 OK) for a successful GET request.

This test verifies that the API returns the correct HTTP status code for a successful GET request.

### Test Case: Verify Status Code 200

#### Steps:
1. Open the API endpoint in the browser or use a tool like Postman.
2. Enter the URL `http://localhost:3000/api/weather-forecasts`
3. Send a GET request to the API.

#### Expected Result:
- The response should have a status code of 200 OK.

#### Test Execution:
- Check the status code in the response header.
- If using Postman, look for the Status: 200 OK in the response section.

#### Validation Criteria:
- Confirm that the status code returned is 200.
- Ensure the response body contains the expected data.

### Test Details:

**Automated Test Location:**   
Weather Forecast > Manual Tests > 1. Correct Status  

**Test Execution Frequency:**  
Each deployment or after any changes to the GET endpoint.  

**Prerequisites:**  
Server is up and running

**Notes:**
- This test is crucial to ensure that the API is accessible and that the endpoint is functioning as expected.

---
---

## 2. Check if the API returns the expected data format (e.g., JSON, XML) in the response.

This test ensures that the API returns data in the expected format, such as JSON or XML, which is necessary for the consuming applications to process the data correctly.

### Test Case: Verify Data Format

#### Steps:
1. Open the API endpoint in a browser or use a tool like Postman.
2. Enter the URL `http://localhost:3000/api/weather-forecasts`.
3. Send a GET request to the API.

#### Expected Result:
- The API should return the response in the expected data format, typically JSON.

#### Test Execution:
- Examine the 'Content-Type' header in the response. It should be `application/json` for a JSON response.
- Validate the body of the response to ensure it is properly formatted JSON.

#### Validation Criteria:
- Check that the 'Content-Type' header matches the expected data format (JSON).

### Test Details:

**Automated Test Location:**  
Weather Forecast > Manual Tests > 2. Return Expected Data  
  
**Test Execution Frequency:**  
Each deployment or after any changes to the output format of the endpoint.  
**Prerequisites:**  
Server is running    

---
---

## 3. Ensure that the API returns the correct HTTP status code (e.g., 400 Bad Request) for an invalid request.

This test checks that the API correctly responds with an appropriate HTTP status code when encountering a bad request which is crucial for error handling.

### Test Case: Verify Response to Invalid Request

#### Steps:
1. Open the API endpoint in a browser or use a tool like Postman.
2. Enter the URL with a malformed or incorrect query parameter, for instance: `http://localhost:3000/api/weather-forecasts15`
3. Send a GET request to the API.

#### Expected Result:
- The response should have a status code of 400 Bad Request.

#### Test Execution:
- Check the status code in the response header to confirm it is 400.
- Inspect the response body for a relevant error message.

#### Validation Criteria:
- The status code 400 is returned for the request.
- An error message is included in the response body that helps identify the issue.

### Test Details:

**Automated Test Location:**   
Weather Forecast > Manual Tests > 3. Changed to Bad HTTP  

**Prerequisites:**  
The server is running, and the API is reachable.

---
---

## 4. Test if the API returns the correct data when querying with specific filters or search criteria.

This test verifies that the API returns accurate weather forecast data based on specific query parameter filters such as temperature, humidity, wind speed, and precipitation.

### Test Case: Verify Correct Data Filtering

#### Steps:
1. Open the API endpoint in the browser or use a tool like Postman.
2. Enter the URL and include query parameters for filtering, such as `localhost:3000/api/weather-forecasts?minTemperature=20&maxTemperature=25` for temperature.
3. Send a GET request to the API with the specified filters.

#### Expected Result:
- The response should only include weather forecasts that match the filtering criteria.

#### Test Execution:
- Check the response body for data consistency with the applied filters.
- For temperature filtering, ensure all results fall within the specified temperature range.
- Repeat with different filters like humidity (`minHumidity` and `maxHumidity`), wind speed (`minWindSpeed` and `maxWindSpeed`), and precipitation (`minPrecipitation` and `maxPrecipitation`).

#### Validation Criteria:
- Confirm that the data is correctly filtered by the specified criteria for each test case.

### Test Details:

**Automated Test Location:**   
Weather Forecast > Manual Tests > 4. Correct Data with Filtering

**Prerequisites:**  
- API is live and responding to requests.
- A variety of weather data points exist for testing the filters.

**Notes:**
- These tests are essential to validate that the API's filtering functionality is working as intended, providing the users with the ability to retrieve tailored weather forecast information.

---
---

## 5. Verify that the API returns paginated results when a large number of records are requested.

This test checks if the API can handle large data sets by returning the results in a paginated format.

### Test Case: Verify Pagination

#### Steps:
1. Use a browser or a tool like Postman to send a GET request.
2. Enter the endpoint URL with pagination query parameters like `localhost:3000/api/weather-forecasts?page=1&limit=5`.
3. Send the request to the API.

#### Expected Result:
- The API response should be paginated, only showing a limited number of records per page (e.g., 5 records).

#### Test Execution:
- Confirm that the number of records returned does not exceed the limit specified in the query parameters.
- Validate that there are headers or metadata indicating pagination details, such as `currentPage`, `totalPages`, `pageSize`, and `totalCount`.

#### Validation Criteria:
- The response should match the pagination request (e.g., page number, number of records per page).

### Test Details:

**Automated Test Location:**   
Weather Forecast > Manual Tests > 5. Pagination  

**Prerequisites:**  
API endpoint is operational, and there is sufficient data to test pagination.

---
---

## 6. Check if the API handles special characters and non-English text correctly in input data and returned responses.

This test ensures that the API properly handles special characters and non-English text in requests and verifies that responses are accurately returned with these characters intact, which is important for internationalization support.

### Test Case: Verify Handling of Special Characters and Non-English Text

#### Steps:
1. Open the API endpoint in the browser or use a tool like Postman.
2. Enter the URL with non-English or special characters in the query parameters, such as `localhost:3000/api/locations?city=München`.
3. Send a GET request to the API.

#### Expected Result:
- The API should correctly handle and return data that includes the non-English or special characters without any errors or data loss.

#### Test Execution:
- Check the response body to ensure special characters and non-English text are correctly displayed.
- Confirm that the API does not return an error when requesting data with special characters.

#### Validation Criteria:
- The response accurately reflects the input data, including all special characters and non-English text.
- No data corruption or errors occur due to the presence of these characters.

### Test Details:

**Automated Test Location:**   
Weather Forecast > Manual Tests > 6. Test of Special Characters

**Prerequisites:**  
- Server is active and capable of handling requests.
- Database or data source includes records with special characters and non-English text.

---
---

## 7. Test the API’s response when sending concurrent requests to ensure that it can handle multiple users and maintain data consistency.

This test evaluates the API's ability to manage multiple simultaneous requests, which is essential for high-traffic applications that must serve many users concurrently without data loss or corruption.

### Test Case: Verify Concurrent Request Handling

#### Steps:
1. Use a browser or a tool like Postman to send multiple GET requests to the API at the same time.
2. Enter the endpoint URL `localhost:3000/api/weather-forecasts` and use different query parameters for each concurrent request to simulate different user interactions.
3. Observe the API's behavior and the responses.

#### Expected Result:
- The API should successfully respond to all requests without significant delays or errors.
- Data consistency is maintained across all responses, with no signs of corruption or loss.

#### Test Execution:
- Analyze response times, looking for any unusual delays that could indicate performance issues.
- Check for any error messages or status codes that indicate failures in handling requests.
- Validate the response data for accuracy and consistency.

#### Validation Criteria:
- All requests receive a response with the expected status code (e.g., 200 OK).
- The responses are consistent with the database state and reflect the concurrent nature of the requests.

### Test Details:

**Automated Test Location:**   
Weather Forecast > Manual Tests > 7. Multiple Requests  

**Prerequisites:**  
- A stable and running API server.
- The endpoint is designed to handle concurrent requests appropriately.

**Notes:**
- Consideration should be given to the server's rate-limiting features.

---
---

## 8. Test if the API correctly handles different HTTP methods (GET, POST, PUT, DELETE) for each endpoint and returns appropriate status codes and responses for each method.

This test ensures that the API properly manages various HTTP methods and provides the correct status codes and responses for operations such as retrieving, creating, updating, and deleting resources.

### Test Case: Verify HTTP Methods Handling

#### Steps:
1. Use a tool like Postman to interact with the API.
2. Test each method (GET, POST, PUT, DELETE) using the relevant endpoint, for instance:
   - `GET localhost:3000/api/locations` to retrieve locations.
   - `POST localhost:3000/api/locations` with a JSON body to create a new location.
   - `PUT localhost:3000/api/locations/{id}` with a JSON body to update an existing location.
   - `DELETE localhost:3000/api/locations/{id}` to remove a location.

#### Expected Result:
- Each method should return the appropriate HTTP status code indicative of the action's success or failure (e.g., 200 OK for successful GET, 201 Created for successful POST, etc.).

#### Test Execution:
- For each method, check the response status code and response body.
- Ensure that POST and PUT methods return the created or updated resource in the response body.
- Confirm that DELETE operations return an appropriate confirmation message or status code.

#### Validation Criteria:
- The API must return the correct status code for each HTTP method.
- The response body should match the expected outcome of the action taken (e.g., resource details for GET/POST/PUT, confirmation for DELETE).

### Test Details:

**Automated Test Location:**   
Weather Forecast > Manual Tests > 8. Get Put Post Delete

**Prerequisites:**  
- API is live and capable of receiving requests.
- Test data is available for creating, updating, and deleting operations.

---
---

## 9. Check if the API correctly handles updates to existing records, ensuring that changes are saved and reflected in subsequent requests.

This test ensures that the API processes updates to existing data accurately and that these updates are persisted and correctly returned in future requests.

### Test Case: Verify Record Update

#### Steps:
1. Open the API endpoint in the browser or use a tool like Postman.
2. Send a GET request to retrieve an existing record, for example, `localhost:3000/api/locations/{id}`, write in the id instead of `{id}`.
3. Use the PUT method to update the retrieved record at the same endpoint with the new data.
4. Send another GET request to the same endpoint to retrieve the updated record.

#### Expected Result:
- The PUT request should return a success status code (200 OK or 204 No Content).
- The subsequent GET request should return the updated data.

#### Test Execution:
- Confirm the success status code upon the PUT request.
- Check the response of the subsequent GET request for data accuracy against the updates.

#### Validation Criteria:
- The response status code for the PUT request indicates success.
- The updated data is accurately reflected and consistent in the subsequent GET response.

### Test Details:

**Automated Test Location:**   
Weather Forecast > Manual Tests > 9. Check update is working

**Prerequisites:**  
- Server and database are operational.
- At least one record exists to update.

---
---

## 10. Test the API’s performance under heavy load, simulating a large number of users making requests simultaneously.

This test evaluates the API's ability to handle a high volume of requests simultaneously, which is critical for high-traffic environments to ensure stability and performance.

### Test Case: Simulate High Load

#### Steps:
1. Use Postman to open the API endpoint.
2. Use Postman's Collection Runner or a similar feature to simulate multiple users by sending numerous requests to `localhost:3000/api/weather-forecasts`.
3. Set the Collection Runner to send requests with varying query parameters to mimic different user interactions and use its iteration feature to simulate a large number of requests.

#### Expected Result:
- The API should handle all incoming requests without significant performance degradation.
- All responses should be returned with appropriate status codes and no errors related to load.

#### Test Execution:
- Monitor the response times and error rates within Postman.
- Observe the behavior of the API and any potential slowdowns or failures.
- Verify that the load does not result in incorrect data being returned or saved.

#### Validation Criteria:
- Response times remain within acceptable thresholds.
- Error rates do not increase significantly under load.
- No data corruption or inconsistency as a result of the high load.

### Test Details:

**Automated Test Location:**   
Weather Forecast > Manual Tests > 10. Multiple Requests  

**Prerequisites:**  
- Postman is set up with the correct environment and collection to execute multiple requests.
- The API server is configured to handle a high number of simultaneous connections.

---
---

## 11. Verify that the API can recover gracefully from failures, such as database connection issues without compromising data integrity.

This test case ensures that the API has proper error handling and recovery mechanisms in place for scenarios where a database connection cannot be established.

### Test Case: Verify Recovery from Database Connection Failures

#### Steps:
1. Using Postman, prepare a GET request to an API endpoint that requires a database connection, such as `localhost:3000/api/locations`.
2. Introduce a query parameter to simulate a database disconnection, for instance, by appending `?disconnect=true` to the endpoint.
3. Send the GET request to the API.

#### Expected Result:
- The API should respond with an appropriate error status code, such as 500 Internal Server Error.
- The error message should indicate a database connection failure.

#### Test Execution:
- Execute the request in Postman and observe the response.
- Review the response status code and message for indications of a graceful failure.

#### Validation Criteria:
- The API's response should clearly state that a database connection issue occurred.
- No data corruption or unintended side effects should result from the failed connection attempt.

### Test Details:

**Automated Test Location:**   
Weather Forecast > Manual Tests > 11. Connection Failure

**Prerequisites:**  
The API server is running, and the simulated failure condition (disconnect parameter) is recognized by the server.

---
---

## 12. Test the API’s ability to handle edge cases, such as requests with missing or invalid parameters, and ensure that appropriate error messages are returned.

This test case will evaluate the robustness of the API when faced with requests that do not conform to expected parameters. It will verify that the API provides helpful error messages, aiding in troubleshooting and improving user experience.

### Test Case: Verify Handling of Invalid Parameters

#### Steps:
1. Utilize Postman to set up a GET request to an API endpoint that expects certain parameters, such as `localhost:3000/api/locations`.
2. Include an invalid parameter in the request, like an incorrect city name that is not present in the database: `?city=malmo`.
3. Send the GET request to the API.

#### Expected Result:
- The API should respond with a client error status code, commonly 400 Bad Request.
- The response should include an error message explaining that the 'city' parameter is invalid or not found.

#### Test Execution:
- Perform the request in Postman and observe the response details.
- Review the status code to verify it indicates a client error.
- Assess the content of the error message for clarity and usefulness.

#### Validation Criteria:
- A status code within the 4xx range is returned, signaling a client error.
- The error message is descriptive, guiding the client on how to correct the request.

### Test Details:

**Automated Test Location:**   
Weather Forecast > Manual Tests > 12. Invalid Parameters

**Prerequisites:**  
The API server should be running, and the endpoint in question should be functional.

---
---

## 13. Verify that the API correctly implements rate limiting or throttling mechanisms to prevent abuse or excessive use of resources.

### Test Case: Check Rate Limiting with Iterations

#### Steps:
1. Open Postman and prepare a GET request to an API endpoint with rate limiting, like `localhost:3000/api/locations`.
2. Configure a sequence of requests within Postman, setting the iteration count to a number higher than the rate limit threshold.
3. Utilize Postman’s Collection Runner to run the iterations of the request against the API endpoint.

#### Expected Result:
- The API should process requests up to the rate limit and then respond with a 429 Too Many Requests status code for each request that exceeds the threshold.
- The responses for exceeded limits should provide feedback on the rate limit violation, potentially including details such as the retry-after time.

#### Test Execution:
- Execute the prepared request in Postman's Collection Runner with the set number of iterations.
- Monitor the responses for a transition from successful status codes (e.g., 200 OK) to the 429 status code once the rate limit is breached.
- Document the number of successful requests before rate limiting takes effect.

#### Validation Criteria:
- Responses should indicate successful handling of requests until the rate limit is exceeded.
- After exceeding the limit, the API must return a 429 status code consistently for each subsequent request within the rate limit window.
- The API should only resume successful request handling after the rate limit window has been reset.

### Test Details:

**Automated Test Location:**   
Weather Forecast > Manual Tests > 13. Rate Limit

**Prerequisites:**  
- The API server must be running with rate limiting configured properly.
- Postman must be set up to execute multiple iterations to effectively test the rate limit.

**Notes:**
- Rate limit is set to 100 every 15min.

---
---