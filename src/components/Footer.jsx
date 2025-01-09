import { FaGithub, FaLinkedin } from 'react-icons/fa'

const links = [
    { href: 'https://linkedin.com/EdwardChen777', icon: <FaLinkedin/> },
    { href: 'https://github.com/EdwardChen777', icon: <FaGithub />}
]

const Footer = () => {
  return (
    <footer className='w-screen bg-black text-white pt-10 pb-10'>
        <div className='container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row'>
            <p className='text-center text-sm font-normal font-supreme'>
                &copy; 2025 Edward Chen. All rights reserved. 
            </p>
            <div className='flex justify-center gap-4'>
                {links.map( (link,index) => (
                    <a key={index} href={link.href} target='_blank' rel='noopener noreferrer'
                        className='text-secondary text-lg transition-colors duration-500 ease-in-out hover:text-white'
                    >
                        {link.icon}
                    </a>
                ))}
            </div>

            <a
                href="#privacy-policy"
                className="text-white text-center text-sm font-supreme font-normal hover:underline md:text-right"
            >
                Privacy Policy
            </a>
        </div>
    </footer>
  )
}

export default Footer