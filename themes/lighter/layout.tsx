import React, { FC, ReactNode } from "react";
import styles from "./styles.module.scss";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

const LigtherTheme = ({
  Header,
  Sidebar,
  Footer,
  children,
}: {
  Header?: FC;
  Sidebar?: FC;
  Footer?: FC;
  children: ReactNode;
}) => {
  return (
    <>
      <div className={` ${styles.LightTheme} ${inter.className}`}>
        {Header && <Header />}
        <div className="content-wrapper">
          {Sidebar && <Sidebar />}
          <main className="main-content">{children}</main>
        </div>
        {Footer && <Footer />}
      </div>
    </>
  );
};

export default LigtherTheme;
