# AI Opportunity Finder

AI Opportunity Finder is a production-quality SaaS portfolio project. This repository contains the Phase 1 implementation, which sets up a separate Next.js frontend and Express/MongoDB backend architecture.

## Tech Stack

**Frontend:**
- Next.js (App Router)
- JavaScript / JSX
- Tailwind CSS
- TanStack Query
- React

**Backend:**
- Node.js
- Express.js
- JavaScript
- REST API architecture
- MongoDB
- Mongoose

## Folder Structure

```
ai-opportunity-finder/
├── frontend/    # Next.js Application
└── backend/     # Express.js Application
```

## Setup & Installation

### Environment Variables

**Frontend:**
Create `frontend/.env.local` using `frontend/.env.example` as a reference.
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Backend:**
Create `backend/.env` using `backend/.env.example` as a reference.
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
The backend will run on `http://localhost:5000`. 
Health check endpoint: `http://localhost:5000/api/health`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
The frontend will run on `http://localhost:3000`.

## Health Check
The backend exposes a health check endpoint at `/api/health`. When running the frontend, the root page (`/`) acts as a development/test screen to verify frontend connection, backend API connection, and MongoDB connection status.
