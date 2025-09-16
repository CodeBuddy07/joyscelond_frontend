import React, { useState, useEffect } from 'react';
import { Star, Plus, X, ChevronLeft, ChevronRight, User } from 'lucide-react';
import axiosSecure from '../../lib/axiosSecure';

function TestimonialSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    starCount: 5,
    review: ''
  });

  // Items to show per slide (responsive)
  const itemsPerSlide = {
    mobile: 1,
    tablet: 2,
    desktop: 2
  };

  // Get current items per slide based on screen size
  const getCurrentItemsPerSlide = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return itemsPerSlide.desktop;
      if (window.innerWidth >= 768) return itemsPerSlide.tablet;
    }
    return itemsPerSlide.mobile;
  };

  const [currentItemsPerSlide, setCurrentItemsPerSlide] = useState(getCurrentItemsPerSlide());

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setCurrentItemsPerSlide(getCurrentItemsPerSlide());
      setCurrentIndex(0); // Reset to first slide on resize
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch testimonials from API
  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get('/api/v1/review');
      setTestimonials(response.data.data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      // Fallback to empty array if API fails
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  // Load testimonials on component mount
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-orange-400 fill-orange-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const renderClickableStars = (rating, onRatingChange) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 cursor-pointer transition-colors ${
          index < rating ? 'text-orange-400 fill-orange-400' : 'text-gray-300 hover:text-orange-200'
        }`}
        onClick={() => onRatingChange(index + 1)}
      />
    ));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.review.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axiosSecure.post('/api/v1/review/create', formData);
      
      if (response.data.success) {
        // Add new testimonial to the beginning of the list
        setTestimonials(prev => [response.data.data, ...prev]);
        
        // Reset form
        setFormData({
          name: '',
          starCount: 5,
          review: ''
        });
        setShowForm(false);
        
        // Reset slider to show the new testimonial
        setCurrentIndex(0);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Slider navigation
  const maxIndex = Math.max(0, Math.ceil(testimonials.length / currentItemsPerSlide) - 1);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Get visible testimonials for current slide
  const getVisibleTestimonials = () => {
    const startIndex = currentIndex * currentItemsPerSlide;
    const endIndex = startIndex + currentItemsPerSlide;
    return testimonials.slice(startIndex, endIndex);
  };

  // Auto-slide functionality
  useEffect(() => {
    if (testimonials.length <= currentItemsPerSlide) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000); // Auto slide every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length, currentItemsPerSlide, maxIndex]);

  return (
    <div className="bg-white py-16 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Side - Heading and Button */}
          <div className="lg:pr-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-8">
              What Our Valuable
              <br />
              Clients Say About Us
            </h2>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-cyan-400 hover:bg-cyan-500 text-white px-6 py-3 rounded font-medium transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Review
            </button>
          </div>

          {/* Right Side - Testimonials Slider */}
          <div className="relative">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
              </div>
            ) : testimonials.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
              </div>
            ) : (
              <>
                {/* Testimonials Container */}
                <div className="space-y-6">
                  {getVisibleTestimonials().map((testimonial) => (
                    <div
                      key={testimonial._id}
                      className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      {/* Star Rating */}
                      <div className="flex items-center mb-4">
                        {renderStars(testimonial.starCount)}
                      </div>

                      {/* Review Text */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {testimonial.review}
                      </p>

                      {/* User Info */}
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full mr-3 flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm">
                            {testimonial.name}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {new Date(testimonial.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation Controls */}
                {testimonials.length > currentItemsPerSlide && (
                  <div className="flex items-center justify-between mt-6">
                    <button
                      onClick={prevSlide}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      aria-label="Previous testimonials"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>

                    {/* Pagination dots */}
                    <div className="flex space-x-2">
                      {[...Array(maxIndex + 1)].map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentIndex ? 'bg-cyan-400' : 'bg-gray-300'
                          }`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={nextSlide}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      aria-label="Next testimonials"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Add Review Modal/Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Add New Review</h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                disabled={isSubmitting}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Enter your name"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex items-center space-x-1">
                  {renderClickableStars(formData.starCount, (rating) => handleInputChange('starCount', rating))}
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review *
                </label>
                <textarea
                  value={formData.review}
                  onChange={(e) => handleInputChange('review', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                  placeholder="Write your review here..."
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Submit Button */}
              <div className="flex flex-col space-y-3 pt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.name.trim() || !formData.review.trim()}
                  className="w-full px-4 py-2 bg-cyan-400 hover:bg-cyan-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-md transition-colors font-medium flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    'Add Review'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestimonialSection;