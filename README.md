# Project Name
# Car Finder Web App

# Description
Car Finder is a web application designed to help users search for and save cars based on various filters and sorting criteria. Users can perform detailed searches, save their favorite searches, and manage these saved searches through an interactive sidebar.

# Key Features
- User Authentication: Users can register and log in using local credentials or via Google.
- Car Search: Users can search for cars by filtering by make, body style, price range, and more.
- Save Searches: Searches can be saved with a custom title for easy future access.
- Manage Saved Searches: Users can view, use, and delete saved searches via a sidebar.
- Smooth Animations: The application uses smooth animations to enhance the user experience, both for the sidebar and confirmation modals.

# Technologies Used
- Frontend: React, NativeBase, Framer Motion.
- Backend: Node.js, Express.js, Sequelize (PostgreSQL).
- Authentication: Passport.js (Local and Google OAuth).
- Persistence: PostgreSQL.
- MVC pattern.
- Testing on mock of original file.

# How To Launch it

- git clone ...
- use psql to import relations in local. (pg_restore --host=<host> --port=<port> --username=<username> --dbname=<dbname> --no-owner --verbose <path_to_dump_file>)
- 'npm i' on the root project
- 'npm i' inside the view folder (react project)
- npm run start (in folder view)
- npm run start (in root folder) 

## Unit Test Cases

### Automobiles API

#### GET /api/automobiles

1. **Test Case:** Retrieve a list of automobiles with pagination
   - **Description:** This test checks if the API correctly retrieves a paginated list of automobiles.
   - **Expected Outcome:** The response should be a 200 status code, and the response body should contain an array of automobiles.

2. **Test Case:** Filter automobiles by make
   - **Description:** This test checks if the API correctly filters the automobiles by their make.
   - **Expected Outcome:** The response should be a 200 status code, and the response body should contain only automobiles that match the specified make.

3. **Test Case:** Return 400 if an invalid parameter is provided
   - **Description:** This test checks if the API returns a 400 status code when an invalid parameter is provided.
   - **Expected Outcome:** The response should be a 400 status code, and the response body should contain an error message indicating invalid query parameters.

#### POST /api/automobiles

1. **Test Case:** Create a new automobile
   - **Description:** This test checks if the API correctly creates a new automobile.
   - **Expected Outcome:** The response should be a 201 status code, and the response body should contain the created automobile with an ID.

2. **Test Case:** Return 400 if required fields are missing
   - **Description:** This test checks if the API returns a 400 status code when required fields are missing in the request body.
   - **Expected Outcome:** The response should be a 400 status code, and the response body should contain an error message indicating the missing fields.

3. **Test Case:** Return 400 for invalid data
   - **Description:** This test checks if the API returns a 400 status code when invalid data is provided in the request body.
   - **Expected Outcome:** The response should be a 400 status code, and the response body should contain an error message indicating the invalid data.

### Saved Searches API

#### POST /api/saved-searches

1. **Test Case:** Save a new search
   - **Description:** This test checks if the API correctly saves a new search.
   - **Expected Outcome:** The response should be a 201 status code, and the response body should contain the saved search with an ID.

2. **Test Case:** Return 500 if there is an error saving the search
   - **Description:** This test checks if the API returns a 500 status code when there is an error saving the search.
   - **Expected Outcome:** The response should be a 500 status code, and the response body should contain an error message indicating the issue.

### Share Searches API

#### POST /api/share-search

1. **Test Case:** Share a saved search via email
   - **Description:** This test checks if the API correctly sends an email with the details of a saved search.
   - **Expected Outcome:** The response should be a 200 status code, and the response body should contain a success message indicating the email was sent.

2. **Test Case:** Return 404 if the search does not exist
   - **Description:** This test checks if the API returns a 404 status code when the search to be shared does not exist.
   - **Expected Outcome:** The response should be a 404 status code, and the response body should contain an error message indicating the search was not found.

3. **Test Case:** Return 500 if there is an error sending the email
   - **Description:** This test checks if the API returns a 500 status code when there is an error sending the email.
   - **Expected Outcome:** The response should be a 500 status code, and the response body should contain an error message indicating the issue.

### HomeScreenMock Component

#### Filters and Sorting

1. **Test Case:** Filter cars by fuel type
   - **Description:** This test checks if the filter for fuel type works correctly.
   - **Expected Outcome:** The filtered results should only include cars with the selected fuel type.

2. **Test Case:** Filter cars by body style
   - **Description:** This test checks if the filter for body style works correctly.
   - **Expected Outcome:** The filtered results should only include cars with the selected body style.

3. **Test Case:** Sort cars by price
   - **Description:** This test checks if the sorting by price works correctly.
   - **Expected Outcome:** The sorted results should be in the correct order based on the selected sort option.

4. **Test Case:** Update price range filter
   - **Description:** This test checks if the price range filter updates correctly.
   - **Expected Outcome:** The displayed price range should match the selected range.

5. **Test Case:** Clear all filters
   - **Description:** This test checks if the clear filters button resets all filters correctly.
   - **Expected Outcome:** All filters should be reset to their default values.

6. **Test Case:** Filter cars by search query
   - **Description:** This test checks if the search query filter works correctly.
   - **Expected Outcome:** The filtered results should only include cars that match the search query.
