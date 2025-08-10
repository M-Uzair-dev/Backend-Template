# 🚀 Secure MERN Backend Template

A production-ready, secure backend template for MERN stack applications with complete authentication flow and enterprise-level security protocols.

## 🔥 Features

### 🛡️ **Security First**
- **Password Security**: Bcrypt hashing with 12 salt rounds
- **JWT Authentication**: Secure token-based authentication with httpOnly cookies
- **Rate Limiting**: Protection against brute force attacks
- **Input Validation**: Comprehensive validation with express-validator
- **Security Headers**: Helmet.js for setting secure HTTP headers
- **NoSQL Injection Protection**: MongoDB injection prevention
- **CORS Configuration**: Secure cross-origin resource sharing
- **Environment Validation**: Joi-based environment variable validation

### 🔐 **Authentication Features**
- User registration with email verification
- Secure login/logout
- Password reset with email tokens
- JWT token management (cookies + headers)
- Email enumeration attack prevention
- Secure password reset flow

### 📧 **Email System**
- Password reset emails
- Configurable SMTP settings
- Email template support

### ⚡ **Performance & Monitoring**
- Request rate limiting
- Error handling middleware
- Input sanitization
- Environment-based configurations

## 📁 Project Structure

```
backend_template/
├── config/
│   ├── database.js          # MongoDB connection
│   └── envValidation.js     # Environment validation
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── userController.js    # User management
├── middleware/
│   ├── auth.js              # JWT verification
│   ├── rateLimiter.js       # Rate limiting configs
│   └── validation.js        # Input validation
├── models/
│   └── User.js              # User schema & methods
├── routes/
│   ├── authRoutes.js        # Authentication endpoints
│   └── userRoutes.js        # User endpoints
├── utils/
│   ├── email.js             # Email utilities
│   └── jwt.js               # JWT utilities
├── app.js                   # Express app setup
├── package.json             # Dependencies
└── .env.example             # Environment template
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### 1. Installation

```bash
# Clone or download this template
git clone <your-repo-url>
cd backend_template

# Install dependencies
npm install
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configurations
```

**Required Environment Variables:**
```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/your_database_name

# JWT (Generate secure 32+ character secret)
JWT_SECRET=your_super_secure_jwt_secret_key_here_minimum_32_chars
JWT_EXPIRES_IN=7d
COOKIE_EXPIRES_IN=7

# Password Reset
RESET_TOKEN_EXPIRE=10

# Email Configuration
EMAIL_FROM=noreply@yourdomain.com
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password_here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 3. Database Setup

Make sure MongoDB is running:

```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env with your Atlas connection string
```

### 4. Start Development Server

```bash
# Start with nodemon (auto-restart)
npm run dev

# Or start normally
node app.js
```

Server will run on `http://localhost:5000`

## 🔗 Integration with Next.js

### Frontend Setup

#### 1. Install Required Packages

```bash
# In your Next.js project
npm install axios js-cookie
npm install -D @types/js-cookie  # If using TypeScript
```

#### 2. Create API Service

```javascript
// lib/api.js
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important: Include cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Token will be sent via httpOnly cookie automatically
    // But you can also send via header if needed
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

#### 3. Authentication Context

```javascript
// context/AuthContext.js
import { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../lib/api';

const AuthContext = createContext();

const initialState = {
  user: null,
  loading: true,
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload, loading: false, error: null };
    case 'LOGOUT':
      return { ...state, user: null, loading: false, error: null };
    case 'ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await api.get('/user/profile');
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.user });
    } catch (error) {
      dispatch({ type: 'LOGOUT' });
    }
  };

  const login = async (email, password) => {
    try {
      dispatch({ type: 'LOADING' });
      const response = await api.post('/auth/login', { email, password });
      
      // Store token in localStorage (optional, since httpOnly cookie is preferred)
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.user });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      dispatch({ type: 'ERROR', payload: message });
      return { success: false, error: message };
    }
  };

  const signup = async (name, email, password) => {
    try {
      dispatch({ type: 'LOADING' });
      const response = await api.post('/auth/signup', { name, email, password });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.user });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Signup failed';
      dispatch({ type: 'ERROR', payload: message });
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('token');
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      // Even if logout fails on server, clear local state
      localStorage.removeItem('token');
      dispatch({ type: 'LOGOUT' });
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return { success: true, message: response.data.message };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send reset email';
      return { success: false, error: message };
    }
  };

  const resetPassword = async (token, password) => {
    try {
      const response = await api.patch(`/auth/reset-password/${token}`, { password });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.user });
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Password reset failed';
      return { success: false, error: message };
    }
  };

  const value = {
    user: state.user,
    loading: state.loading,
    error: state.error,
    login,
    signup,
    logout,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

#### 4. Wrap Your App

```javascript
// pages/_app.js or app/layout.js
import { AuthProvider } from '../context/AuthContext';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
```

#### 5. Example Login Component

```javascript
// components/LoginForm.js
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      router.push('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

#### 6. Protected Routes

```javascript
// components/ProtectedRoute.js
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return children;
}
```

#### 7. Environment Configuration

```bash
# .env.local in your Next.js project
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📡 API Endpoints

### Authentication Routes

#### POST `/api/auth/signup`
Register a new user
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### POST `/api/auth/login`
Login user
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### POST `/api/auth/logout`
Logout user (clears httpOnly cookie)

#### POST `/api/auth/forgot-password`
Send password reset email
```json
{
  "email": "john@example.com"
}
```

#### PATCH `/api/auth/reset-password/:token`
Reset password with token
```json
{
  "password": "NewSecurePass123"
}
```

### User Routes

#### GET `/api/user/profile`
Get current user profile (requires authentication)

#### PUT `/api/user/profile`
Update user profile (requires authentication)
```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com"
}
```

## 🛡️ Security Features Explained

### 1. **Password Security**
- **Bcrypt Hashing**: Passwords hashed with 12 salt rounds
- **Password Requirements**: Minimum 6 chars, uppercase, lowercase, number
- **No Password Exposure**: Passwords never returned in API responses

### 2. **JWT Security**
- **httpOnly Cookies**: Prevents XSS attacks
- **Secure Flag**: HTTPS-only cookies in production
- **SameSite**: CSRF protection
- **Token Expiration**: Configurable expiration times

### 3. **Rate Limiting**
- **Auth Routes**: 15 requests per 15 minutes
- **General Routes**: 100 requests per 15 minutes
- **IP-based**: Per-IP address limiting

### 4. **Input Validation**
- **Server-side Validation**: Express-validator for all inputs
- **Email Validation**: Proper email format checking
- **Sanitization**: MongoDB injection prevention

### 5. **Security Headers**
- **Helmet.js**: Comprehensive security headers
- **CORS**: Configured for specific origins
- **Content Security Policy**: XSS protection

### 6. **Error Handling**
- **Email Enumeration Prevention**: Consistent responses
- **Detailed Logging**: Server-side error logging
- **Generic Client Errors**: No sensitive info exposure

## 🔧 Customization

### Adding New Routes

1. **Create Controller**:
```javascript
// controllers/newController.js
const newFeature = async (req, res) => {
  try {
    // Your logic here
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { newFeature };
```

2. **Create Route**:
```javascript
// routes/newRoutes.js
const express = require('express');
const { authenticate } = require('../middleware/auth');
const { newFeature } = require('../controllers/newController');

const router = express.Router();
router.get('/feature', authenticate, newFeature);

module.exports = router;
```

3. **Add to App**:
```javascript
// app.js
const newRoutes = require('./routes/newRoutes');
app.use('/api/new', newRoutes);
```

### Email Configuration

For Gmail:
1. Enable 2-Factor Authentication
2. Generate App Password
3. Use App Password in `EMAIL_PASSWORD`

For other providers:
- Update `EMAIL_HOST` and `EMAIL_PORT`
- Check provider-specific settings

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_super_secure_production_jwt_secret_minimum_32_characters
FRONTEND_URL=https://yourdomain.com
```

### Security Checklist

- [ ] Use strong JWT secret (32+ characters)
- [ ] Enable HTTPS in production
- [ ] Use MongoDB Atlas or secure MongoDB instance
- [ ] Configure proper CORS origins
- [ ] Set up email service (SendGrid, etc.)
- [ ] Enable rate limiting
- [ ] Monitor error logs
- [ ] Regular security updates

## 📝 License

MIT License - feel free to use this template for your projects!

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

If you have any questions or issues:
- Check the existing issues
- Create a new issue with detailed description
- Include error logs and environment details

---

**Happy Coding! 🚀**#   B a c k e n d - T e m p l a t e  
 