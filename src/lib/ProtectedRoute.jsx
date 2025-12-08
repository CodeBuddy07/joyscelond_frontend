
import React, { useEffect, useState } from 'react';
import { getCurrentStaff, handleAuthError, isAuthenticated, logout } from './auth';
import { toast } from 'sonner';


export const ProtectedRoute = ({ children, requiredRole = null }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated()) {
        handleAuthError();
        return;
      }

      if (requiredRole) {
        const admin = getCurrentStaff();
        if (!admin || admin.role !== requiredRole) {
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