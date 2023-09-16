export default function ArticleCard() {
  return (
    <div
      className="group bg-no-repeat shadow-blogImg bg-cover rounded-lg py-12 col-span-3 h-[450px]"
      style={{ backgroundImage: "url('/images/blog/blog1.jpg')" }}
    >
      <div
        className="mx-auto flex flex-col justify-between h-full"
        style={{ width: "clamp(90%, 80%, 300px)" }}
      >
        <p className="text-xs font-inter font-black tracking-widest text-white">
          ARTICLE
        </p>
        <div>
          <a href="https://datahub.io/blog/COVID-19-and-compartmental-models-in-epidemiology">
            <p className="w-full text-xl font-inter font-semibold text-white">
              COVID-19 and Compartmental Models in Epidemiology
            </p>
            <p className="text-base text-white mt-4 line-clamp-3 group-hover:line-clamp-6">
              The severity of the current SARS-CoV-2 epidemic is undeniable:
              since the latest months of 2019, the COVID-19 outbreak is having a
              significant impact in the world at the macro level, starting its
              spread from China, then to the Asia-Pacific and then around the
              rest of the globe.
            </p>
          </a>
          <div className="mt-8 flex items-center">
            <img
              className="w-9 h-9 bg-gray-300 rounded-full"
              src="https://www.gravatar.com/avatar/36661def37f62e4130670ab75e06465a?d=https%3A%2F%2Ftesting.datahub.io%2Fstatic%2Fimg%2Flogo-cube03.png"
              alt="author"
            />
            <div className="ml-4 text-white font-roboto">
              <p className="font-bold text-sm">Rufus Pollock</p>
              <p className="text-xs text-accent -mt-2">
                May 8, 2020 &nbsp;
                <span className="text-white text-lg align-bottom">&#8228;</span>
                &nbsp; 5 min read
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
