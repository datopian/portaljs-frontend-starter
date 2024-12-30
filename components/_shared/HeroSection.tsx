export default function HeroSection({
  title = "Search",
  titleAccent = "",
  cols = "1",
}) {
  return (
    <section className={`row-start-1 row-span-3 col-span-full`}>
      <div
        className="bg-cover bg-center bg-no-repeat  pt-[60px] pb-[36px] flex flex-col"
        style={{}}
      >
        <div
          className={`grid md:grid-cols-${cols} mx-auto items-center grow mx-auto custom-container bg-white`}
        >
          <div className="col-span-1">
            <h1 className="text-[24px] md:text-[50px] font-black lg:max-w-[80%]">
              {title} <span className="text-accent">{titleAccent}</span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
