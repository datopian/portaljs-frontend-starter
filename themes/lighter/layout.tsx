import React from "react";
import styles from "./styles.module.scss";

const LigtherTheme = ({
  Header,
  Sidebar,
  Footer,
  children,
}: {
  Header?: React.JSXElementConstructor<any>;
  Sidebar?: React.JSXElementConstructor<any>;
  Footer?: React.JSXElementConstructor<any>;
  children: React.ReactElement;
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
