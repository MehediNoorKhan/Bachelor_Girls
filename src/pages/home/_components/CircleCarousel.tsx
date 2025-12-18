import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { bannerSlides } from "@/utils/banner";

const FAR_X = 600;
const FAR_Y = 200;

const CircleCarousel: React.FC = () => {
  const slideRefs = useRef<HTMLImageElement[]>([]);
  const [index, setIndex] = useState(0);
  const [bg, setBg] = useState(bannerSlides[0].backgroundColor);

  const slideImages = [
     "/images/bannerimg1.png",
    "/images/bannerimg2.png",
    "/images/bannerimg3.png",
    "/images/bannerimg4.png",
    "/images/bannerimg5.png",
  ];

 const animate = (direction: 1 | -1) => {
  const current = slideRefs.current[index];
  const nextIndex = (index + direction + bannerSlides.length) % bannerSlides.length;
  const next = slideRefs.current[nextIndex];

  // Reset next image position
  gsap.set(next, { x: -FAR_X, y: FAR_Y, scale: 0.8, opacity: 1 });

  gsap
    .timeline({
      defaults: { duration: 1, ease: "power3.inOut" },
      onComplete: () => {
        // Reset current and next individually
        gsap.set(current, { x: 0, y: 0, scale: 1 });
        gsap.set(next, { x: 0, y: 0, scale: 1 });

        setIndex(nextIndex);
        setBg(bannerSlides[nextIndex].backgroundColor);
      },
    })
    .to(current, { x: FAR_X, y: FAR_Y, scale: 0.8, opacity: 0 })
    .to(next, { x: 0, y: 0, scale: 1, opacity: 1 }, "<");
};


  const getTitleParts = (title: string) => {
    const words = title.split(" ");
    const middle = Math.ceil(words.length / 2);
    return {
      left: words.slice(0, middle).join(" "),
      right: words.slice(middle).join(" "),
    };
  };

  const { left, right } = getTitleParts(bannerSlides[index].title);

  return (
    <div
      className="w-full h-[700px] sm:h-[600px] xs:h-[500px] overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: bg }}
    >
      {/* MAX WIDTH CONTAINER */}
      <div className="relative h-full max-w-[1260px] mx-auto px-6 flex flex-col justify-between">

        {/* IMAGE LAYER */}
        <div className="absolute inset-0 pointer-events-none hidden lg:flex items-center justify-center">
          {slideImages.map((_, i) => (
            <img
  key={i}
  ref={(el) => { if (el) slideRefs.current[i] = el; }}
  src={slideImages[i]}
  alt={bannerSlides[i].title}
  className={`absolute top-20 left-1/2 -translate-x-1/2 h-[90%] max-w-[620px] object-contain transition-opacity duration-700 ${
    i === index ? "opacity-100" : "opacity-0"
  }`}
/>

          ))}
        </div>

        {/* MOBILE IMAGE */}
        <div className="lg:hidden flex justify-center pt-12">
          <img
            src={slideImages[index]}
            alt={bannerSlides[index].title}
            className="h-[30vh]  object-contain"
          />
        </div>

        {/* TITLES ROW (HIDDEN ON MOBILE) */}
        <div className="relative flex-1 flex items-center justify-center gap-6 hidden lg:flex">
          {left && (
            <div className="max-w-[260px] text-right text-white font-bold leading-tight text-[28px] lg:text-[40px] xl:text-[56px]">
              {left}
            </div>
          )}

          <div className="w-[520px]" />

          {right && (
            <div className="max-w-[260px] text-left text-white font-bold leading-tight text-[28px] lg:text-[40px] xl:text-[56px]">
              {right}
            </div>
          )}
        </div>

        {/* BOTTOM CARD */}
        <div className="flex  justify-between items-center pb-10 gap-6">
          {/* Text */}
          <div className="max-w-sm text-white">
            <h2 className="text-[18px] lg:text-[28px] font-bold">{bannerSlides[index].title}</h2>
            <p className="mt-2 text-[14px] text-white/50">{bannerSlides[index].description}</p>
            <button
              className="mt-4 px-4 py-2 bg-white rounded-lg font-semibold"
              style={{ color: bg }}
            >
              Learn More
            </button>
          </div>

          {/* Controls */}
          <div className="flex gap-3 lg:gap-6 text-white text-xl lg:text-3xl font-bold select-none ">
            <button
              onClick={() => animate(-1)}
              className="px-3 py-1 lg:px-4 lg:py-2 rounded-full border-2 border-white hover:text-gray-300 transition"
            >
              &lt;
            </button>
            <button
              onClick={() => animate(1)}
              className="px-3 py-1 lg:px-4 lg:py-2 rounded-full border-2 border-white hover:text-gray-300 transition"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircleCarousel;







