export default function HeroSection() {
  return (
    <section className="row-start-1 row-span-3 col-span-full">
      <div
        className="bg-cover bg-center bg-no-repeat  py-[80px] flex flex-col"
        style={{}}
      >
        {/*<TopBar />*/}
        <div
          className="grid md:grid-cols-2 mx-auto items-center grow"
          //This lines up the text with the search form below
          style={{ width: "min(1100px, 95vw)" }}
        >
          <div className="col-span-1">
            <h1 className="text-6xl font-black ">Search Datasets</h1>
            <h2 className="text-xl  py-6">
              Search datasets and filter by organizations or groups.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
