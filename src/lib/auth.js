
export const logout = async () => {
  try {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('staffInfo');

    window.location.href = '/';

    console.log('Logout successful');
  } catch (error) {
    console.error('Logout error:', error);
    localStorage.clear();
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('Authorization')

  return !!(token);
};

export const getCurrentStaff = () => {
  try {
    const staffInfo = localStorage.getItem('staffInfo');
    return staffInfo ? JSON.parse(staffInfo) : null;
  } catch (error) {
    console.error('Error parsing admin info:', error);
    return null;
  }
};



export const handleAuthError = () => {
  localStorage.removeItem('Authorization');
  localStorage.removeItem('staffInfo');

};

export const requireAuth = () => {
  if (!isAuthenticated()) {
    return false;
  }
  return true;
};