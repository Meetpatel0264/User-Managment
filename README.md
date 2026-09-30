# MERN User Management Application

A small full-stack CRUD application built for a MERN Stack fresher interview assignment.

## Features

- React + Vite frontend
- Node.js + Express REST API
- MongoDB + Mongoose
- Create, read, update and delete users
- Email and phone validation
- Duplicate email handling
- Centralized backend error handling
- Loading state
- Error state with retry
- Empty state
- Search by name, email or phone
- Responsive UI
- Dark mode
- Delete confirmation
- Environment variables
- No page reload required for CRUD operations

## Project Structure

```text
mern-user-management/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   └── package.json
└── README.md
```

## Requirements

Install:

- Node.js 18+ recommended
- MongoDB local server OR MongoDB Atlas

## 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env` from `.env.example`.

Example:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/mern_user_management
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Start backend:

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

Health check:

```text
GET http://localhost:5000/api/health
```

## 2. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Create `.env` from `.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

Open the Vite URL shown in the terminal, normally:

```text
http://localhost:5173
```

## API Documentation

### GET /api/users

Fetch all users.

Response:

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": "mongo-id",
      "name": "Leanne Graham",
      "email": "leanne@example.com",
      "phone": "1234567890"
    }
  ]
}
```

### POST /api/users

Create a user.

Request:

```json
{
  "name": "Leanne Graham",
  "email": "leanne@example.com",
  "phone": "1234567890"
}
```

Returns HTTP 201 on success.

### GET /api/users/:id

Fetch one user.

### PUT /api/users/:id

Update:

```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "phone": "9876543210"
}
```

### DELETE /api/users/:id

Delete a user.

## Error Handling

The backend handles:

- Missing required fields
- Invalid email
- Invalid phone
- Duplicate email
- Invalid MongoDB ID
- User not found
- Invalid JSON
- Unknown routes
- Database/server errors

The frontend handles:

- Loading
- API failures
- Empty results
- Retry
- Form validation
- Backend validation errors
- CRUD operation loading states

## Testing Checklist

- [ ] Backend starts successfully
- [ ] MongoDB connects
- [ ] `/api/health` works
- [ ] GET users works
- [ ] POST user works
- [ ] GET single user works
- [ ] PUT user works
- [ ] DELETE user works
- [ ] Invalid email rejected
- [ ] Duplicate email rejected
- [ ] Invalid ID handled
- [ ] Missing user handled
- [ ] Frontend loads
- [ ] Loading state appears
- [ ] Error state appears when backend is stopped
- [ ] Retry works after backend starts
- [ ] Add works
- [ ] Edit works
- [ ] Delete works
- [ ] Search works
- [ ] Dark mode works
- [ ] Mobile layout works

## Interview Explanation

The request flow is:

```text
React Component
      ↓
API Service
      ↓
Express Route
      ↓
Controller
      ↓
Mongoose Model
      ↓
MongoDB
      ↓
JSON Response
      ↓
React State
      ↓
UI
```

## Future Improvements

Possible future improvements include:

- Pagination
- Authentication and authorization
- Automated tests
- API documentation with OpenAPI
- Production deployment
- Rate limiting
- More advanced filtering
