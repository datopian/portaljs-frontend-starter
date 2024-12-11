export default function HeroSection() {
  return (
    <section className="row-start-1 row-span-3 col-span-full">
      <div
        className="bg-cover bg-center bg-no-repeat  pt-[60px] pb-[36px] flex flex-col"
        style={{}}
      >
        <div className="grid md:grid-cols-2 mx-auto items-center grow mx-auto custom-container">
          <div className="col-span-1">
            <h1 className="text-[55px] font-black ">
              Search <span className="text-[var(--accent)]">datasets</span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
