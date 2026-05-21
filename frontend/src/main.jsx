import React from 'react';

import ReactDOM from 'react-dom/client';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import './index.css';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

function ProtectedRoute({ children }) {

  const token =
    localStorage.getItem('token');

  return token
    ? children
    : <Navigate to="/" />;

}

ReactDOM.createRoot(
  document.getElementById('root')
).render(

  <React.StrictMode>

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  </React.StrictMode>

);