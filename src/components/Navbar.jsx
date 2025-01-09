import {useEffect, useState, useRef} from 'react';
import { Link } from 'react-router-dom';
// import { menu } from "../assets/menu.svg";
// import { close } from "../assets/close.svg"
import close from '/src/assets/close.svg';
import menu from '/src/assets/menu.svg';
import logo from '/src/assets/img/logo.png'
import gsap from "gsap";
import { useWindowScroll } from "react-use";


const Navbar = () => {
    const [active, setActive] = useState('');
    const [toggle, setToggle] = useState(false);
    const [navBG, setNavBG] = useState(false);

    const navContainerRef = useRef(null);

    const { y: currentScrollY } = useWindowScroll();
    const [lastScrollY, setLastScrollY] = useState(0);
    useEffect(() => {
      if (currentScrollY === 0) {
        // Topmost position: show navbar without floating-nav
        setNavBG(true);
        navContainerRef.current.classList.remove("floating-nav");
        // navContainerRef.current.classList.remove("bg-custom-gradient");
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down: hide navbar and apply floating-nav
        setNavBG(false);
        navContainerRef.current.classList.add("floating-nav");
        // navContainerRef.current.classList.add("bg-custom-gradient");
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up: show navbar with floating-nav
        setNavBG(true);
        navContainerRef.current.classList.add("floating-nav");
        // navContainerRef.current.classList.add("bg-custom-gradient");
      }

      setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY]);

    useEffect(() => {
      gsap.to(navContainerRef.current, {
        y: navBG ? 0 : -100,
        opacity: navBG ? 1 : 0,
        duration: 0.3,
      });
    }, [navBG]);

    return (
      <nav className='w-full flex items-center py-5 fixed top-0 z-20' ref={navContainerRef}>
        <div className='w-full flex justify-between items-center mx-10'>
            <Link 
              to='/'
              className='flex items-center gap-2'
              onClick={() => {
                setActive("");
                window.scrollTo(0, 0);
              }}
            >
                {/* <p>Logo </p> */}
                <img src={logo} className='w-12 h-12 object-contain'/>
                <p className='text-white text-[18px] font-technor font-semibold'>
                  Edward Chen
                </p>
            </Link>

            <ul className='list-none hidden sm:flex flex-row gap-10'>

              <li 
                onClick={() => setActive('About')}
              >
                {/* <Link className={`${
                  active === 'About' ? 'text-white' : 'text-secondary'
                  } hover:text-white transition duration-200 ease-in-out text-[18px] font-medium cursor-pointer nav-hover-btn` } to="#about"
                >
                  About
                </Link> */}
                <a className={`${
                  active === 'About' ? 'text-white' : 'text-secondary'
                  } hover:text-white transition duration-200 ease-in-out text-[18px] font-semibold font-technor cursor-pointer nav-hover-btn` } href="#about" >
                  About
                </a>
              </li>

              <li
                onClick={() => setActive('Projects')}
              >
                {/* <Link className= {`${
                  active === 'Projects' ? 'text-white' : 'text-secondary'
                  } hover:text-white transition duration-200 ease-in-out text-[18px] font-medium cursor-pointer nav-hover-btn`} to={'/'}
                >
                  Projects
                </Link> */}
                <a className= {`${
                  active === 'Projects' ? 'text-white' : 'text-secondary'
                  } hover:text-white transition duration-200 ease-in-out text-[18px] font-semibold font-technor cursor-pointer nav-hover-btn`} href="#projects"
                >
                  Projects 
                </a>
              </li> 
            </ul>
            
            {/* Toggle */}
            <div className='sm:hidden flex flex-1 justify-end items-center'>
              <img
                src={toggle ? close : menu}
                alt='menu'
                className='w-[28px] h-[28px] object-contain'
                onClick={() => setToggle(!toggle)}
              />

              <div
                className={`${
                  !toggle ? "hidden" : "flex"
                } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
              >
                <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
                  <li
                    onClick={() => {
                      setActive('About');
                      setToggle(!toggle);
                    }}
                  >
                    <Link className= {`font-poppins font-medium cursor-pointer text-[16px] ${
                          active === "About" ? "text-white" : "text-secondary"
                        }`} to={'/'}
                    >
                      About
                    </Link>
                  </li> 

                  <li
                    onClick={() => {
                      setActive('Projects');
                      setToggle(!toggle);
                    }}
                  >
                    <Link className= {`font-poppins font-medium cursor-pointer text-[16px] ${
                          active === "Projects" ? "text-white" : "text-secondary"
                        }`} to={'/'}
                    >
                      Projects
                    </Link>
                  </li> 

                </ul>
              </div>
            </div>
        </div>
        
      </nav>
    )
  }
  
  export default Navbar;