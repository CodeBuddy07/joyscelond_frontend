// utils/auth.js - Authentication utility functions

// Logout function
export const logout = async () => {
  try {
    // Clear all authentication data from localStorage
    localStorage.removeItem('Authorization');
    localStorage.removeItem('staffInfo');

    window.location.href = '/';
    
    console.log('Logout successful');
  } catch (error) {
    console.error('Logout error:', error);
    
    // Even if backend logout fails, clear local storage and redirect
    localStorage.clear();
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('Authorization')
  
  return !!(token);
};

// Get current admin info
export const getCurrentStaff = () => {
  try {
    const staffInfo = localStorage.getItem('staffInfo');
    return staffInfo ? JSON.parse(staffInfo) : null;
  } catch (error) {
    console.error('Error parsing admin info:', error);
    return null;
  }
};



// Auto logout when token expires or becomes invalid
export const handleAuthError = () => {
  localStorage.removeItem('Authorization');
  localStorage.removeItem('staffInfo');
  
};

// Protected route checker
export const requireAuth = () => {
  if (!isAuthenticated()) {
    return false;
  }
  return true;
};