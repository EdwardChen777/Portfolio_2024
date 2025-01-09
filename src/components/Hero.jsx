import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import videoBg from '../assets/galaxy-2.mp4'
import { motion } from 'framer-motion';
// import { computerCanvas } from './canvas'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei';
import SplitType from "split-type";

import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

// loading the models
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

const ModelWithMouseRotation = ({ mouse, transitionRef }) => {
  const modelRef = useRef();

  // Apply mouse-based rotation to the 3D model on each frame
  useFrame(() => {
    if (modelRef.current) {
      // Smooth rotation using damping
      modelRef.current.rotation.y += (mouse.current.x - modelRef.current.rotation.y) * 0.03;
      modelRef.current.rotation.x += (mouse.current.y - modelRef.current.rotation.x) * 0.03;
    }
  });

  return (
    <>
      <mesh position={[0, 0, 0]} ref={modelRef}>
        <Stars />
      </mesh>
      {/* <mesh ref={transitionRef} scale={[0.5, 0.5, 0.5]}>
        <Starwars />
      </mesh> */}
    </>
  );
};

const CameraController = () => {
  const { camera } = useThree(); // Get the Three.js camera from the canvas

  useEffect(() => {
    // ScrollTrigger animation to animate camera position based on scroll
    ScrollTrigger.create({
      trigger: '.scroll-container', // Use a container element for scroll events
      start: 'top top', // Start when the scroll container reaches the top of the viewport
      end: 'bottom 50%', // End when the scroll container reaches the bottom of the viewport
      scrub: true, // Smooth scrubbing (animation follows scroll)
      markers: false, // Set to true to debug and see scroll markers

      onUpdate: (self) => {
        const scrollProgress = self.progress; 
        console.log(scrollProgress)
        gsap.to(camera.position, {
          z: 5 - scrollProgress * 30, // Adjust the range of camera movement
          ease: 'power2.out',
          duration: 0.5
        });
      }
    });

    return () => {
      // Clean up the ScrollTrigger instance when the component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [camera]);

  return null; // No visual output; handles camera logic only
};

const Hero = () => {
  const textRef = useRef(null);
  const transitionRef = useRef(null);
  // const modelRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
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

    gsap.to([".name"], {
      scale: 0.5,
      opacity: 0.5,
      ease: "power2.out" ,
      scrollTrigger: {
        trigger: '.scroll-container',
        start: 'top top',
        end: 'bottom 60%',
        scrub: true,
        // markers: true
      }
    });

      // if (transitionRef.current) {
      //   // GSAP animation for scaling
      //   gsap.to(
      //     transitionRef.current.scale,
      //     { x: 0.5, y: 0.5, z: 0.2 },
      //     {
      //       x: 5,
      //       y: 5,
      //       z: 5,
      //       duration: 3,
      //       scrollTrigger: {
      //         trigger: '.scroll-container',
      //         start: 'top top',
      //         end: 'bottom bottom',
      //         markers:true,
      //       },
      //     }
      //   );
      // }

    // handle mouse movement 
    const handleMouseMove = (event) => {
      // Normalize mouse position to range [-0.5, 0.5]
      mouse.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      splitText.revert();
    }

  }, []);

    return (
      <section className='hero relative w-full min-h-screen mx-auto bg-bg'>
        <div id='video-frame' className='absolute top-0 left-0 w-full h-full'>
          <div className='scroll-container relative w-full h-full'>
            <Canvas>
              <CameraController />
              <ModelWithMouseRotation mouse={mouse} transitionRef={transitionRef} />
              {/* <mesh ref={transitionRef} scale={[0.5, 0.5, 0.2]} >
                <Starwars />
              </mesh> */}
            </Canvas>
          </div>
          {/* <TransitionScene /> */}
        </div>
        {/* <div className='absolute w-full h-full scroll-container'> */}
          {/* <video src={videoBg} autoPlay loop muted className='w-full h-full object-cover'/> */}
        {/* </div>  */}
        
        <div className="w-full h-full">
          <div className='font-technor font-semibold text-6xl md:text-[90px] text-center leading-relaxed absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1' ref={textRef}>
            <h2 className='name text-white'>Edward Chen</h2>
          </div>

          <div className='planet absolute top-0 right-0 w-1/3 h-screen z-0 hidden md:block'>
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
        
      </section>

    )
  }
  
  export default Hero;