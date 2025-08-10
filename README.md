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

### 🛠️ Modern Frontend Setup with Zustand

<details>
<summary><strong>1️⃣ Install Required Packages</strong></summary>

```bash
# In your Next.js project
npm install axios zustand
npm install -D @types/node  # If using TypeScript
```

> **🔐 Note**: This backend uses **httpOnly cookies** for security, so no manual token storage needed!

</details>

<details>
<summary><strong>2️⃣ Create useApi Hook</strong></summary>

```javascript
// hooks/useApi.js
import { useState, useCallback } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // 🍪 Important: Includes httpOnly cookies automatically
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login on unauthorized
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * 🚀 Universal API Hook
 * @param {string} route - API endpoint (e.g., '/auth/login')
 * @param {Object} body - Request body for POST/PUT/PATCH
 * @param {Function} onSuccess - Callback function on successful response
 * @param {string} method - HTTP method (default: 'POST')
 */
export const useApi = (route, body = {}, onSuccess = () => {}, method = 'POST') => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = useCallback(async (customBody = body) => {
    try {
      setLoading(true);
      setError(null);

      let response;
      const config = { ...customBody };

      switch (method.toUpperCase()) {
        case 'GET':
          response = await api.get(route);
          break;
        case 'POST':
          response = await api.post(route, config);
          break;
        case 'PUT':
          response = await api.put(route, config);
          break;
        case 'PATCH':
          response = await api.patch(route, config);
          break;
        case 'DELETE':
          response = await api.delete(route);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }

      setData(response.data);
      onSuccess(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Something went wrong';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [route, body, onSuccess, method]);

  return {
    execute,
    loading,
    error,
    data,
    // Utility methods for different HTTP methods
    get: useCallback(() => execute(), [execute]),
    post: useCallback((postBody = body) => execute(postBody), [execute, body]),
    put: useCallback((putBody = body) => execute(putBody), [execute, body]),
    patch: useCallback((patchBody = body) => execute(patchBody), [execute, body]),
    delete: useCallback(() => execute(), [execute]),
  };
};

// 🎯 Specialized hooks for common operations
export const useLogin = (onSuccess = () => {}) => {
  return useApi('/auth/login', {}, onSuccess, 'POST');
};

export const useSignup = (onSuccess = () => {}) => {
  return useApi('/auth/signup', {}, onSuccess, 'POST');
};

export const useLogout = (onSuccess = () => {}) => {
  return useApi('/auth/logout', {}, onSuccess, 'POST');
};

export const useForgotPassword = (onSuccess = () => {}) => {
  return useApi('/auth/forgot-password', {}, onSuccess, 'POST');
};

export const useResetPassword = (token, onSuccess = () => {}) => {
  return useApi(`/auth/reset-password/${token}`, {}, onSuccess, 'PATCH');
};

export const useProfile = (onSuccess = () => {}) => {
  return useApi('/user/profile', {}, onSuccess, 'GET');
};

export default api;
```

</details>

<details>
<summary><strong>3️⃣ Zustand Auth Store</strong></summary>

```javascript
// store/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../hooks/useApi';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user, error: null }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),

      // Auth Methods
      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const response = await api.post('/auth/login', { email, password });
          const { user } = response.data;
          set({ user, isAuthenticated: true, loading: false });
          return { success: true };
        } catch (error) {
          const message = error.response?.data?.message || 'Login failed';
          set({ error: message, loading: false });
          return { success: false, error: message };
        }
      },

      signup: async (name, email, password) => {
        set({ loading: true, error: null });
        try {
          const response = await api.post('/auth/signup', { name, email, password });
          const { user } = response.data;
          set({ user, isAuthenticated: true, loading: false });
          return { success: true };
        } catch (error) {
          const message = error.response?.data?.message || 'Signup failed';
          set({ error: message, loading: false });
          return { success: false, error: message };
        }
      },

      logout: async () => {
        set({ loading: true });
        try {
          await api.post('/auth/logout');
          set({ user: null, isAuthenticated: false, loading: false });
          return { success: true };
        } catch (error) {
          // Even if server logout fails, clear local state
          set({ user: null, isAuthenticated: false, loading: false });
          return { success: true };
        }
      },

      checkAuth: async () => {
        set({ loading: true });
        try {
          const response = await api.get('/user/profile');
          const { user } = response.data;
          set({ user, isAuthenticated: true, loading: false });
          return true;
        } catch (error) {
          set({ user: null, isAuthenticated: false, loading: false });
          return false;
        }
      },

      forgotPassword: async (email) => {
        set({ loading: true, error: null });
        try {
          const response = await api.post('/auth/forgot-password', { email });
          set({ loading: false });
          return { success: true, message: response.data.message };
        } catch (error) {
          const message = error.response?.data?.message || 'Failed to send reset email';
          set({ error: message, loading: false });
          return { success: false, error: message };
        }
      },

      resetPassword: async (token, password) => {
        set({ loading: true, error: null });
        try {
          const response = await api.patch(`/auth/reset-password/${token}`, { password });
          const { user } = response.data;
          set({ user, isAuthenticated: true, loading: false });
          return { success: true };
        } catch (error) {
          const message = error.response?.data?.message || 'Password reset failed';
          set({ error: message, loading: false });
          return { success: false, error: message };
        }
      },

      // Clear all auth data
      clear: () => set({ 
        user: null, 
        isAuthenticated: false, 
        loading: false, 
        error: null 
      }),
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
```

</details>

<details>
<summary><strong>4️⃣ App Setup with Auth Check</strong></summary>

```javascript
// pages/_app.js or app/layout.js
import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

function AuthProvider({ children }) {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    // Check authentication on app start
    const initAuth = async () => {
      setLoading(true);
      await checkAuth();
      setLoading(false);
    };
    
    initAuth();
  }, [checkAuth, setLoading]);

  return children;
}

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
<summary><strong>5️⃣ Modern Login Component</strong></summary>

```javascript
// components/LoginForm.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useLogin } from '../hooks/useApi';
import { useAuthStore } from '../store/authStore';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  // 🎯 Using the auth store
  const setUser = useAuthStore((state) => state.setUser);
  
  // 🚀 Using the specialized useLogin hook
  const { post: login, loading, error } = useLogin((data) => {
    setUser(data.user);
    router.push('/dashboard');
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your email"
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your password"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Logging in...
          </>
        ) : (
          'Sign In'
        )}
      </button>
    </form>
  );
}
```

</details>

<details>
<summary><strong>6️⃣ Protected Route Component</strong></summary>

```javascript
// components/ProtectedRoute.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '../store/authStore';

export default function ProtectedRoute({ children, redirectTo = '/login' }) {
  const { isAuthenticated, loading, checkAuth } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    loading: state.loading,
    checkAuth: state.checkAuth,
  }));
  const router = useRouter();

  useEffect(() => {
    // If not authenticated and not loading, check auth status
    if (!isAuthenticated && !loading) {
      checkAuth().then((isAuth) => {
        if (!isAuth) {
          router.push(redirectTo);
        }
      });
    }
  }, [isAuthenticated, loading, checkAuth, router, redirectTo]);

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If not authenticated, don't render children
  if (!isAuthenticated) {
    return null;
  }

  return children;
}

// 🎯 Usage in pages
export function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    return (
      <ProtectedRoute>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}
```

</details>

<details>
<summary><strong>7️⃣ Advanced useApi Examples</strong></summary>

```javascript
// components/UserProfile.js
import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { useAuthStore } from '../store/authStore';

export default function UserProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  // 🚀 GET user profile
  const { 
    get: getProfile, 
    loading: profileLoading 
  } = useApi('/user/profile', {}, (data) => {
    setUser(data.user);
    setName(data.user.name);
    setEmail(data.user.email);
  }, 'GET');

  // 🚀 UPDATE user profile
  const { 
    put: updateProfile, 
    loading: updateLoading 
  } = useApi('/user/profile', {}, (data) => {
    setUser(data.user);
    alert('Profile updated successfully!');
  }, 'PUT');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    } else {
      getProfile();
    }
  }, [user, getProfile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile({ name, email });
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">User Profile</h2>
      
      {profileLoading ? (
        <div>Loading profile...</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={updateLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {updateLoading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      )}
    </div>
  );
}

// 🚀 Example: Custom API Hook Usage
function TodoList() {
  const [todos, setTodos] = useState([]);

  // Custom API call with callback
  const { post: addTodo, loading: addingTodo } = useApi('/todos', {}, (data) => {
    setTodos(prev => [...prev, data.todo]);
  });

  const { get: fetchTodos, loading: fetchingTodos } = useApi('/todos', {}, (data) => {
    setTodos(data.todos);
  }, 'GET');

  const handleAddTodo = async (title) => {
    await addTodo({ title, completed: false });
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div>
      {fetchingTodos ? (
        <div>Loading todos...</div>
      ) : (
        <div>
          {todos.map(todo => (
            <div key={todo.id}>{todo.title}</div>
          ))}
          <button
            onClick={() => handleAddTodo('New Todo')}
            disabled={addingTodo}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {addingTodo ? 'Adding...' : 'Add Todo'}
          </button>
        </div>
      )}
    </div>
  );
}
```

</details>

<details>
<summary><strong>8️⃣ Environment Configuration</strong></summary>

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