import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const TestImage = () => {

  // useGSAP(() => {
  //   const clipAnimation = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: "#clip",
  //       start: "center center",
  //       end: "+=800 center",
  //       scrub: true,
  //       pin: true,
  //       pinSpacing: true,
  //       markers: true
  //     },
  //   });

  //   clipAnimation.to(".mask-clip-path", {
  //     width: "100vw",
  //     height: "100vh",
  //     borderRadius: 0,
  //     left: 0
  //   });

  // });

    return (
        <div id="about" className="min-h-screen w-screen relative bg-purple-50">

          <h2 className="font-futura font-bold text-[60px] text-center text-purple-500 py-10">ABOUT ME</h2>

          <div className="absolute w-1/2 h-full px-10">
              <div className="">
                  <p className="pinned font-roboto text-center text-[20px] align-left">I am a computer scientist interested in AI and building impactful solutions. I am currently investigating the intersection between AI and biology. I am also very passionate in working closely with clients to develop user-friendly solutions that will help solve their problems. Currently, I am working on start-up ideas that could help people improve their mental health states. In the future, I am passionate about entreprenuership and building projects that will lead to goodness and beyond.</p>
              </div>
          </div>

          <div className="h-dvh w-screen" id="clip">
              <div className="mask-clip-path about-image">
              <img
                  src="/src/assets/img/ai-biology.webp"
                  alt="Background"
                  className="absolute left-0 top-0 size-full object-cover"
              />
              </div>
          </div>
        </div>
    )
}

export default TestImage; 