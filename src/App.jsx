import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Login from './pages/Login';
import Home from './pages/Home';
import AllVideo from './pages/AllVidoes';
import UserVideo from './pages/UserVideo';
import ProtectedRoute from './helper/ProtectedRoute';// Import the ProtectedRoute component

function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/allvideos"
            element={
              <ProtectedRoute>
                <AllVideo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/uservideo"
            element={
              <ProtectedRoute>
                <UserVideo />
              </ProtectedRoute>
            }
          />

          {/* Catch-all route for redirection */}
          <Route
            path="*"
            element={<Navigate to="/login" replace />}
          />
        </Routes>
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
