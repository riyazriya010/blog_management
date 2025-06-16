# 📘 Mini Blog Platform

A full-stack blog application built with **React (TypeScript)** on the frontend and **Node.js (TypeScript)** on the backend. This platform allows registered users to create, view, edit, and delete blog posts.

---

## 🔧 Tech Stack

### Frontend

* React + TypeScript
* Redux Toolkit (Authentication/User Store)
* React Router DOM
* Axios
* Tailwind CSS
* React Hook Form
* React Toastify

### Backend

* Node.js + TypeScript
* Express.js
* MongoDB Atlas (Cloud DB)
* Mongoose
* JWT Authentication
* Bcrypt (Password Hashing)
* Repository Pattern Architecture


## ✅ Backend Setup

### 1. Navigate to Backend

```bash
cd server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create .env File

Create a `.env` file inside the `server/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

### 4. Run the Server

```bash
npm run dev
```

Server will run on: `http://localhost:5000`

---

## ✅ Frontend Setup

### 1. Navigate to Frontend

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Axios Base URL

In `src/api/axios.ts` or wherever you define Axios instance:

```ts
const axios = Axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});
```

### 4. Run the Frontend

```bash
npm run dev
```

App will run on: `http://localhost:5173`

---

## 🔐 Authentication

* JWT is generated on login and stored in an **HttpOnly Cookie**.
* On frontend, Redux handles global user state.
* Protected routes redirect unauthorized users.

---

## 🚀 Features

* Register & Login
* Create Post
* Edit Post
* Delete Post
* View Posts (user-specific)
* Protected Routes (using JWT)
* Toast Notifications (React Toastify)
* Loading Spinners
* Responsive UI (Tailwind CSS)

---

## 🛠️ Common Scripts

### Backend

```bash
# Run in development mode
npm run dev

# Build for production
npm run build
```

### Frontend

```bash
# Start Vite dev server
npm run dev

# Build production bundle
npm run build
```

---

## 📦 Deployment (Optional)

* **Frontend**: Vercel or Netlify
* **Backend**: Render or Railway
* **Database**: MongoDB Atlas

---

## 🧠 Final Notes

✅ Make sure MongoDB Atlas access is whitelisted to your IP or set to `0.0.0.0/0` for testing.

✅ CORS must allow requests from `http://localhost:5173`

✅ Cookies should be sent with credentials (`withCredentials: true` in Axios)

---

Made with 💻 by Riyas – MERN Stack Developer 🚀
