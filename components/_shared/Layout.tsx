import React from "react";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-b from-gray-50 via-gray-50 to-lightaccent">
      {children}
      <Footer />
    </div>
  );
}
