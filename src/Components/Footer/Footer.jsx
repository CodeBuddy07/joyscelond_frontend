import { Mail, Instagram } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import axiosSecure from '../../lib/axiosSecure';


// TikTok Icon Component (custom since it's not in Lucide)
const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z" />
  </svg>
);

// WhatsApp Icon Component (custom)
const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488" />
  </svg>
);

function Footer() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');


  const handleRequestDemo = () => {
    setShowForm(true);
    setSubmitted(false);
  };

  const handleSubmitDemo = async () => {
    if (!email || !phone) {
      alert('Please fill in both email and phone number');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await axiosSecure.post('api/v1/email/send', { email, phone, requestType: "demo" });

      if (!result.data.success) {
        toast.error(result.data.message || 'Error Sending Email');
      }

      setSubmitted(true);
      setTimeout(() => {
        setName('');
        setMessage('');
        setEmail('');
        setPhone('');
        setShowForm(false);
        setSubmitted(false);
      }, 2000);
    } catch (error) {
      console.log('Error Sending Demo Request: ', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEmail('');
    setPhone('');
    setSubmitted(false);
  };

  return (
    <footer className="bg-gray-50 text-gray-700 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 lg:gap-20">
          {/* Logo and Description */}
          <div className="space-y-4">
            <img
              src="/logo.svg"
              alt="KutMasterz Logo"
              className="h-12"
            />
            <p className="text-sm text-gray-600 leading-relaxed">
              Clarity gives you the blocks and components.<br />
            </p>

            {/* Social Media Icons */}
            {/* <div className="flex space-x-4 pt-2">
              <a
                href="https://www.tiktok.com/@kutmasterz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-black transition-colors duration-200"
                aria-label="Follow us on TikTok"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>

              <a
                href="https://wa.me/+447454008119"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-500 transition-colors duration-200"
                aria-label="Contact us on WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>

              <a
                href="mailto:Kutmasterz14@gmail.com"
                className="text-gray-400 hover:text-blue-500 transition-colors duration-200"
                aria-label="Send us an email"
              >
                <Mail className="w-5 h-5" />
              </a>

              <a
                href="https://www.instagram.com/kutmasterzlondon/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="text-gray-400 hover:text-pink-500 transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div> */}
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h6 className="font-semibold text-gray-800 uppercase text-sm tracking-wider">
              COMPANY
            </h6>
            <nav className="flex flex-col space-y-3">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors">
                About
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800 transition-colors">
                Featured Work
              </a>
            </nav>
          </div>

          {/* Help Links */}
          <div className="space-y-4">
            <h6 className="font-semibold text-gray-800 uppercase text-sm tracking-wider">
              Contact
            </h6>
            <nav className="flex flex-col space-y-3">
              <a
                href="https://wa.me/+447454008119"
                target="_blank"
                rel="noopener noreferrer"
                aria-label='Contact us on WhatsApp'
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Whatsapp
              </a>
              <a
                href="mailto:Kutmasterz14@gmail.com"
                aria-label="Send us an email"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
                <Mail className="w-5 h-5" />
                Email
              </a>
              <a
                href="https://www.instagram.com/kutmasterzlondon/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
                <Instagram className="w-5 h-5" />
                Instagram
              </a>
              <a href="https://www.tiktok.com/@kutmasterz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                aria-label='Follow us on TikTok'
              >
                <p
                  className="text-gray-400 hover:text-black transition-colors duration-200"
                >
                  <TikTokIcon className="w-5 h-5" />
                </p>

                Tiktok
              </a>
            </nav>
          </div>

          {/* General Query Form*/}
          <div className="space-y-4">
            <h6
              onClick={() => setShowForm(!showForm)}
              className="font-semibold cursor-pointer text-gray-800 uppercase text-sm tracking-wider"
            >
              General Query
            </h6>

            <div className="space-y-3">
              {/* Display request demo button when form is hidden */}
              {!showForm ? (
                <div className="text-center mt-4">
                  <button
                    onClick={handleRequestDemo}
                    className="w-full max-w-xs bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-500 hover:to-cyan-400 text-black font-medium py-2 px-4 rounded-md text-sm shadow-md"
                  >
                    Let us know your needs
                  </button>
                </div>
              ) : submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-md p-2">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-2">
                      <h3 className="text-sm font-medium text-green-800">Demo Request Submitted!</h3>
                      <p className="text-sm text-green-700">We'll contact you soon.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-gray-600">Fill in your details and we'll get back to you soon.</p>

                  {/* Full Name Input */}
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full p-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-transparent placeholder-gray-400 text-gray-700 bg-white disabled:bg-gray-100"
                  />

                  {/* Email Input */}
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full p-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-transparent placeholder-gray-400 text-gray-700 bg-white disabled:bg-gray-100"
                  />

                  {/* Phone Input */}
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full p-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-transparent placeholder-gray-400 text-gray-700 bg-white disabled:bg-gray-100"
                  />

                  {/* Message Input */}
                  <textarea
                    type="text"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isSubmitting}
                    className="w-full p-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-transparent placeholder-gray-400 text-gray-700 bg-white disabled:bg-gray-100"
                  />

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSubmitDemo}
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-cyan-400 to-cyan-300 text-black font-medium py-2 px-4 rounded-md text-xs shadow-md disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <svg className="animate-spin h-4 w-4 text-black mr-2" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        'Submit'
                      )}
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={isSubmitting}
                      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-600 font-medium py-2 px-4 rounded-md text-xs disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;