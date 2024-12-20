import Link from "next/link";

export default function PortalDefaultLogo() {
  return (
    <Link href="/">
      <div
        className="leading-[16px] text-[16px] w-[50px] border-b-[4px] border-accent text-white bg-[var(--dark)] rounded flex items-center justify-center p-2  uppercase break-all"
        style={{ height: 55 }}
      >
        Portal
      </div>
    </Link>
  );
}
