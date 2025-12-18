export default function Hero() {
  return (
    <section className="relative h-[100px] border-b-3 border-[#E7E7E7] bg-[url('/images/ToPanelBg.svg')] bg-cover bg-center bg-no-repeat md:h-[198px]">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 from-[7%] to-black/0 to-[50%]" />
    </section>
  );
}
