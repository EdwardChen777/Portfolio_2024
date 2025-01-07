import React, { useRef, useEffect, useState } from 'react';
import videoBg from '../assets/galaxy-2.mp4'
import { motion } from 'framer-motion';
// import { computerCanvas } from './canvas'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei';
import SplitType from "split-type";

import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Model = () => {
  const gltf = useGLTF('./stylized_planet/scene.gltf')
  return <primitive object={gltf.scene} /> ;
}

const Stars = () => {
  const gltf = useGLTF('./extracted_minecraft_java_editions_stars/scene.gltf')
  return <primitive object={gltf.scene} /> ;
}

const Starwars = () => {
  const gltf = useGLTF('./starwars.gltf')
  return <primitive object={gltf.scene} /> ;
}

const StarryBackground = () => {
  const modelRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Normalize mouse position to range [-0.5, 0.5]
      mouse.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(() => {
    if (modelRef.current) {
      // Smooth rotation using damping
      modelRef.current.rotation.y += (mouse.current.x - modelRef.current.rotation.y) * 0.03;
      modelRef.current.rotation.x += (mouse.current.y - modelRef.current.rotation.x) * 0.03;
    }
  });

  return (
    <mesh ref={modelRef}>
      <Stars />
    </mesh>
  );
};

const MyMesh = () => {
  const modelRef = useRef(); // Create a reference for the model

  // Use useFrame to rotate the model on each frame
  useFrame(() => {
    if (modelRef.current) {
      // Rotate the model around the Y-axis
      modelRef.current.rotation.y += 0.003;
    }
  });

  return (
    <mesh ref={modelRef}>
      <Model scale={2} />
    </mesh>
  );
};

// const TransitionScene = () => {
//   const transitionRef = useRef();
//   useEffect(() => {
//     // GSAP Animation
//     gsap.fromTo(
//       transitionRef.current.scale,
//       { x: 0.5, y: 0.5, z: 0.5 }, // Start scale
//       {
//         x: 3, y: 3, z: 3, // End scale
//         duration: 1,       // Duration of zoom
//         scrollTrigger: {
//           trigger: '.scroll-container', // The container triggering the scroll animation
//           start: 'top center',          // When the animation starts
//           end: 'bottom center',         // When the animation ends
//           scrub: true,                  // Smooth scrolling effect
//         },
//       }
//     );

//     gsap.fromTo(
//       transitionRef.current.material,
//       { opacity: 0}, // Start opacity
//       {
//         opacity: 1,   // End opacity
//         duration: 2,
//         scrollTrigger: {
//           trigger: '.scroll-container',
//           start: 'top center',
//           end: 'bottom center',
//           scrub: true,
//         },
//       }
//     );
//   }, []);

//   return (
//       <mesh ref={transitionRef} scale={[0.5, 0.5, 0.5]} position={[0, 0, 0]}>
//         <Starwars />
//       </mesh>
//   );
// }

const ScrollTransition = () => {
  const transitionRef = useRef(null);
  const firstRef = useRef(null);

  useEffect(() => {
    if (transitionRef.current) {
      // GSAP animation for scaling
      gsap.fromTo(
        transitionRef.current.scale,
        { x: 0.5, y: 0.5, z: 0.5 },
        {
          x: 5,
          y: 5,
          z: 5,
          duration: 3,
          scrollTrigger: {
            trigger: '#video-frame',
            start: 'center center',
            end: '+=600 center',
            scrub: true,
            markers:true,
            pin: true,
            pinSpacing: true
          },
        }
      );

      // GSAP animation for positioning
    //   gsap.fromTo(
    //     firstRef.current.position,
    //     { x: 0, y: 0, z: 0 },
    //     {
    //       x: -20,
    //       y: 0,
    //       z: 0,
    //       duration: 0.01,
    //       scrollTrigger: {
    //         trigger: '#video-frame',
    //         start: 'top top',
    //         end: 'bottom center',
    //         scrub: true,
    //       },
    //     }
    //   );
    }
  }, [transitionRef]); // Dependencies ensure refs are updated

  return (
    <div className='scroll-container relative w-full h-dvh'>
      <Canvas>
        <mesh position={[0,0,0]}>
          <StarryBackground />
        </mesh>
        <mesh ref={transitionRef} scale={[0.5, 0.5, 0.5]} position={[0, 0, -20]}>
          <Starwars />
        </mesh>
      </Canvas>
    </div>
  );
};

const Hero = () => {
  const textRef = useRef(null);

  // animate the title text
  useEffect(() => {
    // Split text into characters
    const splitText = new SplitType(textRef.current, { types: "chars" });

    // GSAP animation for text
    gsap.fromTo(
      splitText.chars,
      { y: 20, opacity: 0, z: 1 },
      {
        y: 0,
        z: 1,
        opacity: 1,
        stagger: 0.05,
        duration: 2,
        ease: "power4.out",
      }
    );

    return () => splitText.revert();
  }, []);

//   useGSAP(() => {
//     const clipAnimation = gsap.timeline({
//       scrollTrigger: {
//         trigger: "#clip",
//         start: "center center",
//         end: "+=800 center",
//         scrub: true,
//         pin: true,
//         pinSpacing: true,
//         markers: true
//       },
//     });

//     clipAnimation.to(".mask-clip-path", {
//       width: "100vw",
//       height: "100vh",
//       borderRadius: 0,
//       left: 0
//     });
// });

    return (

      <section className='relative w-full min-h-screen mx-auto bg-gray-900'>
        <div id='video-frame' className='absolute top-0 left-0 w-full h-full'>
          <ScrollTransition />
        </div>
        {/* <div className='absolute w-full h-full scroll-container'> */}
          {/* <video src={videoBg} autoPlay loop muted className='w-full h-full object-cover'/> */}
          {/* <Canvas>
            <OrbitControls
                  enableZoom={false}
                  maxPolarAngle={Math.PI / 2}
                  minPolarAngle={Math.PI / 2}
            />
            <mesh>
              <StarryBackground />
            </mesh>
            <mesh position={[0, 0, -20]}>
                <Starwars />
            </mesh>
            <TransitionScene />
          </Canvas> */}
        {/* </div>  */}
        

        <div className="w-full h-full">
          <div className='font-futura font-bold text-6xl md:text-[90px] text-center leading-relaxed absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1' ref={textRef}>
            <h2 className='text-white'>Edward Chen</h2>
            {/* <h2 className='text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500'>Edward Chen</h2> */}
          </div>

          <div className='absolute top-0 right-0 w-1/3 h-screen z-0 hidden md:block'>
            <Canvas className='h-full'>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5,5,5]} intensity={1} />
              <perspectiveCamera position={[0, 0, 20]} />
              <OrbitControls
                enableZoom={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
              />
              <mesh scale={1.5}>
                <MyMesh />
              </mesh>
            </Canvas>
          </div>
        </div>
        {/* <div className="w-full h-full flex items-center justify-center">
          <div className='flex-1 font-futura font-bold text-[90px] text-white text-right'>
            <h2>I am</h2>
            <h2>Edward Chen</h2>
          </div>

          <div className='flex-1 h-full'>
            <Canvas className='h-full'>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5,5,5]} intensity={1} />
              <perspectiveCamera position={[0, 0, 20]} />
              <OrbitControls
                enableZoom={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
              />
              <Model scale={[20,20,20]} />
            </Canvas>
          </div>
        </div> */}
        
      </section>

    )
  }
  
  export default Hero;