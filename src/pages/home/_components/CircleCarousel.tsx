// import React, { useRef, useState } from "react";
// import { gsap } from "gsap";
// import { bannerSlides } from "@/utils/banner";

// const FAR_X = 500;
// const FAR_Y = 0;

// const CircleCarousel: React.FC = () => {
//   const slideRefs = useRef<HTMLImageElement[]>([]);
//   const [index, setIndex] = useState(0);
//   const [bg, setBg] = useState(bannerSlides[0].backgroundColor);

//   const slideImages = [
//      "/images/bannerimg1.png",
//     "/images/bannerimg2.png",
//     "/images/bannerimg3.png",
//     "/images/bannerimg4.png",
//     "/images/bannerimg5.png",
//   ];

//  const animate = (direction: 1 | -1) => {
//   const current = slideRefs.current[index];
//   const nextIndex = (index + direction + bannerSlides.length) % bannerSlides.length;
//   const next = slideRefs.current[nextIndex];

//   // Reset next image position
//   gsap.set(next, { x: -FAR_X, y: FAR_Y, scale: 0.8, opacity: 1 });

//   gsap
//     .timeline({
//       defaults: { duration: 1.5, ease: "power3.inOut" },
//       onComplete: () => {
//         // Reset current and next individually
//         gsap.set(current, { x: 0, y: 0, scale: 1 });
//         gsap.set(next, { x: 0, y: 0, scale: 1 });

//         setIndex(nextIndex);
//         setBg(bannerSlides[nextIndex].backgroundColor);
//       },
//     })
//     .to(current, { x: FAR_X, y: FAR_Y, scale: 0.8, opacity: 0 })
//     .to(next, { x: 0, y: 0, scale: 1, opacity: 1 }, "<");
// };


//   const getTitleParts = (title: string) => {
//     const words = title.split(" ");
//     const middle = Math.ceil(words.length / 2);
//     return {
//       left: words.slice(0, middle).join(" "),
//       right: words.slice(middle).join(" "),
//     };
//   };

//   const { left, right } = getTitleParts(bannerSlides[index].title);

//   return (
//     <div
//       className="w-full h-[580px] overflow-hidden transition-colors duration-1000"
//       style={{ backgroundColor: bg }}
//     >
//       {/* MAX WIDTH CONTAINER */}
//       <div className="relative h-full max-w-[1360px] mx-auto px-6 flex flex-col justify-between">

//         {/* IMAGE LAYER */}
//         <div className="absolute inset-0 pointer-events-none hidden lg:flex items-center justify-center">
//           {slideImages.map((_, i) => (
//             <img
//   key={i}
//   ref={(el) => { if (el) slideRefs.current[i] = el; }}
//   src={slideImages[i]}
//   alt={bannerSlides[i].title}
//   className={`absolute left-1/2 -translate-x-1/2 h-[100%] max-w-[620px] object-contain transition-opacity duration-1000 ${
//     i === index ? "opacity-100" : "opacity-0"
//   }`}
// />

//           ))}
//         </div>

//         {/* MOBILE IMAGE */}
//         <div className="lg:hidden flex justify-center">
//           <img
//             src={slideImages[index]}
//             alt={bannerSlides[index].title}
//             className="h-[30vh]  object-contain"
//           />
//         </div>

//         {/* TITLES ROW (HIDDEN ON MOBILE) */}
//         <div className="relative flex-1 flex items-center justify-center gap-6 hidden lg:flex">
//           {left && (
//             <div className="max-w-[260px] text-right text-white font-bold leading-tight text-[28px] lg:text-[40px] xl:text-[56px]">
//               {left}
//             </div>
//           )}

//           <div className="w-[520px]" />

//           {right && (
//             <div className="max-w-[220px] pl-[50px] text-left text-white font-bold leading-tight text-[28px] lg:text-[40px] xl:text-[56px]">
//               {right}
//             </div>
//           )}
//         </div>

//         {/* BOTTOM CARD */}
//         <div className="flex  justify-between items-center pb-10 gap-6">
//           {/* Text */}
//           <div className="max-w-sm text-white">
//             <h2 className="text-[18px] lg:text-[28px] font-bold">{bannerSlides[index].title}</h2>
//             <p className="mt-2 text-[14px] text-white/50">{bannerSlides[index].description}</p>
//             <button
//               className="mt-4 px-4 py-2 bg-white rounded-lg font-semibold"
//               style={{ color: bg }}
//             >
//               Learn More
//             </button>
//           </div>

//           {/* Controls */}
//           <div className="flex gap-3 lg:gap-6 text-white text-xl lg:text-3xl font-bold select-none ">
//             <button
//               onClick={() => animate(-1)}
//               className="px-3 py-1 lg:px-4 lg:py-2 rounded-full border-2 border-white hover:text-gray-300 transition"
//             >
//               &lt;
//             </button>
//             <button
//               onClick={() => animate(1)}
//               className="px-3 py-1 lg:px-4 lg:py-2 rounded-full border-2 border-white hover:text-gray-300 transition"
//             >
//               &gt;
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CircleCarousel;




// import React, { useRef, useState, useEffect } from "react";
// import { gsap } from "gsap";
// import { bannerSlides } from "@/utils/banner";

// const FAR_X = 500;
// const FAR_Y = 100; // outgoing image moves downwards

// const CircleCarousel: React.FC = () => {
//   const slideRefs = useRef<HTMLImageElement[]>([]);
//   const leftTitleRef = useRef<HTMLDivElement>(null);
//   const rightTitleRef = useRef<HTMLDivElement>(null);
//   const [index, setIndex] = useState(0);
//   const [bg, setBg] = useState(bannerSlides[0].backgroundColor);

//   const slideImages = [
//     "/images/bannerimg1.png",
//     "/images/bannerimg2.png",
//     "/images/bannerimg3.png",
//     "/images/bannerimg4.png",
//     "/images/bannerimg5.png",
//   ];

//   const getTitleParts = (title: string) => {
//     const words = title.split(" ");
//     const middle = Math.ceil(words.length / 2);
//     return {
//       left: words.slice(0, middle).join(" "),
//       right: words.slice(middle).join(" "),
//     };
//   };

//   const animate = (direction: 1 | -1) => {
//     const current = slideRefs.current[index];
//     const nextIndex = (index + direction + bannerSlides.length) % bannerSlides.length;
//     const next = slideRefs.current[nextIndex];

//     const tl = gsap.timeline({
//       defaults: { duration: 1.5, ease: "power3.inOut" },
//       onComplete: () => {
//         // Reset positions after animation
//         gsap.set(current, { x: 0, y: 0, scale: 1, opacity: 0 });
//         gsap.set(next, { x: 0, y: 0, scale: 1, opacity: 1 });
//         setIndex(nextIndex);
//         setBg(bannerSlides[nextIndex].backgroundColor);
//       },
//     });

//     // Reset next image and titles
//     gsap.set(next, { x: -FAR_X, y: FAR_Y, scale: 0.8, opacity: 0 });
//     if (leftTitleRef.current) gsap.set(leftTitleRef.current, { x: -200, opacity: 0 });
//     if (rightTitleRef.current) gsap.set(rightTitleRef.current, { x: 200, opacity: 0 });

//     // Animate everything together
//     tl.to(current, { x: FAR_X, y: FAR_Y, scale: 0.8, opacity: 0 }, 0) // previous image
//       .to(next, { x: 0, y: 0, scale: 1, opacity: 1 }, 0)             // next image
//       .to(leftTitleRef.current, { x: 0, opacity: 1 }, 0)             // left title
//       .to(rightTitleRef.current, { x: 0, opacity: 1 }, 0);           // right title
//   };

//   const { left, right } = getTitleParts(bannerSlides[index].title);

//   // Ensure only current image visible on mount
//   useEffect(() => {
//     slideRefs.current.forEach((img, i) => {
//       if (img) gsap.set(img, { opacity: i === index ? 1 : 0 });
//     });
//   }, []);

//   return (
//     <div
//       className="w-full h-[580px] overflow-hidden transition-colors duration-1000"
//       style={{ backgroundColor: bg }}
//     >
//       <div className="relative h-full max-w-[1360px] mx-auto px-6 flex flex-col justify-between">

//         {/* IMAGE LAYER */}
//         <div className="absolute inset-0 pointer-events-none hidden lg:flex items-center justify-center">
//           {slideImages.map((_, i) => (
//             <img
//               key={i}
//               ref={(el) => { if (el) slideRefs.current[i] = el; }}
//               src={slideImages[i]}
//               alt={bannerSlides[i].title}
//               className="absolute left-1/2 -translate-x-1/2 h-[100%] max-w-[620px] object-contain"
//               style={{ pointerEvents: 'none' }}
//             />
//           ))}
//         </div>

//         {/* MOBILE IMAGE */}
//         <div className="lg:hidden flex justify-center">
//           <img
//             src={slideImages[index]}
//             alt={bannerSlides[index].title}
//             className="h-[30vh] object-contain"
//           />
//         </div>

//         {/* TITLES ROW */}
//         <div className="relative flex-1 flex items-center justify-center gap-6 hidden lg:flex">
//           {left && (
//             <div
//               ref={leftTitleRef}
//               className="max-w-[260px] text-right text-white font-bold leading-tight text-[28px] lg:text-[40px] xl:text-[56px]"
//             >
//               {left}
//             </div>
//           )}

//           <div className="w-[520px]" />

//           {right && (
//             <div
//               ref={rightTitleRef}
//               className="max-w-[220px] pl-[50px] text-left text-white font-bold leading-tight text-[28px] lg:text-[40px] xl:text-[56px]"
//             >
//               {right}
//             </div>
//           )}
//         </div>

//         {/* BOTTOM CARD */}
//         <div className="flex justify-between items-center pb-10 gap-6">
//           <div className="max-w-sm text-white">
//             <h2 className="text-[18px] lg:text-[28px] font-bold">{bannerSlides[index].title}</h2>
//             <p className="mt-2 text-[14px] text-white/50">{bannerSlides[index].description}</p>
//             <button
//               className="mt-4 px-4 py-2 bg-white rounded-lg font-semibold"
//               style={{ color: bg }}
//             >
//               Learn More
//             </button>
//           </div>

//           <div className="flex gap-3 lg:gap-6 text-white text-xl lg:text-3xl font-bold select-none z-30">
//             <button
//               onClick={() => animate(-1)}
//               className="px-3 py-1 lg:px-4 lg:py-2 rounded-full border-2 border-white hover:text-gray-300 transition"
//             >
//               &lt;
//             </button>
//             <button
//               onClick={() => animate(1)}
//               className="px-3 py-1 lg:px-4 lg:py-2 rounded-full border-2 border-white hover:text-gray-300 transition"
//             >
//               &gt;
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CircleCarousel;



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
    "/images/bannerimg1.png",
    "/images/bannerimg2.png",
    "/images/bannerimg3.png",
    "/images/bannerimg4.png",
    "/images/bannerimg5.png",
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
<div className="flex flex-col-reverse gap-6 lg:hidden pt-10">
  {/* MOBILE IMAGE WITH CONTROLS */}
  <div className="relative flex justify-center">
    <img
      src={slideImages[index]}
      alt={bannerSlides[index].title}
      className="h-[60vh] object-contain"
    />

    {/* CONTROLS ON IMAGE */}
    <div className="absolute inset-0 top-24 flex items-center justify-between px-4">
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
    </div>
  </div>

  {/* CENTERED TEXT */}
  <div className="flex flex-col items-center text-center text-white px-4 z-30">
    <h2 className="text-[18px] font-bold">
      {bannerSlides[index].title}
    </h2>
    <p className="mt-2 text-[14px] text-white/50">
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
                 text-[28px] lg:text-[40px] xl:text-[56px]"
    >
      {left}
    </div>
  )}

  {right && (
    <div
      ref={rightTitleRef}
      className="text-right text-white font-bold leading-tight
                 text-[28px] lg:text-[40px] xl:text-[56px]"
    >
      {right}
    </div>
  )}
</div>


       {/* BOTTOM CARD */}
<div className="hidden md:flex items-center justify-between w-full max-w-[1440px] mx-auto pb-10 px-6 z-40">
  {/* LEFT: TEXT */}
  <div className="max-w-[300px] text-white">
    <h2 className="text-[18px] lg:text-[28px] font-bold">
      {bannerSlides[index].title}
    </h2>
    <p className="mt-2 text-[14px] text-white/50">
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
  <div className="flex gap-3 lg:gap-6 text-white text-xl lg:text-3xl font-bold select-none">
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
  </div>
</div>


      </div>
    </div>
  );
};

export default CircleCarousel;



