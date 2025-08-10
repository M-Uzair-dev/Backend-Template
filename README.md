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

### 🛠️ Easy Frontend Setup with Zustand

<details>
<summary><strong>1️⃣ Install Required Packages</strong></summary>

```bash
# In your Next.js project
npm install axios zustand
```

> **🔐 Note**: This backend uses **httpOnly cookies** for security, so no manual token storage needed!

</details>

<details>
<summary><strong>2️⃣ Create useApi Hook (Copy & Paste Ready)</strong></summary>

Create `hooks/useApi.js` in your Next.js project:

```javascript
// hooks/useApi.js
import { useState, useCallback } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  withCredentials: true, // 🍪 Sends httpOnly cookies automatically
  headers: {
    'Content-Type': 'application/json',
  },
});

// Global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login'; // Redirect to login on unauthorized
    }
    return Promise.reject(error);
  }
);

// 🚀 Main API Hook
export const useApi = (route, body = {}, onSuccess = () => {}, method = 'POST') => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = useCallback(async (customBody = body) => {
    try {
      setLoading(true);
      setError(null);

      let response;
      switch (method.toUpperCase()) {
        case 'GET':
          response = await api.get(route);
          break;
        case 'POST':
          response = await api.post(route, customBody);
          break;
        case 'PUT':
          response = await api.put(route, customBody);
          break;
        case 'PATCH':
          response = await api.patch(route, customBody);
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
      const errorMessage = err.response?.data?.message || 'Something went wrong';
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
    post: useCallback((postBody = body) => execute(postBody), [execute, body]),
    get: useCallback(() => execute(), [execute]),
    put: useCallback((putBody = body) => execute(putBody), [execute, body]),
    patch: useCallback((patchBody = body) => execute(patchBody), [execute, body]),
  };
};

export default api;
```

</details>

<details>
<summary><strong>3️⃣ Create State Store (Copy & Paste Ready)</strong></summary>

Create `store/authStore.js` in your Next.js project:

```javascript
// store/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../hooks/useApi';

export const useAuthStore = create(
  persist(
    (set) => ({
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

      // Check if user is logged in
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

      // Clear all data
      clear: () => set({ 
        user: null, 
        isAuthenticated: false, 
        loading: false, 
        error: null 
      }),
    }),
    {
      name: 'auth-storage',
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
<summary><strong>4️⃣ Setup App with Auth Check (Copy & Paste Ready)</strong></summary>

Update your `pages/_app.js`:

```javascript
// pages/_app.js
import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

function AuthProvider({ children }) {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    // Check if user is logged in when app starts
    checkAuth();
  }, [checkAuth]);

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

Create your `.env.local` file:

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

</details>

## 🚀 Step-by-Step Implementation Guide

### 🔑 **Step 1: Login Functionality**

<details>
<summary><strong>Complete Login Implementation</strong></summary>

**1. Create Login Page (`pages/login.js`):**

```javascript
// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useApi } from '../hooks/useApi';
import { useAuthStore } from '../store/authStore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  const setUser = useAuthStore((state) => state.setUser);
  
  // 🚀 Login API call with success callback
  const { post: login, loading, error } = useApi('/auth/login', {}, (data) => {
    setUser(data.user); // Save user to store
    router.push('/dashboard'); // Redirect to dashboard
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Email address"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Password"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

**That's it! Your login is working. Test it by:**
1. Going to `/login`
2. Entering valid credentials  
3. Getting redirected to `/dashboard`
4. User data saved in Zustand store

</details>

### ✍️ **Step 2: Signup Functionality**

<details>
<summary><strong>Complete Signup Implementation</strong></summary>

**1. Create Signup Page (`pages/signup.js`):**

```javascript
// pages/signup.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useApi } from '../hooks/useApi';
import { useAuthStore } from '../store/authStore';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  const setUser = useAuthStore((state) => state.setUser);
  
  // 🚀 Signup API call with success callback
  const { post: signup, loading, error } = useApi('/auth/signup', {}, (data) => {
    setUser(data.user); // Save user to store
    router.push('/dashboard'); // Redirect to dashboard
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup({ name, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="sr-only">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Full name"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Email address"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Password (min 6 chars, uppercase, lowercase, number)"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

**Test signup by:**
1. Going to `/signup`
2. Entering name, email, password (must have uppercase, lowercase, number)
3. Getting automatically logged in and redirected

</details>

### 🚪 **Step 3: Logout Functionality**

<details>
<summary><strong>Complete Logout Implementation</strong></summary>

**1. Create Logout Component (`components/LogoutButton.js`):**

```javascript
// components/LogoutButton.js
import { useRouter } from 'next/router';
import { useApi } from '../hooks/useApi';
import { useAuthStore } from '../store/authStore';

export default function LogoutButton({ className = "" }) {
  const router = useRouter();
  const { clear } = useAuthStore();
  
  // 🚀 Logout API call with success callback
  const { post: logout, loading } = useApi('/auth/logout', {}, () => {
    clear(); // Clear user from store
    router.push('/login'); // Redirect to login
  });

  const handleLogout = async () => {
    await logout(); // No body needed for logout
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 ${className}`}
    >
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
}
```

**2. Use in any component:**

```javascript
// pages/dashboard.js
import LogoutButton from '../components/LogoutButton';
import { useAuthStore } from '../store/authStore';

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <LogoutButton />
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome, {user?.name}!
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Email: {user?.email}
          </p>
        </div>
      </main>
    </div>
  );
}
```

</details>

### 🔄 **Step 4: Forgot Password Functionality**

<details>
<summary><strong>Complete Forgot Password Implementation</strong></summary>

**1. Create Forgot Password Page (`pages/forgot-password.js`):**

```javascript
// pages/forgot-password.js
import { useState } from 'react';
import Link from 'next/link';
import { useApi } from '../hooks/useApi';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  
  // 🚀 Forgot password API call with success callback
  const { post: forgotPassword, loading, error } = useApi('/auth/forgot-password', {}, () => {
    setSuccess(true);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword({ email });
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Check your email</h2>
            <p className="mt-2 text-sm text-gray-600">
              We've sent a password reset link to your email address.
            </p>
            <div className="mt-4">
              <Link href="/login" className="text-indigo-600 hover:text-indigo-500">
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Forgot your password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Email address"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send reset link'}
            </button>
          </div>

          <div className="text-center">
            <Link href="/login" className="text-indigo-600 hover:text-indigo-500">
              Back to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
```

**2. Create Reset Password Page (`pages/reset-password.js`):**

```javascript
// pages/reset-password.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useApi } from '../hooks/useApi';
import { useAuthStore } from '../store/authStore';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const router = useRouter();
  const { token } = router.query;
  
  const setUser = useAuthStore((state) => state.setUser);
  
  // 🚀 Reset password API call with success callback
  const { patch: resetPassword, loading, error } = useApi(
    `/auth/reset-password/${token}`, 
    {}, 
    (data) => {
      setUser(data.user); // Log user in automatically
      router.push('/dashboard');
    },
    'PATCH'
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }
    
    await resetPassword({ password });
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Invalid reset link</h2>
          <p className="mt-2 text-gray-600">This password reset link is invalid or expired.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Reset your password
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="sr-only">New Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="New password"
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Confirm new password"
            />
          </div>

          {(error || localError) && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded">
              {error || localError}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Resetting...' : 'Reset password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
```

</details>

### 📦 **Step 5: Complete State Management**

<details>
<summary><strong>Using Zustand Store in Components</strong></summary>

**1. Access user data anywhere:**

```javascript
// Any component
import { useAuthStore } from '../store/authStore';

function MyComponent() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loading = useAuthStore((state) => state.loading);
  
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please log in</div>;
  
  return (
    <div>
      <h1>Welcome {user.name}!</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}
```

**2. Update user data:**

```javascript
// Update profile component
import { useAuthStore } from '../store/authStore';
import { useApi } from '../hooks/useApi';

function UpdateProfile() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  
  const { put: updateProfile, loading } = useApi('/user/profile', {}, (data) => {
    setUser(data.user); // Updates store automatically
  }, 'PUT');
  
  const handleUpdate = async (newData) => {
    await updateProfile(newData);
  };
  
  // Component JSX here...
}
```

</details>

### 🔒 **Step 6: Protected Routes**

<details>
<summary><strong>Complete Protected Routes Implementation</strong></summary>

**1. Create Protected Route Component (`components/ProtectedRoute.js`):**

```javascript
// components/ProtectedRoute.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '../store/authStore';

export default function ProtectedRoute({ children }) {
  const { user, isAuthenticated, loading, checkAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      checkAuth().then((isAuth) => {
        if (!isAuth) {
          router.push('/login');
        }
      });
    }
  }, [isAuthenticated, loading, checkAuth, router]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render anything if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return children;
}
```

**2. Protect any page:**

```javascript
// pages/dashboard.js
import ProtectedRoute from '../components/ProtectedRoute';
import LogoutButton from '../components/LogoutButton';
import { useAuthStore } from '../store/authStore';

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-xl font-semibold">Dashboard</h1>
              <LogoutButton />
            </div>
          </div>
        </nav>
        
        <main className="max-w-7xl mx-auto py-6 px-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h2>
          <p className="mt-2 text-gray-600">{user?.email}</p>
          
          {/* Your dashboard content here */}
        </main>
      </div>
    </ProtectedRoute>
  );
}
```

**3. Or use HOC pattern:**

```javascript
// components/withAuth.js
import ProtectedRoute from './ProtectedRoute';

export function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    return (
      <ProtectedRoute>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}

// Usage:
// export default withAuth(Dashboard);
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