interface SlideOption {
    title: string;
    src: string;
    alt: string;
}
interface SlideButtonOption {
    slideNumber: number;
}

interface CarouselProps {
    title: string;
    slides: SlideOption[];
}

const Slide = (props: SlideOption) => {
    return (
        <div className="hidden duration-700 ease-in-out rounded-t-lg" data-carousel-item>
            <span className="absolute top-1/2 left-1/2 text-2xl font-semibold text-white -translate-x-1/2 -translate-y-1/2 sm:text-3xl dark:text-gray-800">
                {props.title}
            </span>
            <img
                src={props.src}
                className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 rounded-t-lg"
                alt={props.alt}
            />
        </div>
    );
};

const SlideButton = (props: SlideButtonOption) => {
    return (
        <button
            type="button"
            className="w-3 h-3 rounded-full"
            aria-current="false"
            aria-label={`Slide ${props.slideNumber}`}
            data-carousel-slide-to={String(props.slideNumber)}
        />
    );
};

export default function HeaderCarousel(props: CarouselProps) {
    return (
        <div className="mt-4 bg-maroon-palet rounded-t-lg w-full left-0">
            <div className="relative" data-carousel="slide">
                <div className="overflow-hidden relative h-56 sm:h-64 md:h-80 xl:h-96 rounded-t-lg">
                    {props.slides.map((image) => (
                        <Slide
                            key={image.title}
                            title={image.title}
                            src={image.src}
                            alt={image.alt}
                        />
                    ))}
                </div>

                <div className="flex absolute left-0 top-0 justify-center items-center h-56 sm:h-64 md:h-80 xl:h-96 z-20 right-0 text-white bg-black bg-opacity-50 rounded-t-lg">
                    <h1>{props.title}</h1>
                </div>

                <div className="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
                    {props.slides.map((image, index) => (
                        <SlideButton key={image.src} slideNumber={index} />
                    ))}
                </div>

                <button
                    type="button"
                    className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                    data-carousel-prev
                >
                    <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg
                            className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 19l-7-7 7-7"
                            ></path>
                        </svg>
                        <span className="hidden">Previous</span>
                    </span>
                </button>
                <button
                    type="button"
                    className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
                    data-carousel-next
                >
                    <span className="inline-flex justify-center items-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                        <svg
                            className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                            ></path>
                        </svg>
                        <span className="hidden">Next</span>
                    </span>
                </button>
            </div>
        </div>
    );
}
