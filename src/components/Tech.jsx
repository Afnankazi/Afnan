import { BallCanvas } from "./canvas";
import { technologies } from "../utils";
import { sectionWrapper } from "../HOC/section-wrapper";
import CanvasErrorBoundary from "./canvas/CanvasErrorBoundary";
import { IconCloud } from "../ui/tech-cloud";
import { useState, useEffect } from "react";

export function Tech() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleChange = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Tech icon slugs for SimpleIcons
  const slugs = [
    "html5",
    "css3",
    "javascript",
    "typescript",
    "react",
    "java",
    "tailwindcss",
    "nodedotjs",
    "mongodb",
    "threedotjs",
    "git",
    "nextdotjs",
    "docker",
    "spring",
    "springboot",
    "python",
    ""
  ];

  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}`
  );

  return (
    <div className="w-full  flex flex-wrap gap-10 justify-center items-center mt-4 py-10">
      {isMobile ? (
        // Mobile: Show IconCloud
        <div className="w-full flex items-center justify-center p-4">
          <IconCloud images={images} />
        </div>
      ) : (
        // Desktop: Show 3D Balls
        <>
          {technologies.map((tech) => (
            <div className="w-28 h-28" key={tech.name} style={{ minHeight: '112px', minWidth: '112px' }}>
              <CanvasErrorBoundary>
                <BallCanvas icon={tech.icon} />
              </CanvasErrorBoundary>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

const TechWrapper = sectionWrapper(Tech, "technology");
export default TechWrapper;
