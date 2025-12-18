export default function Hero({ title }: { title: string }) {
  return (
    <section>
      <div className="relative h-[100px] border-b-3 border-[#E7E7E7] bg-[url('/images/ToPanelBg.svg')] bg-cover bg-center bg-no-repeat md:h-[198px]">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 from-[7%] to-black/0 to-[50%]" />
      </div>
      <div className="max-2xl:px-2">
        <div className="border-primary bg-background/30 relative -top-8 mx-auto w-fit max-w-xs rounded-2xl border-2 px-4 backdrop-blur-xs md:max-w-lg md:px-7">
          <h4 className="py-3 text-center text-2xl font-extrabold md:text-3xl lg:text-[42px]">
            {title}
          </h4>
        </div>
      </div>
    </section>
  );
}
