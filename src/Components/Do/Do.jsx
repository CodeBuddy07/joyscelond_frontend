import React, { useState, useEffect } from 'react';

// CountUp component simulation since we don't have the library
const CountUp = ({ end, duration, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60); // 60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
};

function Do() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const toggleStory = () => {
    if (isExpanded) {
      setIsExpanded(false);
      setShowCountdown(true);
    } else {
      setIsExpanded(true);
      setShowCountdown(false);
      setCountdown(5);
    }
  };

  useEffect(() => {
    let timer;
    if (showCountdown) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setShowCountdown(false);
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showCountdown]);

  return (
    <section className="my-4 sm:my-6 md:my-8 lg:-mt-0 dark:bg-gray-100 dark:text-gray-800 px-2 sm:px-4">

      {/* Stats */}
      <div className="mt-4 sm:mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        <div className="text-center p-4 sm:p-6 md:p-8 bg-gray-50 rounded-lg flex flex-col items-center justify-center">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-violet-600 mb-1 sm:mb-2">
            <CountUp end={5} duration={2} suffix="K+" />
          </div>
          <div className="text-sm sm:text-base text-gray-600">Happy Clients</div>
        </div>

        <div className="text-center p-4 sm:p-6 md:p-8 bg-gray-50 rounded-lg flex flex-col items-center justify-center">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mb-1 sm:mb-2">
            <CountUp end={7} duration={2} />
          </div>
          <div className="text-sm sm:text-base text-gray-600">Team Members</div>
        </div>

        <div className="text-center p-4 sm:p-6 md:p-8 bg-gray-50 rounded-lg flex flex-col items-center justify-center sm:col-span-2 md:col-span-1">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">
            <CountUp end={11} duration={2} suffix='K+' />
          </div>
          <div className="text-sm sm:text-base text-gray-600">Years Strong</div>
        </div>

        <div className="text-center p-4 sm:p-6 md:p-8 bg-gray-50 rounded-lg flex flex-col items-center justify-center sm:col-span-2 md:col-span-1">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-400 mb-1 sm:mb-2">
            <CountUp end={98} duration={2} suffix='K+' />
          </div>
          <div className="text-sm sm:text-base text-gray-600">Tickets Printed</div>
        </div>
      </div>

      <div className="flex flex-col items-center p-2 sm:p-4 md:p-8 mx-auto space-y-4 sm:space-y-6 max-w-7xl">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 dark:text-violet-600">
          <polygon points="328.375 384 332.073 458.999 256.211 406.28 179.924 459.049 183.625 384 151.586 384 146.064 496 182.756 496 256.169 445.22 329.242 496 365.936 496 360.414 384 328.375 384"></polygon>
          <path d="M415.409,154.914l-2.194-48.054L372.7,80.933,346.768,40.414l-48.055-2.2L256,16.093,213.287,38.219l-48.055,2.2L139.3,80.933,98.785,106.86l-2.194,48.054L74.464,197.628l22.127,42.715,2.2,48.053L139.3,314.323l25.928,40.52,48.055,2.195L256,379.164l42.713-22.126,48.055-2.195,25.928-40.52L413.214,288.4l2.195-48.053,22.127-42.715Zm-31.646,76.949L382,270.377l-32.475,20.78-20.78,32.475-38.515,1.76L256,343.125l-34.234-17.733-38.515-1.76-20.78-32.475L130,270.377l-1.759-38.514L110.5,197.628,128.237,163.4,130,124.88,162.471,104.1l20.78-32.474,38.515-1.76L256,52.132l34.234,17.733,38.515,1.76,20.78,32.474L382,124.88l1.759,38.515L401.5,197.628Z"></path>
        </svg>

        <p className="px-3 sm:px-4 md:px-6 py-2 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold sm:font-bold text-center max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl dark:text-gray-700 leading-tight sm:leading-normal">
          “Trust but verify”
        </p>
        <p className="leading-tight text-lg sm:text-xl md:text-2xl  font-medium">Ronald Reagan</p>

        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center space-y-3 sm:space-y-0 sm:space-x-3 md:space-x-4 w-full max-w-md sm:max-w-none">
          <div className="text-center">
            <p className="leading-tight text-lg sm:text-xl md:text-2xl  font-medium">Joyscelon</p>
            <p className="text-sm sm:text-base md:text-lg leading-tight dark:text-gray-700">Founder, KUTMASTERZ </p>
            <button
              onClick={toggleStory}
              className="flex items-center justify-center py-2 space-x-1 text-sm dark:text-violet-600 hover:dark:text-violet-700 transition-colors cursor-pointer w-full sm:w-auto"
            >
              <span className='text-base sm:text-lg font-bold'>{isExpanded ? 'Read less' : 'Read full story'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto mt-4 sm:mt-6 md:mt-8 p-3 sm:p-4 md:p-6 bg-white rounded-lg shadow-lg animate-in slide-in-from-top duration-300">
            <div className="prose prose-gray max-w-none">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 text-gray-800">The KUTMASTERZ Journey</h3>

              <p className="mb-2 sm:mb-3 md:mb-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                Founded in 2014, KUTMASTERZ started as a passionate hobby dedicated to crafting unique decals and stickers. Over the years, we have evolved into a dynamic limited company, firmly established in the design and printing industry. Our mission is to deliver high-quality printing solutions that combine sophistication with affordability.
              </p>

              <p className="mb-2 sm:mb-3 md:mb-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                Specializing in a wide range of printing services—including banners, posters, foam boards, stickers, wedding stationery, T-shirts, etc.

                KUTMASTERZ has carved a niche in the ticketing domain. Our innovative approach to event ticketing has transformed the way tickets are printed and authenticated.
              </p>

              <p className="mb-2 sm:mb-3 md:mb-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                Recognizing the need for enhanced security in ticketing, we pioneered ticket numbering for safety, later incorporating holograms and tamper-proof seals. However, with increased security comes increased cost, and nobody likes extra costs. Our commitment to improvement led us to develop UV light tickets, featuring hidden watermarks and holograms that are only visible under UV light. This cutting-edge solution not only enhances security but also reduces costs associated with traditional ticketing methods, as the machine was built over 2 years with continuous in-house R&D using modular printing kits by brands like Mimaki, Epson, and Xerox. Hence, we can proudly say that this UV printing technology was built and not brought.
              </p>

              {/* <p className="mb-2 sm:mb-3 md:mb-4 text-sm sm:text-base text-gray-700 leading-relaxed">
              Continuing our pursuit of excellence, we have newly introduced a sophisticated QR code ticketing system, streamlining ticket authentication and boosting sales through e-tickets sent via email, WhatsApp, and social media platforms.  

 
              </p> */}

              <p className="mb-2 sm:mb-3 md:mb-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                Continuing our pursuit of excellence, we have newly introduced a sophisticated QR code ticketing system, streamlining ticket authentication and boosting sales through e-tickets sent via email, WhatsApp, and social media platforms.
              </p>

              <p className="mb-3 sm:mb-4 md:mb-6 text-sm sm:text-base text-gray-700 leading-relaxed">
                At KUTMASTERZ, our dedication extends to serving a diverse audience, including Musicians, artists, DJs, and event organizers. We believe that quality printing and innovative solutions should be accessible to all, and we are committed to pushing the boundaries of what's possible in the design and printing landscape.
              </p>

              <div className="bg-violet-50 border-l-4 border-violet-400 p-3 sm:p-4 rounded">
                <p className="text-violet-800 font-medium italic text-sm sm:text-base">
                  "Innovation is not about bringing technology, it's about building it. Our UV printing technology stands as a testament to what passionate R&D and commitment can achieve - transforming challenges into cutting-edge solutions."
                </p>
              </div>
            </div>
          </div>
        )}

        {showCountdown && (
          <div className="mt-2 sm:mt-3 md:mt-4 text-gray-600 text-base sm:text-lg font-medium text-center">
            Story hidden. Showing countdown: <span className="text-violet-600 font-bold">{countdown}</span>s
          </div>
        )}
      </div>
    </section>
  );
}

export default Do;