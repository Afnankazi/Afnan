import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import { styles } from "../utils/styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if screen is mobile
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    // Set the initial value
    setIsMobile(mediaQuery.matches);

    // Define callback function to handle changes
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='text-[#915EFF]'>Afnan kazi</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            Creating Cool Applications That Actually Make an Impacts
          </p>
        </div>
      </div>

      {/* Background - Canvas for desktop, Image for mobile */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        {isMobile ? (
          // Mobile: Show static computer image
          <img
            src="/comp.png"
            alt="Computer"
            className="object-contain opacity-100 scale-100 mt-20"
          />
        ) : (
          // Desktop: Show 3D Canvas
          <ComputersCanvas />
        )}
      </div>

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;