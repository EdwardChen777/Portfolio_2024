import {useEffect, useRef, useState} from "react";

import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import firstimage from '../assets/img/about1.jpeg'
// import secondimage from '../assets/img/about2.jpg'
import thirdimage from '../assets/img/about3.jpeg'

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const about = useRef(null);

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
            gsap.set(photos, {yPercent:100})
            const allPhotos = gsap.utils.toArray(".desktopPhoto")
            console.log('details:', details);
            console.log('photos:', photos);
            console.log('allPhotos:', allPhotos);

            ScrollTrigger.create({
                trigger:".gallery",
                start:"top top",
                end:"bottom bottom",
                pin:".right",
                markers: true
            })

            ScrollTrigger.create({
                trigger:".gallery",
                start:"top 80%",
                end:"top top",
                scrub: true,
                animation: gsap.fromTo(".right", {
                    scale: 0.8,                   
                  }, {
                    scale: 1,                     
                    duration: 1,                 
                  }),
                // markers: true
            })

            details.forEach((detail, index) => {
                const headline = detail.querySelector("h1");
                const animation = gsap.timeline()
                .to(photos[index], { yPercent: 0 })
                .set(allPhotos[index], { autoAlpha: 0 });
        
                ScrollTrigger.create({
                trigger: headline,
                start: "top 80%",
                end: "top 50%",
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

    return (
        <div id="about" className="min-h-screen w-screen relative bg-black" ref={about}>
            <h2 className="font-futura font-bold text-[60px] text-center text-white py-10">ABOUT ME</h2>
            <div className="gallery md:flex">
                <div className="left w-full md:w-1/2">
                    <div className="desktopContent m-auto w-4/5 md:w-4/5 ">
                        <div className="desktopContentSection flex flex-col justify-center md:min-h-[100vh]">
                            <h1 className="text-secondary font-futura font-bold text-4xl md:text-6xl">01. Background</h1>
                            <p className="text-white font-roboto text-sm md:text-base mt-5 md:mt-10">I grew up in Shenzhen, China. I studied Information Systems and Business Administration with a minor in Computational Finance at Carnegie Mellon University.</p>
                        </div>
                        <div className="rounded-[20px] md:hidden bg-white mt-5">
                            <img src={thirdimage} className="object-contain rounded-[20px] p-1 bg-gray-800 border-2 border-gray-500" />
                        </div>
                        <div className="desktopContentSection flex flex-col justify-center md:min-h-[100vh] mt-10 md:mt-0">
                            <h1 className="text-secondary font-futura font-bold text-4xl md:text-6xl">02. My work</h1>
                            <p className="text-white font-roboto text-sm md:text-base mt-5 md:mt-10">
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