# Duckling Store

This project is a monorepo composed by a MongoDB-based backend and a React frontend.

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (for frontend deps)

### Setup dependencies

#### Backend

```
cd backend
npm install
```

#### Frontend

```
cd frontend
pnpm install
```

### Run

#### Backend

This will start the backend server. It should be accessible at http://localhost:4000.
```
cd backend
node server.js
```

#### Frontend

This will start the frontend server. It should be accessible at http://localhost:5173.

```
cd frontend
pnpm run dev
```