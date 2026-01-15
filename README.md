# AgriConnect

A B2B agricultural logistics platform connecting producers with wholesale markets in West Africa to reduce post-harvest losses and improve farmer income.

## Overview

AgriConnect is a comprehensive web application designed to streamline agricultural supply chains by providing a digital marketplace for direct producer-to-market transactions. The platform features real-time product listings, secure user authentication, and an intuitive interface for managing agricultural commodities.

## Technology Stack

### Frontend
- React 19 with TypeScript
- Vite 6.x (Build tool)
- TailwindCSS (Styling)
- Lucide React (Icons)

### Backend
- FastAPI 0.115.0 (Python web framework)
- SQLAlchemy 2.0.36 (ORM)
- Pydantic 2.10.0 (Data validation)
- JWT Authentication (python-jose)
- Bcrypt (Password hashing)
- Uvicorn (ASGI server)

### Database
- SQLite (Development)
- PostgreSQL (Production-ready)

## Project Structure

```
new_eip_project/
├── backend/
│   ├── main.py                 # FastAPI application entry point
│   ├── database.py             # Database configuration
│   ├── models.py               # SQLAlchemy models (Products)
│   ├── schemas.py              # Pydantic schemas (Products)
│   ├── crud.py                 # CRUD operations (Products)
│   ├── routes.py               # API endpoints (Products)
│   ├── auth_models.py          # SQLAlchemy models (Users)
│   ├── auth_schemas.py         # Pydantic schemas (Authentication)
│   ├── auth_utils.py           # JWT & password hashing utilities
│   ├── auth_routes.py          # API endpoints (Authentication)
│   ├── requirements.txt        # Python dependencies
│   └── agriconnect.db          # SQLite database (dev)
├── components/
│   ├── Navbar.tsx              # Navigation with auth state
│   ├── AuthModal.tsx           # Login/Register modal
│   ├── Marketplace.tsx         # Product listing & creation
│   └── ...                     # Other UI components
├── App.tsx                     # Main React application
├── index.html                  # HTML entry point
├── package.json                # Node.js dependencies
└── README.md                   # This file
```

## Features

### Core Functionality
- Product marketplace with CRUD operations
- Real-time product listings
- User registration and authentication
- Secure JWT-based session management
- Responsive design for mobile and desktop

### API Endpoints

#### Products
- `GET /items/` - List all products
- `GET /items/{id}` - Get product details
- `POST /items/` - Create new product
- `PUT /items/{id}` - Update product
- `DELETE /items/{id}` - Delete product

#### Authentication
- `POST /auth/register` - Create user account
- `POST /auth/login` - Authenticate and receive JWT token
- `GET /auth/me` - Get current user information (requires authentication)

## Installation

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- Git

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start the API server:
```bash
uvicorn main:app --reload --port 8001
```

The API will be available at `http://localhost:8001`

API documentation is automatically generated at:
- Swagger UI: `http://localhost:8001/docs`
- ReDoc: `http://localhost:8001/redoc`

## Development

### Running Both Servers

You need two terminal windows:

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload --port 8001
```

### Environment Variables

For production deployment, configure the following environment variables:

Frontend:
- `VITE_API_URL` - Backend API URL

Backend:
- `DATABASE_URL` - PostgreSQL connection string
- `SECRET_KEY` - JWT signing key (generate with `python -c "import secrets; print(secrets.token_urlsafe(32))"`)
- `CORS_ORIGINS` - Allowed frontend origins

## Authentication Flow

1. User registers via `/auth/register` endpoint
2. Password is hashed using bcrypt
3. User credentials stored in database
4. User logs in via `/auth/login` endpoint
5. Backend validates credentials and generates JWT token
6. Frontend stores token in localStorage
7. Subsequent requests include token in Authorization header
8. Backend validates token for protected routes

## Database Schema

### Users Table
- `id` (Integer, Primary Key)
- `name` (String, Required)
- `email` (String, Unique, Required)
- `hashed_password` (String, Required)
- `created_at` (DateTime)
- `is_active` (Boolean)

### Items Table
- `id` (Integer, Primary Key)
- `title` (String, Required)
- `description` (String)
- `created_at` (DateTime)

## Deployment

For detailed deployment instructions including Vercel, Railway, and PostgreSQL setup, refer to the [Technical Documentation](./DOCUMENTATION.md).

### Quick Deployment Summary

1. Frontend: Deploy to Vercel
   - Connect GitHub repository
   - Set `VITE_API_URL` environment variable
   - Deploy

2. Backend: Deploy to Railway or Render
   - Connect GitHub repository
   - Add PostgreSQL database
   - Set environment variables
   - Deploy

3. Update CORS settings in backend to include production frontend URL

## Testing

### Manual Testing

1. Register a new user account
2. Log in with credentials
3. Create a new product listing
4. View product in marketplace
5. Verify authentication persistence across page refreshes

### API Testing

Use the interactive API documentation at `http://localhost:8001/docs` to test endpoints directly.

## Security Considerations

- Passwords are hashed using bcrypt before storage
- JWT tokens expire after 30 minutes
- CORS is configured to allow only specified origins
- SQL injection protection via SQLAlchemy ORM
- Input validation using Pydantic schemas

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary software developed for AgriConnect.

## Support

For technical documentation and deployment guides, see:
- [Technical Documentation](./DOCUMENTATION.md)
- [API Documentation](http://localhost:8001/docs) (when running locally)

## Version History

- v1.0.0 - Initial release with marketplace and authentication features
