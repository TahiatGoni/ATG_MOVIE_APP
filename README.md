# ATG_INTERVIEW
Movie application for ATG

### Running instructions
To run the backend and frontend, separate terminal windows are needed
#### Running Backend
- In one terminal, navigate to backend folder
- create a virtual environment
- activate virtual environment
- install requirements.txt
- navigate to movies folder
- run 'python manage.py runserver'

commands to run on linux

```
cd backend
python -m venv ./venv
source ./venv/bin/activate
pip install -r requirements.txt
cd movies
python manage.py runserver
```
#### Running Frontend
- In another terminal, navigate to frontend/movie-app folder
- run 'npm install'
- run 'npm run dev'

```
cd frontend/movie-app
npm install
npm run dev
```

### Design
#### Backend
The backend uses django rest framework. A default sqlite3 database is used with the django ORM. The backend provides user registration, login functionality along with the movie storage related functions.
In the database, movies are stored with their Title, year of release, link to poster image, imdb ID and the user who saved the movie. Users must be logged in to access endpoints. The authentication used here is basic authentication. This is fine for the simple example case here but would use Oauth in a real full application. The registration service is simple only requiring username and a password. This was done for fast and easy registration but a proper application would require more information such as email.

#### Frontend
The frontend uses reactjs with redux-toolkit, react-redux and redux-saga. There are two screen states. The first is the Login screen. Users can either login with their credentials or add their credentials and click sign up to register themselves and login. This screen could be extended by adding more fields for registration. Redux is used to store the authentication credentials of the user. In a full application, auth tokens would be used. Redux also stores another crucial information which is the user's saved movies. Redux Saga is used to manage the fetching of this data. Once the user logs in, the saved movies are retrieved. This is shown on the main page under saved movies which is the first button from the left situated on the top right corner. Users can view their saved movies and delete them if they desire.

Users can search movies using the search bar. The searching is achieved with the help of the OMDB api. The application just has one link which has the api key hardcoded in. This is just for the example here but in a full application, an environment variable could be set up to store the api key. String concatenation is used to add in the search term. There is a loading animation implemented while the search results are fetched. This search results are just stored in the component state and not globally using redux since they are not needed beyond the time they are shown as search results. Once five movies are saved, a banner is displayed saying that the user saved five movies. The user cannot save more than five movies which is shown by disabling the save button for movies. The user can logout using the red button on the top right.

### Demo Video
https://github.com/TahiatGoni/ATG_MOVIE_APP/assets/46511001/138f516d-926c-4faa-8c4a-d42d720d6122


