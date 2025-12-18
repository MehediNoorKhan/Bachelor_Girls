// import React, { useRef, useState } from "react";
// import { gsap } from "gsap";
// import { bannerSlides } from "@/utils/banner";

// const FAR_X = 1200;
// const FAR_Y = 400;

// const CircleCarousel: React.FC = () => {
//   const slideRefs = useRef<HTMLDivElement[]>([]);
//   const [index, setIndex] = useState(0);
//   const [bg, setBg] = useState(bannerSlides[0].backgroundColor);

//   const slideImages = [
//     "/images/bannerimg1.png",
//     "/images/bannerimg2.png",
//     "/images/bannerimg3.png",
//     "/images/bannerimg4.png",
//     "/images/bannerimg5.png",
//   ];

//   const animate = (direction: 1 | -1) => {
//     const current = slideRefs.current[index];
//     const nextIndex =
//       (index + direction + bannerSlides.length) % bannerSlides.length;
//     const next = slideRefs.current[nextIndex];

//     gsap.set(next, {
//       x: -direction * FAR_X,
//       y: FAR_Y,
//       scale: 0,
//       opacity: 1,
//       zIndex: 2,
//     });

//     gsap.timeline({
//       defaults: { duration: 1, ease: "power3.inOut" },
//       onComplete: () => {
//         setIndex(nextIndex);
//         setBg(bannerSlides[nextIndex].backgroundColor);
//       },
//     })
//       .to(current, {
//         x: direction * FAR_X,
//         y: FAR_Y,
//         scale: 0,
//         opacity: 0,
//       })
//       .to(next, { x: 0, y: 0, scale: 1, opacity: 1 }, "<");
//   };

//   // Split title into left and right parts
//   const getTitleParts = (title: string) => {
//     const words = title.split(" ");
//     const middle = Math.ceil(words.length / 2);
//     return {
//       left: words.slice(0, middle).join(" "),
//       right: words.slice(middle).join(" "),
//     };
//   };

//   const { left: leftTitle, right: rightTitle } = getTitleParts(
//     bannerSlides[index].title
//   );

//   return (
//     <div
//       className="w-full h-[600px] relative  overflow-hidden transition-colors duration-700"
//       style={{ backgroundColor: bg }}
//     >
//       {/* Carousel Content: Image with split title */}
//       <div className="relative w-full h-full flex items-center justify-center">
//         {slideImages.map((src, i) => (
//           <div
//             key={i}
//             ref={(el) => {
//               if (el) slideRefs.current[i] = el;
//             }}
//             className="absolute top-1/2 left-1/2 transform -translate-x-1/2 flex items-center justify-center h-full"
//             style={{
//               opacity: i === index ? 1 : 0,
//               zIndex: i === index ? 2 : 1,
//             }}
//           >
//             {/* Left Title */}
//             <div className="text-white text-6xl font-bold whitespace-nowrap z-20">
//               {leftTitle}
//             </div>

//             {/* Centered Image */}
//             <img
//               src={src}
//               alt={bannerSlides[i].title}
//               className="object-contain w-auto h-[100%]"
//             />

//             {/* Right Title */}
//             <div className="text-white text-6xl font-bold whitespace-nowrap z-20 ">
//               {rightTitle}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Fixed Bottom-Left Text */}
//       <div className="absolute bottom-8 left-8 max-w-[20%] text-white z-10">
//         <h2 className="text-4xl font-bold">{bannerSlides[index].title}</h2>
//         <p className="mt-2 text-lg">{bannerSlides[index].description}</p>
//         <button className="mt-4 px-4 py-2 bg-white text-black rounded-lg font-semibold hover:bg-white/90 transition">
//           Learn More
//         </button>
//       </div>

//       {/* Controls: < and > */}
//       <div className="absolute right-24 bottom-24 transform -translate-y-1/2 flex gap-6 z-20 text-white text-3xl font-bold cursor-pointer select-none">
//         <span onClick={() => animate(-1)} className="px-4 py-2 rounded-full border-2 border-white hover:text-gray-300 transition">
//           &lt;
//         </span>
//         <span onClick={() => animate(1)} className="px-4 py-2 rounded-full border-2 border-white hover:text-gray-300 transition">
//           &gt;
//         </span>
//       </div>
//     </div>
//   );
// };

// export default CircleCarousel;



import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { bannerSlides } from "@/utils/banner";

const FAR_X = 1200;
const FAR_Y = 400;

const CircleCarousel: React.FC = () => {
  const slideRefs = useRef<HTMLDivElement[]>([]);
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

    gsap.set(next, {
      x: -direction * FAR_X,
      y: FAR_Y,
      scale: 0,
      opacity: 1,
      zIndex: 2,
    });

    gsap.timeline({
      defaults: { duration: 1, ease: "power3.inOut" },
      onComplete: () => {
        setIndex(nextIndex);
        setBg(bannerSlides[nextIndex].backgroundColor);
      },
    })
      .to(current, {
        x: direction * FAR_X,
        y: FAR_Y,
        scale: 0,
        opacity: 0,
      })
      .to(next, { x: 0, y: 0, scale: 1, opacity: 1 }, "<");
  };

  // Split title into left and right parts
  const getTitleParts = (title: string) => {
    const words = title.split(" ");
    const middle = Math.ceil(words.length / 2);
    return {
      left: words.slice(0, middle).join(" "),
      right: words.slice(middle).join(" "),
    };
  };

  const { left: leftTitle, right: rightTitle } = getTitleParts(
    bannerSlides[index].title
  );

  return (
    <div
      className="w-full h-[700px] sm:h-[500px] xs:h-[400px] relative overflow-hidden transition-colors duration-700"
      style={{ backgroundColor: bg }}
    >
      {/* Carousel Content: Image with split title */}
      <div className="relative w-full h-full flex items-center justify-center">
        {slideImages.map((src, i) => (
          <div
  key={i}
  ref={(el) => {
    if (el) slideRefs.current[i] = el;
  }}
  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-full"
  style={{
    opacity: i === index ? 1 : 0,
    zIndex: i === index ? 2 : 1,
  }}
>
  {/* Left Title */}
  {leftTitle && (
    <div className="hidden lg:block absolute right-full mr-4 top-1/2 lg:top-36 transform -translate-y-1/2 text-white font-bold whitespace-nowrap z-20 text-4xl sm:text-3xl xs:text-2xl">
      {leftTitle}
    </div>
  )}

  {/* Centered Image */}
  <img
    src={src}
    alt={bannerSlides[i].title}
    className="object-contain md:object-cover w-auto h-[100%] mx-auto relative z-10 md:-bottom-12 left-12 md:left-0"
  />

  {/* Right Title */}
  {rightTitle && (
    <div className="hidden lg:block absolute left-full ml-4 top-1/2 lg:top-36 transform -translate-y-1/2 text-white font-bold whitespace-nowrap z-20 text-4xl sm:text-3xl xs:text-2xl">
      {rightTitle}
    </div>
  )}
</div>

        ))}
      </div>

      {/* Fixed Bottom-Left Text */}
      <div className="absolute bottom-8 left-8 sm:bottom-6 sm:left-4 xs:bottom-4 xs:left-2 max-w-[20%]  text-white z-10">
        <h2 className="text-4xl  font-bold">
          {bannerSlides[index].title}
        </h2>
        <p className="mt-2 text-lg">
          {bannerSlides[index].description}
        </p>
        <button className="mt-4 px-4 py-2  bg-white text-black rounded-lg font-semibold hover:bg-white/90 transition text-sm sm:text-xs">
          Learn More
        </button>
      </div>

      {/* Controls: < and > */}
      <div className="absolute right-12 bottom-36 md:right-12 md:bottom-24 transform -translate-y-1/2 flex gap-6 sm:gap-4 xs:gap-2 z-20 text-white text-3xl sm:text-2xl xs:text-xl font-bold cursor-pointer select-none">
        <span
          onClick={() => animate(-1)}
          className="px-2 md:px-4 md:py-2  rounded-full border-2 border-white hover:text-gray-300 transition"
        >
          &lt;
        </span>
        <span
          onClick={() => animate(1)}
          className="px-2 md:px-4 md:py-2  rounded-full border-2 border-white hover:text-gray-300 transition"
        >
          &gt;
        </span>
      </div>
    </div>
  );
};

export default CircleCarousel;




