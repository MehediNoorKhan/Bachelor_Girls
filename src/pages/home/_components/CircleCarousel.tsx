
import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { bannerSlides } from "@/utils/banner";

const FAR_X = 500;
const FAR_Y = 0;

const CircleCarousel: React.FC = () => {
  const slideRefs = useRef<HTMLImageElement[]>([]);
  const leftTitleRef = useRef<HTMLDivElement | null>(null);
  const rightTitleRef = useRef<HTMLDivElement | null>(null);

  const [index, setIndex] = useState(0);
  const [bg, setBg] = useState(bannerSlides[0].backgroundColor);

  const slideImages = [
    "/images/heroimg1.png",
    "/images/heroimg2.png",
    "/images/heroimg3.png",
    "/images/heroimg4.png",
    "/images/heroimg5.png",
  ];

const animate = (direction: 1 | -1) => {
  const current = slideRefs.current[index];
  const nextIndex =
    (index + direction + bannerSlides.length) % bannerSlides.length;
  const next = slideRefs.current[nextIndex];

  // Immediate update of background and text
  setIndex(nextIndex);
  setBg(bannerSlides[nextIndex].backgroundColor);

  // Reset all slides
  slideRefs.current.forEach((el) => {
    if (!el) return;
    gsap.set(el, {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 0,
      transformOrigin: "50% 50%",
    });
  });

  // 1️⃣ Set incoming slide to offscreen based on direction
  gsap.set(next, {
    x: direction === 1 ? -FAR_X : FAR_X, // left for next, right for prev
    y: 0,
    scale: 0.8,
    opacity: 1,
  });

  // 2️⃣ Animate slides
  gsap.timeline({ defaults: { duration: 1.5, ease: "power3.inOut" } })
    .to(current, {
      x: direction === 1 ? FAR_X : -FAR_X, // move current opposite direction
      y: FAR_Y,
      scale: 0.8,
      opacity: 0,
    })
    .to(
      next,
      {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
      },
      "<"
    );
};




  /* ===== TITLE ANIMATION (ONLY THIS PART IS NEW) ===== */
useEffect(() => {
  slideRefs.current.forEach((el) => {
    if (!el) return;
    gsap.set(el, {
      xPercent: -50, // replaces -translate-x-1/2
      y: 0,
      scale: 1,
      opacity: 0,
    });
  });

  // make the first slide visible initially
  if (slideRefs.current[0]) {
    gsap.set(slideRefs.current[0], { opacity: 1 });
  }
}, []);

useEffect(() => {
  if (!leftTitleRef.current || !rightTitleRef.current) return;

  // reset before animating (prevents drift)
  gsap.set(leftTitleRef.current, { x: -120, opacity: 0 });
  gsap.set(rightTitleRef.current, { x: 120, opacity: 0 });

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.to(leftTitleRef.current, {
    x: 0,
    opacity: 1,
    duration: 1.1,
  }).to(
    rightTitleRef.current,
    {
      x: 0,
      opacity: 1,
      duration: 1.1,
    },
    "<"
  );

  return () => {
    tl.kill();
  };
}, [index]);

useEffect(() => {
  const interval = setInterval(() => {
    animate(1); // automatically go to the next slide
  }, 3000); // 3 seconds

  return () => clearInterval(interval); // cleanup on unmount
}, [index]); // optional: you can remove 'index' if animate handles the state correctly

  /* ================================================ */

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
      className="w-full h-[580px] overflow-hidden transition-colors duration-1000"
      style={{ backgroundColor: bg }}
    >
     <div className="relative h-full max-w-[1460px] mx-auto px-6 flex flex-col justify-between lg:justify-between">


        {/* IMAGE LAYER */}
        <div className="absolute inset-0 pointer-events-none hidden lg:flex items-center justify-center">
          {slideImages.map((_, i) => (
            <img
              key={i}
              ref={(el) => {
                if (el) slideRefs.current[i] = el;
              }}
              src={slideImages[i]}
              alt={bannerSlides[i].title}
              className={`absolute left-1/2 -translate-x-1/2 h-[100%] max-w-[620px]  object-contain transition-opacity duration-1000 ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>

        {/* ===== MOBILE STACK (TEXT TOP, IMAGE BOTTOM) ===== */}
<div className="flex flex-col-reverse gap-4 lg:hidden pt-10">
  {/* MOBILE IMAGE WITH CONTROLS */}
  <div className="relative flex  justify-center">
    <img
      src={slideImages[index]}
      alt={bannerSlides[index].title}
      className="h-[35vh] object-contain"
    />

    {/* CONTROLS ON IMAGE */}
    {/* <div className="absolute inset-0 top-24 flex items-center justify-between px-4">
      <button
        onClick={() => animate(-1)}
        className="w-9 h-9 rounded-full border-2 border-white text-white font-bold"
      >
        &lt;
      </button>
      <button
        onClick={() => animate(1)}
        className="w-9 h-9 rounded-full border-2 border-white text-white font-bold"
      >
        &gt;
      </button>
    </div> */}
  </div>

  {/* CENTERED TEXT */}
  <div className="flex flex-col items-center text-center text-white px-4 z-30">
    <h2 className="text-[36px] lg:text-[44px] xl:text-[56px] font-bold">
      {bannerSlides[index].title}
    </h2>
    <p className="mt-2 text-[20px] text-white/50">
      {bannerSlides[index].description}
    </p>
    <button
      className="mt-4 px-4 py-2 bg-white rounded-lg font-semibold"
      style={{ color: bg }}
    >
      Learn More
    </button>
  </div>
</div>



    {/* TITLES ROW */}
<div className="hidden md:flex relative w-full max-w-[1440px] mx-auto items-center justify-between overflow-hidden px-6 pt-24">
  {left && (
    <div
      ref={leftTitleRef}
      className="text-left text-white font-bold leading-tight
                 text-[32px] lg:text-[56px] xl:text-[68px]"
    >
      {left}
    </div>
  )}

  {right && (
    <div
      ref={rightTitleRef}
      className="text-right text-white font-bold leading-tight
                 text-[32px] lg:text-[56px] xl:text-[68px]"
    >
      {right}
    </div>
  )}
</div>


       {/* BOTTOM CARD */}
<div className="hidden md:flex items-center justify-between w-full max-w-[1440px] mx-auto pb-10 px-6 z-40">
  {/* LEFT: TEXT */}
  <div className="max-w-[400px] text-white">
    <h2 className="text-[24px] lg:text-[36px] xl:text-[40px] font-bold">
      {bannerSlides[index].title}
    </h2>
    <p className="mt-2 text-[20px] lg:text-[24px] xl:text-[28px] text-white/50">
      {bannerSlides[index].description}
    </p>
    <button
      className="mt-4 px-4 py-2 bg-white rounded-lg font-semibold"
      style={{ color: bg }}
    >
      Learn More
    </button>
  </div>

  {/* RIGHT: ARROWS */}
  {/* <div className="flex gap-3 lg:gap-6 text-white text-xl lg:text-3xl font-bold select-none">
    <button
      onClick={() => animate(-1)}
      className="px-3 py-1 lg:px-4 lg:py-2 rounded-full border-2 border-white"
    >
      &lt;
    </button>
    <button
      onClick={() => animate(1)}
      className="px-3 py-1 lg:px-4 lg:py-2 rounded-full border-2 border-white"
    >
      &gt;
    </button>
  </div> */}
</div>


      </div>
    </div>
  );
};

export default CircleCarousel;



