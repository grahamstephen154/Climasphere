
# Table of Contents



API structure for querying current weather:

    http://{HOST}:{PORT}/api/weather?city={required_param},state={optional_param},country={optional_param}

Examples of working requests:

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

Examples of responses:

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

If city is not found, it returns this in the response body:

    Location not found

Command to build and run backend:

-   Sh and pwsh
    
        cd backend/
        ./mvnw clean && ./mvnw spring-boot:run
-   CMD
    
        
        .\mvnw.cmd clean && .\mvnw.cmd spring-boot:run

