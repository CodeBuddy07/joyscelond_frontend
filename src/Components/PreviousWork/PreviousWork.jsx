import { useRef } from 'react';
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
    const sliderRef = useRef(null);

    const projects = [
        {
            id: 1,
            title: "Tech Summit 2023",
            description: "Validated over 5,000 attendees at the largest tech conference of the year with seamless entry process.",
            image: imageOne
        },
        {
            id: 2,
            title: "Summer Music Fest",
            description: "Managed entry for 15,000+ festival-goers across three days with zero security incidents.",
            image: imageTwo
        },
        {
            id: 3,
            title: "Business Leaders Forum",
            description: "Provided VIP access control and validation for exclusive executive networking event.",
            image: imageThree
        },
        {
            id: 4,
            title: "City Marathon 2023",
            description: "Validated participants and staff across multiple checkpoints for the annual city marathon.",
            image: imageFour
        },
        {
            id: 5,
            title: "University Career Fair",
            description: "Streamlined student and recruiter validation for the largest campus career event.",
            image: imageFive
        },
        {
            id: 6,
            title: "University Career Fair",
            description: "Streamlined student and recruiter validation for the largest campus career event.",
            image: imageSix
        },
        {
            id: 7,
            title: "University Career Fair",
            description: "Streamlined student and recruiter validation for the largest campus career event.",
            image: imageSeven
        },
        {
            id: 8,
            title: "University Career Fair",
            description: "Streamlined student and recruiter validation for the largest campus career event.",
            image: imageEight
        },
        {
            id: 9,
            title: "University Career Fair",
            description: "Streamlined student and recruiter validation for the largest campus career event.",
            image: imageNine
        },
        {
            id: 10,
            title: "University Career Fair",
            description: "Streamlined student and recruiter validation for the largest campus career event.",
            image: imageTen
        },
        {
            id: 11,
            title: "Tech Summit 2023",
            description: "Validated over 5,000 attendees at the largest tech conference of the year with seamless entry process.",
            image: imageElaven
        },
        {
            id: 12,
            title: "Summer Music Fest",
            description: "Managed entry for 15,000+ festival-goers across three days with zero security incidents.",
            image: imageTwelve
        },
        {
            id: 13,
            title: "Business Leaders Forum",
            description: "Provided VIP access control and validation for exclusive executive networking event.",
            image: imageThirteen
        },
        {
            id: 14,
            title: "City Marathon 2023",
            description: "Validated participants and staff across multiple checkpoints for the annual city marathon.",
            image: imageFifteen
        },
        {
            id: 15,
            title: "University Career Fair",
            description: "Streamlined student and recruiter validation for the largest campus career event.",
            image: imageSixteen
        },
        {
            id: 16,
            title: "University Career Fair",
            description: "Streamlined student and recruiter validation for the largest campus career event.",
            image: imageSeventeen
        },
        {
            id: 17,
            title: "University Career Fair",
            description: "Streamlined student and recruiter validation for the largest campus career event.",
            image: imageEighteen
        },
        {
            id: 18,
            title: "University Career Fair",
            description: "Streamlined student and recruiter validation for the largest campus career event.",
            image: imageNinteen
        },
        {
            id: 19,
            title: "University Career Fair",
            description: "Streamlined student and recruiter validation for the largest campus career event.",
            image: imageTwenty
        },
        {
            id: 20,
            title: "University Career Fair",
            description: "Streamlined student and recruiter validation for the largest campus career event.",
            image: imageTwentyOne
        },
        {
            id: 21,
            title: "Tech Summit 2023",
            description: "Validated over 5,000 attendees at the largest tech conference of the year with seamless entry process.",
            image: imageTwentyTwo
        },
        {
            id: 22,
            title: "Summer Music Fest",
            description: "Managed entry for 15,000+ festival-goers across three days with zero security incidents.",
            image: imageTwentyThree
        },
        {
            id: 23,
            title: "Business Leaders Forum",
            description: "Provided VIP access control and validation for exclusive executive networking event.",
            image: imageTwentyFour
        },
        {
            id: 24,
            title: "City Marathon 2023",
            description: "Validated participants and staff across multiple checkpoints for the annual city marathon.",
            image: imageTwentyFive
        },
        {
            id: 25,
            title: "University Career Fair",
            description: "Streamlined student and recruiter validation for the largest campus career event.",
            image: imageTwentySix
        },
        {
            id: 26,
            title: "University Career Fair",
            description: "Streamlined student and recruiter validation for the largest campus career event.",
            image: imageTwentySeven
        },
        {
            id: 27,
            title: "University Career Fair",
            description: "Streamlined student and recruiter validation for the largest campus career event.",
            image: imageTwentyEight
        },
        {
            id: 28,
            title: "University Career Fair",
            description: "Streamlined student and recruiter validation for the largest campus career event.",
            image: imageTwentyNine
        },
        {
            id: 29,
            title: "University Career Fair",
            description: "Streamlined student and recruiter validation for the largest campus career event.",
            image: imageThirty
        },
        {
            id: 30,
            title: "University Career Fair",
            description: "Streamlined student and recruiter validation for the largest campus career event.",
            image: imageThirtyOne
        },
        {
            id: 31,
            title: "University Career Fair",
            description: "Streamlined student and recruiter validation for the largest campus career event.",
            image: imageThirtyTwo
        }
    ];

    const scrollLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -324, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: 324, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Previous Work
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore our successful event validation projects and see how we've helped organizations streamline their attendee management.
                    </p>
                </div>

                <div className="relative">
                    {/* Navigation Buttons */}
                    <button
                        onClick={scrollLeft}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full w-10 h-10 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full w-10 h-10 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Cards Slider */}
                    <div
                        ref={sliderRef}
                        className="flex overflow-x-auto space-x-6 pb-4 px-2 scroll-smooth scrollbar-hide"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="min-w-[300px] bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex-shrink-0 hover:shadow-md transition-shadow duration-300"
                            >


                                <style>
                                    {`div[data-slider-container] {
                                    scrollbar-width: none;
                                    -ms-overflow-style: none;
                                }
                                div[data-slider-container]::-webkit-scrollbar {
                                    display: none;
                                }`}
                                </style>

                                <div className="overflow-hidden rounded-t-lg">
                                    <img
                                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                                        src={project.image}
                                        alt={project.title}
                                    />
                                </div>
                                {/* <div className="p-5">
                                    <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {project.title}
                                    </h3>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        {project.description}
                                    </p>
                                </div> */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PreviousWork;