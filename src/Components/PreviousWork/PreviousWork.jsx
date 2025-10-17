import { useRef, useEffect } from 'react';
import imageOne from '../../../public/13RA TICKET-01.jpg';
import imageTwo from '../../../public/2025 easter ticket-01.jpg';
import imageThree from '../../../public/annual dance freddy tickets-01.jpg';
import imageFour from '../../../public/avc-01.jpg';
import imageFive from '../../../public/battle of djs-01.jpg';
import imageSix from '../../../public/beer beets.jpg';
import imageSeven from '../../../public/bonderam master-01.jpg';
import imageEight from '../../../public/Early birds.png';
import imageNine from '../../../public/easter 2024 fedy-01.jpg';
import imageTen from '../../../public/EDINBURGH GOA DAY.jpg';
import imageElaven from '../../../public/fredy silve-01.jpg';
import imageTwelve from '../../../public/habito haloween.jpg';
import imageThirteen from '../../../public/Ignite 2025 - General Admission (Couple) (74mm x 180mm).jpg';
import imageFifteen from '../../../public/mark revlon beige-01.jpg';
import imageSixteen from '../../../public/mark revlon blue yellow-01.jpg';
import imageSeventeen from '../../../public/mark revlon blue-01.jpg';
import imageEighteen from '../../../public/mark revlon green-01.jpg';
import imageNinteen from '../../../public/mark revlon red-01-01.jpg';
import imageTwenty from '../../../public/mark revlon red-01.jpg';
import imageTwentyOne from '../../../public/miraxles sangeum-01.jpg';
import imageTwentyTwo from '../../../public/power 5-01.jpg';
import imageTwentyThree from '../../../public/raggio ticket MASTER.jpg';
import imageTwentyFour from '../../../public/SOA JOAO.jpg';
import imageTwentyFive from '../../../public/TICKET adult master-01.jpg';
import imageTwentySix from '../../../public/TICKET-01.jpg';
import imageTwentySeven from '../../../public/Tickets Final copy.jpg';
import imageTwentyEight from '../../../public/uzo dance-01.jpg';
import imageTwentyNine from '../../../public/wall seck gold-01.jpg';
import imageThirty from '../../../public/wall seck green-01.jpg';
import imageThirtyOne from '../../../public/wall seck green-blue-01.jpg';
import imageThirtyTwo from '../../../public/WALLY SECK 20205-01.jpg';

const PreviousWork = () => {
    const swiperRef = useRef(null);
    const prevButtonRef = useRef(null);
    const nextButtonRef = useRef(null);

    const projects = [
        { id: 1, image: imageOne },
        { id: 2, image: imageTwo },
        { id: 3, image: imageThree },
        { id: 4, image: imageFour },
        { id: 5, image: imageFive },
        { id: 6, image: imageSix },
        { id: 7, image: imageSeven },
        { id: 8, image: imageEight },
        { id: 9, image: imageNine },
        { id: 10, image: imageTen },
        { id: 11, image: imageElaven },
        { id: 12, image: imageTwelve },
        { id: 13, image: imageThirteen },
        { id: 14, image: imageFifteen },
        { id: 15, image: imageSixteen },
        { id: 16, image: imageSeventeen },
        { id: 17, image: imageEighteen },
        { id: 18, image: imageNinteen },
        { id: 19, image: imageTwenty },
        { id: 20, image: imageTwentyOne },
        { id: 21, image: imageTwentyTwo },
        { id: 22, image: imageTwentyThree },
        { id: 23, image: imageTwentyFour },
        { id: 24, image: imageTwentyFive },
        { id: 25, image: imageTwentySix },
        { id: 26, image: imageTwentySeven },
        { id: 27, image: imageTwentyEight },
        { id: 28, image: imageTwentyNine },
        { id: 29, image: imageThirty },
        { id: 30, image: imageThirtyOne },
        { id: 31, image: imageThirtyTwo }
    ];

    useEffect(() => {
        // Load Swiper CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
        document.head.appendChild(link);

        // Load Swiper JS
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
        script.async = true;

        script.onload = () => {
            if (window.Swiper && swiperRef.current) {
                new window.Swiper(swiperRef.current, {
                    slidesPerView: 1,
                    spaceBetween: 30,
                    centeredSlides: true,
                    navigation: {
                        nextEl: nextButtonRef.current,
                        prevEl: prevButtonRef.current,
                    },
                    breakpoints: {
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 30,
                            centeredSlides: true,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                            centeredSlides: false,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                            centeredSlides: false,
                        }
                    },
                    effect: 'slide',
                    speed: 600,
                    loop: false,
                    grabCursor: true,
                    slideToClickedSlide: true,
                });
            }
        };

        document.body.appendChild(script);

        return () => {
            if (document.head.contains(link)) document.head.removeChild(link);
            if (document.body.contains(script)) document.body.removeChild(script);
        };
    }, []);

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Featured Work
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore our successful event validation projects and see how we've helped organizations streamline their attendee management.
                    </p>
                </div>

                <div className="relative px-8 sm:px-12">
                    {/* Navigation Buttons */}
                    <button
                        ref={prevButtonRef}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
                        aria-label="Previous slide"
                    >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        ref={nextButtonRef}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
                        aria-label="Next slide"
                    >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Swiper Container */}
                    <div ref={swiperRef} className="swiper">
                        <div className="swiper-wrapper">
                            {projects.map((project) => (
                                <div key={project.id} className="swiper-slide">
                                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                                        <div className="overflow-hidden rounded-lg">
                                            <img
                                                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                                                src={project.image}
                                                alt={`Event ticket ${project.id}`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PreviousWork;