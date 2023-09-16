import ArticleCard from "./ArticleCard";

export default function BlogSection() {
  return (
    <section className="custom-container homepage-padding">
      <div className="my-4">
        <div className="inline-block align-middle w-12 h-0.5  border border-darkbrown" />
        <div className="inline-block font-roboto text-sm text-center">
          &nbsp; BLOG
        </div>
      </div>
      <h1 className="mt-8 font-inter font-black text-4xl md:text-left text-center">
        Latest News
      </h1>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
        <section className="col-span-1">
          <ArticleCard />
        </section>
        <section className="col-span-1">
          <ArticleCard />
        </section>
        <section className="col-span-1">
          <ArticleCard />
        </section>
      </section>
    </section>
  );
}
