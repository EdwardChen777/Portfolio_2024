import {useEffect, useRef, useState} from "react";
import { motion, useAnimation } from 'framer-motion';
import gsap from "gsap";
import { ScrollTrigger} from "gsap/all";
import firstimage from '../assets/img/about1.jpeg'
import thirdimage from '../assets/img/about3.jpeg'

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const about = useRef(null);
    const controls = useAnimation();
    const DURATION = 0.1;
    const STAGGER = 0.05; 

    const [isMobile, setIsMobile] = useState(false); // State to track if the device is mobile

    // Check if the screen size is mobile
    const checkIfMobile = () => {
        setIsMobile(window.innerWidth <= 768); 
    };

    useEffect(() => {
        checkIfMobile();
        window.addEventListener("resize", checkIfMobile);

        return () => {
        window.removeEventListener("resize", checkIfMobile);
        };
    }, []);

    useEffect(() => {
        if (isMobile) {
            return; 
        }

        const ctx = gsap.context(() => {
            const details = gsap.utils.toArray(".desktopContentSection:not(:first-child)");
            const photos = gsap.utils.toArray(".desktopPhoto:not(:first-child)");
            gsap.set(photos, {yPercent:101})
            const allPhotos = gsap.utils.toArray(".desktopPhoto")
            
            // animate hexagon down and scale 
            // gsap.fromTo(
            //     '.svg-container', // Target the container of the SVG
            //     {
            //       scale: 0.5,       
            //       y: -300,          
            //     },
            //     {
            //       scale: 1,      
            //       y: 0,         
            //       scrollTrigger: {
            //         trigger: '.tracker-container', 
            //         start: 'top 80%',   
            //         end: 'bottom bottom', 
            //         scrub: true,    
            //         markers: true    
            //       },
            //     }
            //   );
            
            // pin the image and the svg 
            ScrollTrigger.create({
                trigger:".gallery",
                start:"top top",
                end:"bottom bottom",
                pin: ".right",
                pinSpacing: false,
            })
            ScrollTrigger.create({
                trigger: ".gallery",
                start: "top top",
                end: "bottom bottom",
                pin: ".tracker-container", 
                pinSpacing: false, 
              });
            
            // image fade in 
            ScrollTrigger.create({
                trigger:".gallery",
                start:"top 80%",
                end:"top top",
                scrub: true,
                animation: gsap.fromTo(".right", {
                    scale: 0.8,                   
                  }, {
                    scale: 1,                     
                    // duration: 1,                 
                  }),
                // markers: true
            })

            const svgElement = document.querySelector('.animated-svg');
            const path = svgElement.querySelector('path');

            // Get the length of the path for strokeDasharray and strokeDashoffset
            const pathLength = path.getTotalLength();

            // Set the strokeDasharray and strokeDashoffset to the path's length initially
            gsap.set(path, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength
            });

            // Create the scroll-triggered animation
            gsap.to(path, {
            strokeDashoffset: 0,  // Draw the path by reducing the dashoffset to 0
            scrollTrigger: {
                trigger: ".tracker-container", 
                start: "top 20%", 
                end: "bottom+=110% bottom",
                scrub: true, 
                // markers: true, 
            }
            });

            details.forEach((detail, index) => {
                const headline = detail.querySelector("h1");
                const animation = gsap.timeline()
                .to(photos[index], { yPercent: 0 })
                .set(allPhotos[index], { autoAlpha: 0 });
        
                ScrollTrigger.create({
                trigger: headline,
                start: "top 80%",
                end: "top 30%",
                animation: animation,
                scrub: true,
                // markers: true,
                });
            });
        }, about);
        return () => {
            // Reverting the context cleanup when the component unmounts
            ctx.revert();
        };
        
      }, [isMobile]);

      useEffect(() => {
        ScrollTrigger.create({
          trigger: ".tracker-container", 
          start: "bottom 50%", 
          end: "bottom top", 
          onEnter: () => controls.start("hovered"), 
          onLeaveBack: () => controls.start("initial"), 
          markers: true, 
        });
      }, [controls]);

    return (
        <div id="about" className="about-container min-h-screen w-screen relative bg-background" ref={about}>
            <h2 className="font-futura font-bold text-[60px] text-center text-white py-10">ABOUT ME</h2>
            <div className="tracker-container absolute hidden h-screen w-full md:flex justify-center items-center">
                <div className="w-[2px] bg-white h-screen absolute left-50% py-1"></div>
                <div className="svg-container py-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="204.075 182.839 111.75 129.038" width="111.75px" height="129.038px" className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1">
                        <path 
                        d="M 259.95 182.839 L 315.825 215.099 L 315.825 279.618 L 259.95 311.877 L 204.075 279.618 L 204.075 215.099 Z"
                        style={{
                            fill: '#101010',
                            stroke: 'rgb(242, 240, 230)',
                            strokeWidth: '2px',
                        }}
                        />
                    </svg>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="204.075 182.839 111.75 129.038" width="111.75px" height="129.038px" className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 animated-svg">
                        <path 
                        d="M 259.95 182.839 L 315.825 215.099 L 315.825 279.618 L 259.95 311.877 L 204.075 279.618 L 204.075 215.099 Z"
                        style={{
                            fill: 'none',
                            stroke: 'rgb(229, 157, 35)',
                            strokeWidth: '2px',
                        }}
                        />
                    </svg>
                </div>
                <motion.div className="relative block overflow-hidden whitespace-nowrap text-base text-secondary uppercase sm:text-lg md:text-3xl scroll-trigger" animate={controls} initial="initial">
                    <div>
                        {"01".split("").map((l, i) => (
                        <motion.span variants={{initial: { y: 0 }, hovered: { y: "-100%" },}}
                            transition={{duration: DURATION, ease: "easeInOut", delay: STAGGER * i,}}
                            className="inline-block"
                            key={i}
                        >
                            {l}
                        </motion.span>
                        ))}
                    </div>
                    <div className="absolute inset-0">
                        {"02".split("").map((l, i) => (
                        <motion.span variants={{initial: { y: "100%" }, hovered: { y: 0 },}}
                            transition={{duration: DURATION, ease: "easeInOut", delay: STAGGER * i,}}
                            className="inline-block"
                            key={i}
                        >
                            {l}
                        </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>

            <div className="gallery md:flex">
                <div className="left w-full md:w-1/2">
                    <div className="desktopContent m-auto w-4/5 md:w-[70%] ">
                        <div className="desktopContentSection flex flex-col justify-center md:min-h-[100vh]">
                            <h1 className="text-secondary font-futura font-bold text-4xl md:text-6xl">Background</h1>
                            <p className="text-white font-roboto text-sm md:text-base mt-5 md:mt-10 2xl:text-2xl">I grew up in Shenzhen, China. I studied Information Systems and Business Administration with a minor in Computational Finance at Carnegie Mellon University.</p>
                        </div>
                        <div className="rounded-[20px] md:hidden bg-white mt-5">
                            <img src={thirdimage} className="object-contain rounded-[20px] p-1 bg-gray-800 border-2 border-gray-500" />
                        </div>
                        <div className="desktopContentSection flex flex-col justify-center md:min-h-[100vh] mt-10 md:mt-0">
                            <h1 className="text-secondary font-futura font-bold text-4xl md:text-6xl">My work</h1>
                            <p className="text-white font-roboto text-sm md:text-base mt-5 md:mt-10 2xl:text-2xl">
                                I am interested in building impactful applications. I am also interested in the potential of Artificial Intelligence in finance and biological fields. I have worked closely with many clients in building tech solutions to empower their business.
                            </p>
                        </div>
                        <div className="rounded-[20px] md:hidden bg-white mt-5">
                            <img src={firstimage} className="object-cover rounded-[20px] p-1 bg-gray-800 border-2 border-gray-500" />
                        </div>
                    </div>
                </div>

                <div className="right hidden md:flex items-center justify-center h-[100vh] w-1/2">

                    <div className="desktopPhotos w-[30vw] h-[40vw] rounded-[20px] relative overflow-hidden ">
                        <div className="desktopPhoto red absolute w-full h-full">
                            <img src={thirdimage} className="object-cover" />
                        </div>
                        <div className="desktopPhoto green absolute w-full h-full">
                            <img src={firstimage} className="object-cover" />
                        </div>
                        {/* <div className="desktopPhoto pink"></div> */}
                    </div>

                </div>
            </div>
        </div>  
    )
}

export default About;