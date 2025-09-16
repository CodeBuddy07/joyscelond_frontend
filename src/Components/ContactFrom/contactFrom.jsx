import { useState } from 'react';
import { Mail, Phone, User, MessageSquare, Send, Check, ArrowRight, X, AlertCircle } from 'lucide-react';
import axiosSecure from '../../lib/axiosSecure';

export default function GeneralQueryCard() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (showError) {
      setShowError(false);
      setErrorMessage('');
    }
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields');
      setShowError(true);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      setShowError(true);
      return;
    }

    setIsSubmitting(true);
    setShowError(false);



    try {
      // Use the reusable email sender
      // const result = await emailSender.sendEmailWithConfirmation(formData);
      const result = await axiosSecure.post('api/v1/email/send', { ...formData, requestType: "general" });

      console.log(result);

      if (!result.data.success) {
        throw new Error(result.message || 'Failed to send message');
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });

      setShowSuccess(true);

      // Hide success message and form after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        setShowContactForm(false);
      }, 3000);

    } catch (error) {
      console.log('Fucking inside Catch:');
      console.error('Error sending message:', error);
      setErrorMessage(error.message || 'Failed to send message. Please try again.');
      setShowError(true);
    } finally {
      console.log('Fucking inside finally:');
      setIsSubmitting(false);
    }
  };

  const handleCardClick = () => {
    setShowContactForm(true);
  };

  const handleCloseForm = () => {
    setShowContactForm(false);
    setShowError(false);
    setErrorMessage('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <div id='contact' className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            <Check className="w-5 h-5" />
            <span className="font-medium">Message sent successfully! 🎉</span>
          </div>
        </div>
      )}

      {/* Error Toast */}
      {showError && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 max-w-md">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium">{errorMessage}</span>
            <button
              onClick={() => setShowError(false)}
              className="ml-2 hover:bg-red-600 rounded p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {!showContactForm ? (
          /* Query Card */
          <div className="flex items-center justify-center min-h-screen">
            <div
              onClick={handleCardClick}
              className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-3xl border border-gray-100 group max-w-md"
            >
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="w-10 h-10 text-white" />
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  General Query
                </h2>

                <p className="text-gray-600 text-lg">
                  Have questions or need assistance? We're here to help!
                </p>

                <div className="flex items-center justify-center space-x-2 text-blue-500 group-hover:text-blue-700 transition-colors duration-300">
                  <span className="font-semibold text-lg">Click Here to Contact Us</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Contact Form */
          <div className="py-8">
            {/* Header with Close Button */}
            <div className="flex justify-between items-center mb-8">
              <div className="text-center flex-1">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#2AD4FF] to-[#5FFDDE] bg-clip-text text-transparent mb-4">
                  Get In Touch
                </h1>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg px-4">
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </div>
              <button
                onClick={handleCloseForm}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 ml-4"
              >
                <X className="w-6 h-6 text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            {/* Contact Form */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 p-6 sm:p-8 lg:p-10 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 mr-3 text-sky-400" />
                Send Message
              </h2>

              <div className="space-y-5 sm:space-y-6">
                {/* Name Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-11 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:border-blue-500 focus:ring-0 transition-all duration-300 hover:border-gray-300 bg-white/50 backdrop-blur-sm text-sm sm:text-base"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-11 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:border-blue-500 focus:ring-0 transition-all duration-300 hover:border-gray-300 bg-white/50 backdrop-blur-sm text-sm sm:text-base"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-11 pr-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:border-blue-500 focus:ring-0 transition-all duration-300 hover:border-gray-300 bg-white/50 backdrop-blur-sm text-sm sm:text-base"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 sm:py-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:border-blue-500 focus:ring-0 transition-all duration-300 hover:border-gray-300 resize-none bg-white/50 backdrop-blur-sm text-sm sm:text-base"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#2AD4FF] to-[#5FFDDE] hover:to-sky-300 text-white font-bold py-4 sm:py-5 px-6 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 text-base sm:text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}