<div align="center">

# 🚀 Secure MERN Backend Template

![Node.js](https://img.shields.io/badge/node.js-18+-green.svg)
![Express](https://img.shields.io/badge/express-5.x-blue.svg)
![MongoDB](https://img.shields.io/badge/mongodb-6.x-green.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Security](https://img.shields.io/badge/security-enterprise_grade-brightgreen.svg)

**A production-ready, secure backend template for MERN stack applications with complete authentication flow and enterprise-level security protocols.**

[Features](#-features) • [Quick Start](#-quick-start) • [Next.js Integration](#-nextjs-integration) • [API Reference](#-api-reference) • [Security](#-security-features) • [Deployment](#-deployment)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [🔗 Next.js Integration](#-nextjs-integration)
- [📡 API Reference](#-api-reference)
- [🛡️ Security Features](#️-security-features)
- [🔧 Customization](#-customization)
- [🚀 Deployment](#-deployment)
- [📞 Support](#-support)

---

## ✨ Features

<table>
<tr>
<td>

### 🛡️ **Security First**
- ✅ **Password Security**: Bcrypt hashing (12 salt rounds)
- ✅ **JWT Authentication**: httpOnly cookies + headers
- ✅ **Rate Limiting**: Brute force protection
- ✅ **Input Validation**: Comprehensive validation
- ✅ **Security Headers**: Helmet.js protection
- ✅ **NoSQL Injection**: MongoDB injection prevention
- ✅ **CORS**: Secure cross-origin configuration
- ✅ **Environment Validation**: Joi-based validation

</td>
<td>

### 🔐 **Authentication**
- 👤 User registration & validation
- 🔑 Secure login/logout
- 📧 Password reset via email
- 🎫 JWT token management
- 🚫 Email enumeration prevention
- 🔒 Session security

</td>
</tr>
<tr>
<td>

### 📧 **Email System**
- 📬 Password reset emails
- ⚙️ Configurable SMTP settings
- 🎨 Professional email templates
- 🌐 Generic branding support

</td>
<td>

### ⚡ **Performance**
- 🚦 Request rate limiting
- 🛠️ Error handling middleware
- 🧹 Input sanitization
- 🔧 Environment-based config

</td>
</tr>
</table>

---

## 📁 Project Structure

```
📦 backend_template/
├── 📂 config/
│   ├── 🗄️ database.js          # MongoDB connection
│   └── ✅ envValidation.js     # Environment validation
├── 📂 controllers/
│   ├── 🔐 authController.js    # Authentication logic
│   └── 👤 userController.js    # User management
├── 📂 middleware/
│   ├── 🔒 auth.js              # JWT verification
│   ├── 🚦 rateLimiter.js       # Rate limiting configs
│   └── ✅ validation.js        # Input validation
├── 📂 models/
│   └── 👤 User.js              # User schema & methods
├── 📂 routes/
│   ├── 🔐 authRoutes.js        # Authentication endpoints
│   └── 👤 userRoutes.js        # User endpoints
├── 📂 utils/
│   ├── 📧 email.js             # Email utilities
│   └── 🎫 jwt.js               # JWT utilities
├── 🚀 app.js                   # Express app setup
├── 📦 package.json             # Dependencies
└── 🔧 .env.example             # Environment template
```

---

## 🚀 Quick Start

### 📋 Prerequisites

![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green?style=flat-square&logo=mongodb)
![npm](https://img.shields.io/badge/npm-8+-red?style=flat-square&logo=npm)

### 1️⃣ Installation

```bash
# 📥 Clone or download this template
git clone <your-repo-url>
cd backend_template

# 📦 Install dependencies
npm install
```

### 2️⃣ Environment Setup

```bash
# 📋 Copy environment template
cp .env.example .env

# ✏️ Edit .env with your configurations
```

<details>
<summary><strong>📝 Required Environment Variables</strong></summary>

```env
# 🖥️ Server Configuration
NODE_ENV=development
PORT=5000

# 🗄️ Database
MONGODB_URI=mongodb://localhost:27017/your_database_name

# 🎫 JWT Configuration (Generate secure 32+ character secret)
JWT_SECRET=your_super_secure_jwt_secret_key_here_minimum_32_chars
JWT_EXPIRES_IN=7d
COOKIE_EXPIRES_IN=7

# 🔄 Password Reset
RESET_TOKEN_EXPIRE=10

# 🏷️ App Configuration
APP_NAME=Your App Name

# 📧 Email Configuration
EMAIL_FROM=noreply@yourdomain.com
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password_here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587

# 🌐 Frontend URL
FRONTEND_URL=http://localhost:3000
```

</details>

### 3️⃣ Database Setup

```bash
# 🗄️ Local MongoDB
mongod

# ☁️ Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in .env with your Atlas connection string
```

### 4️⃣ Start Development Server

```bash
# 🔥 Start with nodemon (auto-restart)
npm run dev

# 🚀 Or start normally
node app.js
```

<div align="center">

**🎉 Server will run on `http://localhost:5000`**

</div>

---

## 🔗 Next.js Integration

### 🛠️ Frontend Setup

<details>
<summary><strong>1️⃣ Install Required Packages</strong></summary>

```bash
# In your Next.js project
npm install axios js-cookie
npm install -D @types/js-cookie  # If using TypeScript
```

</details>

<details>
<summary><strong>2️⃣ Create API Service</strong></summary>

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
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

</details>

<details>
<summary><strong>3️⃣ Authentication Context</strong></summary>

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

</details>

<details>
<summary><strong>4️⃣ Wrap Your App</strong></summary>

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

</details>

<details>
<summary><strong>5️⃣ Example Login Component</strong></summary>

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

</details>

<details>
<summary><strong>6️⃣ Protected Routes</strong></summary>

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

</details>

<details>
<summary><strong>7️⃣ Environment Configuration</strong></summary>

```bash
# .env.local in your Next.js project
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

</details>

---

## 📡 API Reference

### 🔐 Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Login user |
| `POST` | `/api/auth/logout` | Logout user (clears cookies) |
| `POST` | `/api/auth/forgot-password` | Send password reset email |
| `PATCH` | `/api/auth/reset-password/:token` | Reset password with token |

<details>
<summary><strong>📝 Request/Response Examples</strong></summary>

#### `POST /api/auth/signup`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### `POST /api/auth/login`
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### `POST /api/auth/forgot-password`
```json
{
  "email": "john@example.com"
}
```

#### `PATCH /api/auth/reset-password/:token`
```json
{
  "password": "NewSecurePass123"
}
```

</details>

### 👤 User Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/user/profile` | Get current user profile | ✅ |
| `PUT` | `/api/user/profile` | Update user profile | ✅ |

---

## 🛡️ Security Features

<table>
<tr>
<th>🔐 Authentication & Authorization</th>
<th>🔒 Injection Protection</th>
</tr>
<tr>
<td>

- ✅ **Password Security**: Bcrypt (12 salt rounds)
- ✅ **JWT Tokens**: httpOnly cookies + headers  
- ✅ **Rate Limiting**: 15 auth requests/15min
- ✅ **Session Security**: Secure, SameSite cookies
- ✅ **Token Expiration**: Configurable lifetimes

</td>
<td>

- ✅ **NoSQL Injection**: MongoDB sanitization
- ✅ **Input Validation**: Express-validator
- ✅ **Email Validation**: Format & normalization
- ✅ **XSS Protection**: Security headers
- ✅ **CSRF Protection**: SameSite cookies

</td>
</tr>
</table>

<table>
<tr>
<th>🌐 Network Security</th>
<th>📧 Email Security</th>
</tr>
<tr>
<td>

- ✅ **Rate Limiting**: 100 requests/15min general
- ✅ **CORS**: Origin allowlisting
- ✅ **Security Headers**: Helmet.js
- ✅ **Payload Limits**: 10MB JSON limit
- ✅ **Error Handling**: No info disclosure

</td>
<td>

- ✅ **Reset Tokens**: Cryptographically secure
- ✅ **Email Enumeration**: Prevention measures
- ✅ **Token Expiration**: Time-limited validity
- ✅ **Single Use**: Tokens invalidated after use
- ✅ **Consistent Responses**: Timing attack prevention

</td>
</tr>
</table>

---

## 🔧 Customization

### 🔗 Adding New Routes

<details>
<summary><strong>Step-by-step guide</strong></summary>

**1. Create Controller:**
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

**2. Create Route:**
```javascript
// routes/newRoutes.js
const express = require('express');
const { authenticate } = require('../middleware/auth');
const { newFeature } = require('../controllers/newController');

const router = express.Router();
router.get('/feature', authenticate, newFeature);

module.exports = router;
```

**3. Add to App:**
```javascript
// app.js
const newRoutes = require('./routes/newRoutes');
app.use('/api/new', newRoutes);
```

</details>

### 📧 Email Configuration

<details>
<summary><strong>Gmail Setup</strong></summary>

1. ✅ Enable 2-Factor Authentication
2. 🔑 Generate App Password  
3. 🔧 Use App Password in `EMAIL_PASSWORD`

</details>

<details>
<summary><strong>Other Providers</strong></summary>

- 🔧 Update `EMAIL_HOST` and `EMAIL_PORT`
- 📚 Check provider-specific settings
- 🔐 Configure authentication method

</details>

---

## 🚀 Deployment

### 🌐 Production Environment Variables

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_super_secure_production_jwt_secret_minimum_32_characters
FRONTEND_URL=https://yourdomain.com
APP_NAME=Your Production App
```

### ✅ Security Checklist

<table>
<tr>
<td>

- [ ] 🔑 Strong JWT secret (32+ chars)
- [ ] 🔒 HTTPS enabled in production
- [ ] 🗄️ Secure MongoDB instance
- [ ] 🌐 Proper CORS origins

</td>
<td>

- [ ] 📧 Production email service
- [ ] 🚦 Rate limiting enabled
- [ ] 📊 Error monitoring setup
- [ ] 🔄 Regular security updates

</td>
</tr>
</table>

---

## 📄 License

<div align="center">

**MIT License** - Feel free to use this template for your projects!

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

</div>

---

## 🤝 Contributing

<div align="center">

**Contributions are welcome!**

1. 🍴 Fork the repository
2. 🌿 Create your feature branch
3. 💾 Commit your changes
4. 📤 Push to the branch
5. 🔄 Create a Pull Request

</div>

---

## 📞 Support

<div align="center">

**Need help?**

[![Issues](https://img.shields.io/badge/Issues-Welcome-brightgreen?style=for-the-badge)](https://github.com/your-username/your-repo/issues)
[![Discussions](https://img.shields.io/badge/Discussions-Open-blue?style=for-the-badge)](https://github.com/your-username/your-repo/discussions)

If you have questions or issues:
- 🔍 Check existing issues
- 📝 Create a new issue with details
- 📋 Include error logs and environment

</div>

---

<div align="center">

**⭐ If this template helped you, please star the repository! ⭐**

**Happy Coding! 🚀**

</div>