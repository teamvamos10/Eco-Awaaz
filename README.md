# 🌍 Eco-Awaaz  
**Community-driven complaint tracking system using IVR + Web Dashboard**

---

## 📌 Overview

Eco-Awaaz is a hybrid system that allows users to report civic issues (water, electricity, waste) using:

- 📞 **IVR (voice-based system)** – for people without smartphones  
- 🌐 **Web dashboard** – for admins to monitor and analyze complaints  

The system combines **Python (IVR)**, **Spring Boot (backend)**, **React (frontend)**, and **PostgreSQL (database)**.

---

## 🧠 System Architecture
User (Phone Call)
↓
IVR Service (Python)
↓
PostgreSQL Database
↑
Spring Boot Backend ←→ React Frontend

### 🔑 Key Idea
- IVR writes **directly to database**
- Backend processes and serves data
- Frontend displays analytics

---

## 🚀 Features

### 📞 IVR System (Python)
- Collects complaints via voice / keypad
- Captures:
  - Resource type (water / electricity / waste)
  - Complaint type
  - Address
  - Postal code
- Stores data directly in PostgreSQL

---

### ⚙️ Backend (Spring Boot)
- REST APIs for:
  - Admin login & register
  - Resource updates
  - Complaint analytics
- Modules:
  - Admin Module
  - Resource Module
  - Home Module
  - Dashboard Module

---

### 🌐 Frontend (React)
- Admin dashboard UI
- Displays:
  - Complaint statistics
  - Charts (home + dashboard)
  - Resource updates

---

### 🗄 Database (PostgreSQL - Supabase)
Tables:
- `admins`
- `complaints_detail`
- `resource_info`

---

## 📊 API Endpoints

### 🔐 Admin
POST /admin/register
POST /admin/login


---

### 🌊 Resource

POST /resource/add
GET /resource/{type}


---

### 🏠 Home (Complaint Summary)

GET /home/water
GET /home/electricity
GET /home/waste


---

### 📊 Dashboard (Analytics)

GET /dashboard/water
GET /dashboard/electricity
GET /dashboard/waste


---

## 🛠 Tech Stack

| Layer | Technology |
|------|-----------|
| IVR | Python |
| Backend | Spring Boot |
| Frontend | React,Node js,Tailwind CSS |
| Database | PostgreSQL (Supabase) |
| Deployment | Render |

---

## ⚠️ Notes

- Authentication is **basic (no Spring Security yet)**
- IVR writes directly to DB for simplicity
- In production:
  - IVR → Backend → DB
  - Add JWT authentication

---

## 🔧 Setup Instructions

### Backend (Spring Boot)

mvn clean install
mvn spring-boot:run


---

### Frontend (React)

npm install
npm run dev


---

### Database
- Use PostgreSQL (Supabase)
- Configure credentials in `application.yml`

---

## 🌐 Deployment on Render

You can deploy the entire fullstack application (React frontend + Spring Boot backend) to **Render** as a single, unified web service. This is optimized to run on the free tier, completely avoids CORS issues, and simplifies database connectivity.

### Option A: Deploy using Docker (Recommended)
This is the most reliable option as it uses the multi-stage `Dockerfile` in the root directory to build the React frontend, copy the assets to Spring Boot, and package the final container.

1. Push this repository to your GitHub account.
2. Go to the [Render Dashboard](https://dashboard.render.com/) and click **New +** -> **Web Service**.
3. Connect your repository.
4. Configure the following:
   - **Name**: `eco-awaaz-admin`
   - **Runtime**: `Docker`
5. Add the following **Environment Variables**:
   - `DB_URL` : Your PostgreSQL JDBC connection URL (e.g., `jdbc:postgresql://aws-0-us-east-1.pooler.supabase.com:5432/postgres`)
   - `DB_USERNAME` : Your PostgreSQL database username (e.g. `postgres.your_db_id`)
   - `DB_PASSWORD` : Your PostgreSQL database password
6. Click **Deploy Web Service**.

---

### Option B: Deploy using Native Java + Build Script
If you prefer to deploy using Render's native Java runtime:

1. Push this repository to your GitHub account.
2. Go to the Render Dashboard and click **New +** -> **Web Service**.
3. Connect your repository.
4. Configure the following:
   - **Runtime**: `Java`
   - **Build Command**: `chmod +x build.sh && ./build.sh`
   - **Start Command**: `java -jar Backend/target/Eco-Awaaz-0.0.1-SNAPSHOT.jar`
5. Add the following **Environment Variables**:
   - `DB_URL` : Your PostgreSQL JDBC connection URL
   - `DB_USERNAME` : Your database username
   - `DB_PASSWORD` : Your database password
6. Click **Deploy Web Service**.

---

## 🎯 Future Improvements

- 🔐 JWT Authentication  
- 📡 Real-time updates     
- 📊 Advanced analytics
- 🌐 Adding regional languages in the IVR service
- ☁️ Microservices architecture  

---

## 🎤 Project Summary

Eco-Awaaz enables citizens to report civic issues via IVR, while admins monitor and analyze complaints through a web dashboard powered by a Spring Boot backend and PostgreSQL database.
