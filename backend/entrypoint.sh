#!/usr/bin/env sh

# Generate application.properties

cat <<EOF > /src/main/resources/application.properties
spring.application.name=climasphere

# Backend Server Port
server.port=${BACKEND_PORT}

# OpenWeatherMap API config
weather.api.key=${WEATHER_API_KEY}
weather.api.url=${WEATHER_API_URL}
EOF

# start the spring boot application
exec java -jar app.jar
