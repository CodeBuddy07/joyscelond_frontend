import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import axiosSecure from '../../lib/axiosSecure';


export default function Login() {
  const [eventID, setEventID] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset error state
    setError('');

    // Validate inputs
    if (!eventID || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axiosSecure.post('/api/v1/auth/staff', {
        eventID: eventID,
        password: password
      });

      if (response.data.success) {
        // Store token in localStorage for future requests
        localStorage.setItem('Authorization', response.data.data.token);

        // Store admin info if needed
        localStorage.setItem('staffInfo', JSON.stringify({
          eventID: response.data.data.user,
          role: response.data.data.role
        }));

        // Redirect to dashboard or another page
        window.location.href = '/';

        console.log('Login successful:', response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);

      // Handle different error scenarios
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || 'Login failed';
        setError(errorMessage);

        // Handle specific status codes
        switch (error.response.status) {
          case 400:
            setError('Please provide valid event id and password');
            break;
          case 401:
            setError('Invalid event id or password');
            break;
          case 403:
            setError('Account is not verified');
            break;
          default:
            setError(errorMessage);
        }
      } else if (error.request) {
        // Request made but no response received
        setError('Unable to connect to server. Please try again.');
      } else {
        // Something else happened
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Event ID Field */}
      <div>
        <label className="block text-gray-600 text-sm mb-2">
          Event ID
        </label>
        <input
          type="eventID"
          value={eventID}
          onChange={(e) => setEventID(e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-gray-700 bg-gray-50"
          placeholder="Enter your event ID"
          required
          disabled={isLoading}
        />
      </div>

      {/* Password Field */}
      <div>
        <label className="block text-gray-600 text-sm mb-2">
          PASSWORD
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-gray-700 bg-gray-50 pr-12"
            placeholder="Enter your password"
            required
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            disabled={isLoading}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        onClick={handleLogin}
        disabled={isLoading}
        className={`w-full font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 ${isLoading
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-cyan-400 hover:bg-cyan-500 text-white'
          }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Logging in...
          </div>
        ) : (
          'Log In'
        )}
      </button>
    </div>
  );
}