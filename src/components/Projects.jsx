import Card from "./Card"
import { useState, useRef} from 'react';
import openup from '../assets/img/openup.png'
import insdr from '../assets/img/insdr-2.png'
import firsttee from '../assets/img/firsttee.png'
import mitochondrial from '../assets/img/mitochondrial.png'
import sixenzymes from '../assets/img/six_enzymes.png'

const CardTilt = ({children, className = ''}) => {

    const [transformState, setTransformState] = useState('');
    const itemRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!itemRef.current) return;

        const { left, top, width, height } =
        itemRef.current.getBoundingClientRect();

        const relativeX = (event.clientX - left) / width;
        const relativeY = (event.clientY - top) / height;

        const tiltX = (relativeY - 0.5) * 3;
        const tiltY = (relativeX - 0.5) * -3;

        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
        setTransformState(newTransform);
    }

    const handleMouseLeave = (e) => {
        setTransformState('');
    }

    return (
        <div 
            className={className} 
            ref={itemRef} 
            onMouseMove={handleMouseMove} 
            onMouseLeave={handleMouseLeave}
            style={{transform: transformState}}
        >
            {children}
        </div>
    )
}

const Projects = () => {

    return (
        <section id="projects" className="bg-background pb-30 pt-1">
            <div className="container mx-auto px-3">
                <h2 className="font-futura font-bold text-[60px] text-white text-center py-20">Projects</h2>
            </div>

            <div className="grid h-[180vh] md:h-[70vh] grid-cols-1 md:grid-cols-4 grid-rows-3 gap-7 mb-7 mx-10 ">
                <CardTilt className="row-span-1 md:row-span-3 relative border border-white/20 overflow-hidden rounded-md transition-transform duration-300 ease-out">
                    <Card 
                        img={sixenzymes}
                        title="Six Enzymes"
                        description="Bioinformatics study of six human enzymes."
                        link="https://docs.google.com/document/d/1FLjqkDpUlPg8aRcStZBstsJVzB3ko10B/edit?usp=sharing&ouid=103616207428669408819&rtpof=true&sd=true"
                        external={true}
                    />
                </CardTilt>
                <CardTilt className="row-span-1 md:row-span-3 md:col-span-2 relative border border-white/20 overflow-hidden rounded-md transition-transform duration-300 ease-out">
                    <Card 
                        img={mitochondrial}
                        title="Mitochondrial Complex"
                        description="Bioinformatics study of mitochondrial complex I."
                        link="https://docs.google.com/document/d/1wD9yowqT5roBpmi0bJ6ULTHmplZVZCUZ/edit?usp=sharing&ouid=103616207428669408819&rtpof=true&sd=true"
                        external={true}
                    />
                </CardTilt>
                <CardTilt className="row-span-1 md:row-span-3 relative border border-white/20 overflow-hidden rounded-md transition-transform duration-300 ease-out">
                    <Card 
                        img={firsttee}
                        title="First Tee"
                        description="Notifications app for coaches to reach students."
                        link="https://first-tee-notifications.herokuapp.com/"
                        external={true}
                    />
                </CardTilt>
            </div>
            <div className="grid h-[120vh] md:h-[70vh] grid-cols-2 grid-rows-2 gap-7 mx-10">
                <CardTilt className="col-span-2 row-span-1 md:row-span-2 md:col-span-1 relative border border-white/20 overflow-hidden rounded-md transition-transform duration-300 ease-out">
                    <Card 
                        img={openup}
                        title="Open Up Pittsburgh"
                        description="Redesigned website to increase class sign up and donation."
                        link="https://www.open-up.org/"
                        external={true}
                    />
                </CardTilt>
                <CardTilt className="col-span-2 row-span-1 md:row-span-2 md:col-span-1 relative border border-white/20 overflow-hidden rounded-md transition-transform duration-300 ease-out">
                    <Card 
                        img={insdr}
                        title="INSDR"
                        description="Mobile application to track insider tradings by politicians and executives."
                        link="https://github.com/EdwardChen777/Team15-App-V2"
                        external={true}
                    />
                </CardTilt>
            </div>
        </section>
    )
}

export default Projects;