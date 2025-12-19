# Task Manager - MERN Stack Application

A full-stack Task Management application built with MongoDB, Express.js, React, and Node.js (MERN Stack) with user authentication.

## 📋 Features

### Backend
- RESTful API with Express.js
- MongoDB database with Mongoose ODM
- User authentication with JWT tokens
- Password hashing with bcryptjs
- Protected routes with middleware
- CORS enabled for cross-origin requests
- Environment variables with dotenv

### Frontend
- React with functional components and hooks
- Clean and responsive UI with CSS
- User authentication (Login/Signup)
- Task CRUD operations
- Filter tasks by status
- Task statistics dashboard
- Loading and error states

### Task Features
- Create new tasks with title, description, and status
- View all tasks with filtering (All/Pending/Completed)
- Edit task details
- Mark tasks as completed/pending
- Delete tasks
- View task creation date

## 🗂️ Project Structure

```
test/
├── backend/
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   └── taskController.js    # Task CRUD operations
│   ├── middleware/
│   │   └── auth.js              # JWT verification middleware
│   ├── models/
│   │   ├── User.js              # User model with password hashing
│   │   └── Task.js              # Task model
│   ├── routes/
│   │   ├── authRoutes.js        # Auth routes (/api/auth)
│   │   └── taskRoutes.js        # Task routes (/api/tasks)
│   ├── .env                     # Environment variables
│   ├── package.json
│   └── server.js                # Express server entry point
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js           # Axios API configuration
│   │   ├── components/
│   │   │   ├── Login.jsx        # Login component
│   │   │   ├── Signup.jsx       # Signup component
│   │   │   ├── TaskList.jsx     # Task list with filtering
│   │   │   ├── TaskForm.jsx     # Add new task form
│   │   │   ├── TaskItem.jsx     # Individual task component
│   │   │   └── *.css            # Component styles
│   │   ├── App.jsx              # Main app component
│   │   ├── App.css              # Global styles
│   │   └── main.jsx             # React entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🛠️ API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user (Protected) |

### Tasks (All Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tasks` | Create a new task |
| GET | `/api/tasks` | Get all user's tasks |
| GET | `/api/tasks/:id` | Get a single task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create or edit `.env` file:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key_here
   PORT=5000
   ```

4. **Start the backend server:**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```
   
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   Frontend will run on `http://localhost:3000`

## 📦 Dependencies

### Backend
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables
- `nodemon` - Development auto-reload (dev)

### Frontend
- `react` - UI library
- `react-dom` - React DOM
- `axios` - HTTP client
- `vite` - Build tool

## 🔐 Authentication Flow

1. **Signup:** User creates account → Password is hashed → User saved to DB → JWT token returned
2. **Login:** User enters credentials → Password verified → JWT token returned
3. **Protected Routes:** Token sent in Authorization header → Middleware verifies token → Request proceeds

## 📝 Task Model

```javascript
{
  title: String (required, max 100 chars),
  description: String (optional, max 500 chars),
  status: 'pending' | 'completed' (default: 'pending'),
  userId: ObjectId (reference to User),
  createdAt: Date (auto-generated)
}
```

## 🎨 UI Features

- **Responsive Design:** Works on desktop, tablet, and mobile
- **Modern UI:** Clean and intuitive interface
- **Status Indicators:** Visual badges for task status
- **Quick Actions:** One-click status toggle
- **Confirmation Dialogs:** Delete confirmation
- **Loading States:** Spinner during API calls
- **Error Handling:** User-friendly error messages

## 🔧 Running Both Servers

**Option 1: Run separately in two terminals**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

**Option 2: Use a process manager (like concurrently)**

## 📄 License

MIT License

## 👤 Author

Task Manager - MERN Stack Application
