import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Hero } from "./components"; // Keep Hero eager-loaded (above the fold)
import NavbarDemo from "./components/Navbar"; // Keep Navbar eager-loaded
import { usePerformanceMonitoring } from "./hooks/usePerformance";

// Lazy load all below-the-fold components for better performance
const About = lazy(() => import("./components/About"));
const Experience = lazy(() => import("./components/Experience"));
const Tech = lazy(() => import("./components/Tech"));
const Works = lazy(() => import("./components/Works"));
const Contact = lazy(() => import("./components/Contact"));
const Hackthons = lazy(() => import("./components/Hackthons"));

// Reusable loading component for lazy-loaded sections
const SectionLoader = ({ sectionName = "content" }) => (
  <div className="w-full min-h-[400px] flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
        <span className="absolute! -m-px! h-px! w-px! overflow-hidden! whitespace-nowrap! border-0! p-0! [clip:rect(0,0,0,0)]!">Loading...</span>
      </div>
      <p className="mt-4 text-secondary text-sm">Loading {sectionName}...</p>
    </div>
  </div>
);

// Main Portfolio Page Component
const MainPage = () => {
  return (
    <>
      {/* Navbar only on main page */}
      <NavbarDemo />

      <div className='relative z-0 bg-primary '>
        {/* Changed to use your custom color */}
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center  ' >
          <Hero />
        </div>

        <Suspense fallback={<SectionLoader sectionName="About" />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionLoader sectionName="Experience" />}>
          <Experience />
        </Suspense>

        <Suspense fallback={<SectionLoader sectionName="Tech Stack" />}>
          <Tech />
        </Suspense>

        <Suspense fallback={<SectionLoader sectionName="Projects" />}>
          <Works />
        </Suspense>

        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Suspense fallback={<SectionLoader sectionName="Contact" />}>
            <Contact />
          </Suspense>
        </div>
      </div>
    </>
  );
};

const App = () => {
  // Monitor performance metrics in production
  usePerformanceMonitoring();

  return (
    <BrowserRouter>
      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/hackathons" element={
          <Suspense fallback={<SectionLoader sectionName="Hackathons" />}>
            <Hackthons />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;