import Link from "next/link";

export function Organizations() {
  return (
    <Link href="/organizations">
      <div className="group bg-white p-8 rounded-lg shadow-md py-16 hover:bg-darkaccent cursor-pointer h-full">
        <img className="m-auto" src="/images/upload.svg" alt="Upload icon" />
        <h1 className="group-hover:text-white text-2xl uppercase font-black pt-4 font-inter text-center">
          {" "}
          Organizations{" "}
        </h1>
        <p className="group-hover:text-white text-center text-black font-sans pt-2">
          {" "}
          See publisher organizations <br /> available on Portal.
        </p>
      </div>
    </Link>
  );
}

export function Groups() {
  return (
    <Link href="/groups">
      <div className="group bg-white p-8 rounded-lg shadow-md py-16 hover:bg-darkaccent cursor-pointer h-full">
        <img className="m-auto" src="/images/request.svg" alt="Request icon" />
        <h1 className="group-hover:text-white text-2xl uppercase font-black text-black pt-4 font-inter text-center">
          {" "}
          Groups{" "}
        </h1>
        <p className="group-hover:text-white text-center text-black font-inter pt-2">
          {" "}
          Browse datasets <br /> by categories.
        </p>
      </div>
    </Link>
  );
}

export function FindData() {
  return (
    <Link href="/search">
      <div className="group bg-white rounded-lg shadow-md py-20 hover:bg-darkaccent cursor-pointer h-full">
        <img className="m-auto" src="/images/search.svg" alt="Search icon" />
        <h1 className="group-hover:text-white text-2xl uppercase font-black pt-4 font-inter text-center">
          {" "}
          Find data{" "}
        </h1>
        <p className="group-hover:text-white text-center font-inter pt-2">
          {" "}
          Discover datasets and gain <br /> insights from data.
        </p>
      </div>
    </Link>
  );
}
