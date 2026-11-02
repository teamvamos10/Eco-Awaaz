#!/usr/bin/env bash
# exit on error
set -o errexit

# Build frontend
echo "Building frontend..."
cd Frontend
npm install
VITE_API_BASE_URL="" npm run build
cd ..

# Copy frontend to backend static resources
echo "Copying frontend assets..."
mkdir -p Backend/src/main/resources/static
cp -r Frontend/dist/* Backend/src/main/resources/static/

# Build backend jar
echo "Building backend..."
cd Backend
chmod +x mvnw
./mvnw clean package -DskipTests
cd ..
