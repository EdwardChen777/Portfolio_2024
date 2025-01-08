import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import PropTypes from 'prop-types';
import { FaArrowRight } from "react-icons/fa"

const Card = ({img, title, description, link}) => {

    const animatedComponentRef = useRef(null);
    const arrowRef = useRef(null);

  // GSAP animation on hover using useEffect hook
    useEffect(() => {
        const animatedComponent = animatedComponentRef.current;
        const animatedArrow = arrowRef.current;

        // Animate when mouse enters the container
        const handleMouseEnter = () => {
            gsap.to(animatedComponent, { y: -20, duration: 0.3 });
            gsap.to(animatedArrow, {x: 15, duration: 0.5});
        };

        // Animate when mouse leaves the container
        const handleMouseLeave = () => {
            gsap.to(animatedComponent, { y: 0, duration: 0.5 });
            gsap.to(animatedArrow, {x: 0, duration: 0.5});
        };

        // Get the container and add event listeners
        const container = animatedComponent.closest('.card-container');
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup event listeners on unmount
        return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);


    return (
        <a href={link}>
            <div className="card-container relative size-full bg-gray-900 hover:bg-firsttee-gradient transition-all duration-1000 ease-in-out">
                <div className="relative flex size-full flex-col justify-between p-7">
                    <div className="text-white">
                        <div className='flex flex-row justify-between align-center'>
                            <h1 className="font-futura font-bold text-lg 2xl:text-5xl">
                                {title}
                            </h1>
                            <span ref={arrowRef} className="flex justify-center items-center text-2xl">
                                <FaArrowRight />
                            </span>
                        </div>
                        
                        <p className="mt-3 font-roboto text-sm 2xl:text-base">
                            {description}
                        </p>
                    </div>
                </div>
                <div className="absolute left-0 top-40 mx-7" ref={animatedComponentRef}>
                    <img src={img} className=""/>
                </div>
            </div>
        </a>
        
    )
}

Card.propTypes = {
    img: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    link: PropTypes.string,
};

export default Card;