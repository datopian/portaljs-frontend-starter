import React, { FC, ReactNode } from "react";
import styles from "./styles.module.scss";

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
      <div className={` ${styles.LightTheme}`}>
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
