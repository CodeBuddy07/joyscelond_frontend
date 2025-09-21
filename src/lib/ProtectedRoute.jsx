
import React, { useEffect, useState } from 'react';
import { getCurrentStaff, handleAuthError, isAuthenticated, logout } from './auth';
import { toast } from 'sonner';


// Protected Route Component
export const ProtectedRoute = ({ children, requiredRole = null }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      // Check if user is authenticated
      if (!isAuthenticated()) {
        handleAuthError();
        return;
      }

      // Check role-based access if required
      if (requiredRole) {
        const admin = getCurrentStaff();
        if (!admin || admin.role !== requiredRole) {
          // User doesn't have required role
          setIsAuthorized(false);
          setIsLoading(false);
          logout();
          toast.error("You don't have permission to access this.");
          return;
        }
      }

      setIsAuthorized(true);
      setIsLoading(false);
    };

    checkAuth();
  }, [requiredRole]);

  if (isLoading) {
    return (
      <></>
    );
  }

  if (!isAuthorized) {
    logout();
    return (
      <></>
    );
  }

  return children;
};

// (useAuth hook has been moved to a separate file: useAuth.js)