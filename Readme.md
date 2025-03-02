
# Table of Contents

1.  [BACKEND](#backend)
    1.  [API structure for querying current weather:](#query-current-weather)
    2.  [Examples of working requests to the backend:](#working-requests-backend)
    3.  [Examples of responses from the backend:](#responses-from-backend)
    4.  [Command to build and run backend:](#build-and-run-backend)
2.  [FRONTEND](#frontend)
    1.  [Serve the frontend](#serve-frontend)
    2.  [Example `env.js`](#example-env-js)
3.  [Setting up Docker](#setup-docker)
    1.  [Setup a `.env` file](#setup-root-env-file)
    2.  [Run docker commands](#run-docker)



<a id="backend"></a>

# BACKEND


<a id="query-current-weather"></a>

## API structure for querying current weather:

    http://{HOST}:{PORT}/api/weather?city={required_param},state={optional_param},country={optional_param}


<a id="working-requests-backend"></a>

## Examples of working requests to the backend:

-   <http://{HOST}:{PORT}/api/weather?city=London>
-   <http://{HOST}:{PORT}/api/weather?city=Addis%20Ababa>
-   <http://{HOST}:{PORT}/api/weather?city=addis%20ababa>
-   <http://{HOST}:{PORT}/api/weather?city=Addis+Ababa>
-   <http://{HOST}:{PORT}/api/weather?city=Addis%20Ababa&country=ET>
-   <http://{HOST}:{PORT}/api/weather?city=Austin&state=TX>
-   <http://{HOST}:{PORT}/api/weather?city=Austin&state=TX&country=US>
-   <http://{HOST}:{PORT}/api/weather?city=addis%20ababa>
-   <http://{HOST}:{PORT}/api/weather?city=São%20Paulo&country=BR>
-   <http://{HOST}:{PORT}/api/weather?city=Addis+Ababa>


<a id="responses-from-backend"></a>

## Examples of responses from the backend:

    {
      "name": "Addis Ababa",
      "main": {
        "temp": 20.49,
        "humidity": 30
      },
      "weather": [
        {
          "description": "few clouds"
        }
      ]
    }
    
    
    {
      "name": "São Paulo",
      "main": {
        "temp": 21.16,
        "humidity": 86
      },
      "weather": [
        {
          "description": "broken clouds"
        }
      ]
    }
    
    
    {
      "name": "Austin",
      "main": {
        "temp": 5.58,
        "humidity": 63
      },
      "weather": [
        {
          "description": "broken clouds"
        }
      ]
    }

-   If city is not found, it returns this in the response body:
    
        Location not found


<a id="build-and-run-backend"></a>

## Command to build and run backend:

-   sh
    
        cd backend
        ./mvnw clean && ./mvnw spring-boot:run
-   cmd
    
        cd backend
        .\mvnw.cmd clean && .\mvnw.cmd spring-boot:run


<a id="frontend"></a>

# FRONTEND


<a id="serve-frontend"></a>

## Serve the frontend

Create `env.js` and add the relevant environment variables into it. Example shown [here](#example-env-js).

    cd frontend/public/
    touch env.js
    python -m http.server 8000

Then open <http://localhost:8000/> or <http://localhost:8000/index.html> in a
web-browser.


<a id="example-env-js"></a>

## Example `env.js`

    const env = {
      port: '8080',
      host: 'localhost',
      pexelsAPIKey: 'api-key-here'
    };
    
    export { env };


<a id="setup-docker"></a>

# Setting up Docker

You don&rsquo;t need to setup neither the `env.js` file for the frontend nor the
`application.properties` file for the backend as docker will outomate that for you
using your `.env` file at the root of the project.

Install [Docker](https://www.docker.com/).


<a id="setup-root-env-file"></a>

## Setup a `.env` file

    #!/usr/bin/env bash
    
    export PEXELS_API_KEY={PEXELS-API-KEY-HERE}
    export WEATHER_API_KEY={OPEN-WEATHER-MAP-API-KEY-HERE}
    export WEATHER_API_URL=https://api.openweathermap.org/data/2.5/weather
    export BACKEND_PORT=8080
    export BACKEND_HOST=localhost


<a id="run-docker"></a>

## Run docker commands

From the root of the project:

    $ docker-compose build
    $ docker-compose run

You will be able to access resoueces using <http://localhost:8000/> or
<http://localhost:8000/index.html>

