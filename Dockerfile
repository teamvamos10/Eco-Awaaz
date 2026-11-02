# ---------- STAGE 1: Build Frontend ----------
FROM node:20-alpine AS frontend-builder
WORKDIR /frontend
COPY Frontend/package*.json ./
RUN npm install
COPY Frontend/ ./
RUN VITE_API_BASE_URL="" npm run build

# ---------- STAGE 2: Build Backend ----------
FROM maven:3.9.9-eclipse-temurin-17 AS backend-builder
WORKDIR /app
COPY Backend/pom.xml ./
RUN mvn dependency:go-offline -B
COPY Backend/src ./src
COPY --from=frontend-builder /frontend/dist ./src/main/resources/static
RUN mvn clean package -DskipTests

# ---------- STAGE 3: Run Stage ----------
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=backend-builder /app/target/Eco-Awaaz-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 10000
ENTRYPOINT ["java", "-jar", "app.jar"]
