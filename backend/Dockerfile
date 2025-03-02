# Get official OpenJDK image
FROM eclipse-temurin:17-jdk AS build

WORKDIR /app

# copy the project files
COPY . .

# build the spring boot app
RUN ./mvnw clean package -DskipTests

# get a minimal jre
FROM eclipse-temurin:17-jre

WORKDIR /app

# copy the built JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# expose the backend port
EXPOSE 8080

# Run the backend app
ENTRYPOINT ["java", "-jar", "app.jar"]
