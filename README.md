# Task Manager App Setup

Follow these instructions to run the full-stack Task Manager application on your local machine. You will need Node.js and MongoDB installed.

## 1. Clone the repository
```bash
git clone <your-repo-link>
cd Task-Manager-App
```

## 2. Backend Setup
Open a terminal, navigate to the backend folder, and start the server.

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder and add these variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_jwt_key
```

Start the backend server:
```bash
npm start
```
*(The server will run on port 5000).*

## 3. Frontend Setup
Open a **new** terminal window, navigate to the frontend folder, and start the React app.

```bash
cd frontend
npm install
npm run dev
```
*(The frontend will be available at `http://localhost:5173`).*
