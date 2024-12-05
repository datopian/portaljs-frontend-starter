import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";

export default function ActionCard({ title, description, icon, href }) {
  return (
    <Link
      href={href}
      className="w-full bg-[var(--background-color)] shadow-[0px_4px_50px_0px_#0000000D] flex flex-col items-center py-10 lg:py-16  px-5 lg:px-10 text-center rounded-[10px]"
    >
      <Image src={icon} alt="" width={48} height={55} className="mb-[34px]" />
      <h3 className="font-bold mb-[14px] text-[20px] lg:text-[25px] uppercase">
        {title}
      </h3>
      <div className="tracking-[0.05em]">{description}</div>
    </Link>
  );
}
