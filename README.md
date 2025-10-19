# Blog App (MERN)

This repository now includes a backend built with Express.js and MongoDB (via Mongoose) alongside the existing React (Vite) frontend.

## Backend (Express + MongoDB)

- Location: `backend/`
- Env file: copy `backend/.env.example` to `backend/.env` and set `MONGODB_URI` and `CORS_ORIGIN`.
- Dev run:
  - Install deps: `cd backend && npm install`
  - Start dev server: `npm run dev` (listens on `http://localhost:5000` by default)
- Endpoints:
  - `GET /api/health` – health check
  - `GET /api/posts` – list posts (optional `?category=&tag=&author=`)
  - `GET /api/posts/:id` – get a post
  - `POST /api/posts` – create a post `{ title, content, author, [category], [tags], [authorId], [excerpt] }`
  - `PUT /api/posts/:id` – update a post
  - `DELETE /api/posts/:id` – delete a post

The backend uses CORS with `CORS_ORIGIN` (default `http://localhost:5173`) to allow the Vite dev server.

## Frontend (Vite + React)

- Location: `frontend/`
- Dev run: `cd frontend && npm install && npm run dev` (opens at `http://localhost:5173`)
- Proxy: Vite dev server proxies `/api/*` to `http://localhost:5000` by default. To target another backend URL, set `VITE_API_BASE_URL` in `frontend/.env`.

---

Legacy CRA notes below (kept for reference):

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
