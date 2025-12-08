import React, { useState } from 'react';
import { Eye, EyeOff, LogIn, User, Lock, Sparkles, Instagram, Mail } from 'lucide-react';
import axiosSecure from '../../lib/axiosSecure';

const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z" />
  </svg>
);

const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
  </svg>
);

export default function Login() {
  const [eventID, setEventID] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdminHelpOpen, setAdminHelpOpen] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    setError('');

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
        localStorage.setItem('Authorization', response.data.data.token);

        localStorage.setItem('staffInfo', JSON.stringify({
          eventID: response.data.data.user,
          role: response.data.data.role
        }));

        window.location.href = '/';

        console.log('Login successful:', response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);

      if (error.response) {
        const errorMessage = error.response.data?.message || 'Login failed';
        setError(errorMessage);

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
        setError('Unable to connect to server. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full">
            <LogIn className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-gray-600">Sign in to access your Event Dashboard</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Event ID
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={eventID}
              onChange={(e) => setEventID(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white placeholder-gray-400 text-gray-900 transition-colors duration-200"
              placeholder="Enter your event ID"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white placeholder-gray-400 text-gray-900 transition-colors duration-200"
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
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

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center items-center py-3 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium ${isLoading
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </>
          ) : (
            <>
              <LogIn className="w-5 h-5 mr-2" />
              Log In
            </>
          )}
        </button>
      </form>

      <div className="my-6 flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-500 text-sm">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <a onClick={() => setAdminHelpOpen(true)} href="#" className="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200">
            Contact administrator
          </a>
        </p>
      </div>

      {isAdminHelpOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 relative animate-scaleIn">
            <button
              onClick={() => setAdminHelpOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-2xl font-bold transition-colors duration-200"
              aria-label="Close login"
            >
              ×
            </button>

            <div className="mt-2">
              <div class="max-w-md mx-auto bg-white rounded-xl overflow-hidden p-6">
                <div class="text-center mb-6">
                  <h3 class="text-xl font-bold text-gray-800 mb-2">Need Help? Contact Us</h3>
                  <p class="text-gray-600 text-sm">Reach out to our support team through these platforms</p>
                </div>

                <div class="flex flex-col gap-3">
                  <a href="https://wa.me/+447454008119" class="flex items-center gap-3 shadow-md bg-green-50 hover:bg-green-100 text-green-600 px-4 py-3 rounded-lg transition-colors duration-200">
                    <WhatsAppIcon className="w-5 h-5" />
                    <span class="text-sm font-medium">WhatsApp Support</span>
                  </a>

                  <a href="mailto:Kutmasterz14@gmail.com" class="flex items-center gap-3 shadow-md bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg transition-colors duration-200">
                    <Mail className="w-5 h-5" />
                    <span class="text-sm font-medium">Email Support</span>
                  </a>

                  <a href="https://www.instagram.com/kutmasterzlondon/" class="flex items-center gap-3 shadow-md bg-pink-50 hover:bg-pink-100 text-pink-600 px-4 py-3 rounded-lg transition-colors duration-200">
                    <Instagram className="w-5 h-5" />
                    <span class="text-sm font-medium">Instagram DM</span>
                  </a>

                  <a href="https://www.tiktok.com/@kutmasterz" class="flex items-center gap-3 shadow-md bg-black hover:bg-gray-800 text-white px-4 py-3 rounded-lg transition-colors duration-200">
                    <TikTokIcon className="w-5 h-5" />
                    <span class="text-sm font-medium">TikTok Support</span>
                  </a>
                </div>

                <div class="mt-6 text-center">
                  <p class="text-xs text-gray-500">We're here to help you with any questions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 right-4 opacity-10">
        <Sparkles className="h-24 w-24 text-blue-500" />
      </div>
    </div>
  );
}