import { BrowserRouter } from "react-router-dom";

import Hero from '/src/components/Hero.jsx';
import Navbar from '/src/components/Navbar'
import About from '/src/components/About'
import Projects from '/src/components/Projects'
import Footer from "./components/Footer";

const App = () => {

  return (
    // <div className="bg-blue-50">hi</div>
    <BrowserRouter>
      <div className='relative min-h-screen w-screen overflow-x-hidden'>
        <Navbar />
        <Hero />
        <About />
        <Projects />
        {/* <TestImage /> */}
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
