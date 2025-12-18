// import SectionErrors from "@/components/errors/SectionErrors";
// import Icon from "@/components/Icon";
// import { cn } from "@/lib/utils";
// import HeroSkelton from "@/pages/home/skelaton/HeroSkelton";
// import { useHomeQuery } from "@/store/api/homeApi";
// import type { IHome } from "@/types";
// import { Link } from "react-router";
// import SearchForm from "./SearchForm";

import CircleCarousel from "./CircleCarousel";

// export default function Hero() {
//   const { data, isLoading, isError } = useHomeQuery();
//   const home: IHome = data?.data || ({} as IHome);

//   if (isLoading) {
//     return <HeroSkelton />;
//   }

//   if (isError) {
//     return <SectionErrors />;
//   }

//   return (
//     <section
//       className={cn(
//         "relative flex min-h-[20vh] flex-col items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-4 sm:min-h-[45vh] md:min-h-[60vh] lg:min-h-[75vh]",
//       )}
//       style={{
//         backgroundImage: `url(${home?.image || "/images/hero-bg.jpg"})`,
//       }}
//     >
//       <div className="absolute top-0 left-0 z-0 h-full w-full bg-black opacity-50" />
//       <div className="z-10 container mx-auto flex flex-col gap-6 px-0 md:gap-10">
//         <h1 className="max-w-3xl text-center text-xl font-bold text-white max-sm:mt-5 sm:text-4xl md:text-left md:text-5xl lg:text-6xl">
//           {/* Book top-rated services <br className="hidden sm:block" /> or start
//           selling your own. */}
//           {isLoading ? "Loading..." : home?.title}
//         </h1>
//         <SearchForm />
//         <div className="hidden flex-wrap items-center justify-center gap-2 sm:flex md:justify-start md:gap-5">
//           {home?.categories &&
//             Object.keys(home?.categories).length > 0 &&
//             !isLoading &&
//             Object.keys(home?.categories).map((category) => {
//               return (
//                 <Link
//                   key={category}
//                   className="flex items-center gap-1 rounded-xl border border-white/40 bg-white/20 px-[18px] py-3 text-sm text-white backdrop-blur-sm md:gap-2 md:text-lg"
//                   to={`/all-services?categories=${category}`}
//                 >
//                   <span className="whitespace-nowrap">
//                     {home?.categories[category]}
//                   </span>
//                   <Icon
//                     src="/icons/arrow-right.svg"
//                     className="size-4 transition hover:opacity-80"
//                   />
//                 </Link>
//               );
//             })}
//         </div>
//       </div>
//     </section>
//   );
// }




export default function Hero() {
  return (
    <div>
      <CircleCarousel></CircleCarousel>
    </div>
  )
}
