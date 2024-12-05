import React, { JSXElementConstructor, ReactElement } from "react";
import styles from "./styles.module.scss";

const DefaultTheme = ({
  Header,
  Sidebar,
  Footer,
  children,
}: {
  Header: React.JSXElementConstructor<any>;
  Sidebar: React.JSXElementConstructor<any>;
  Footer: React.JSXElementConstructor<any>;
  children: React.ReactElement;
}) => {
  console.log(Footer);
  return (
    <div
      className={`bg-gradient-to-b from-gray-50 via-gray-50 to-lightaccent ${styles.Theme}`}
    >
      {/* Optional Header */}
      {Header && (
        <div className="absolute top-0 z-10 w-full left-0">
          <Header />
        </div>
      )}
      <div className="content-wrapper">
        {/* Optional Sidebar */}
        {Sidebar && <Sidebar />}

        {/* Main Content (required) */}
        <main className="main-content">{children}</main>
      </div>
      {Footer && <Footer />}
    </div>
  );
};

export default DefaultTheme;
