import React, { ReactNode } from "react";
import Header from "./Header";
interface LayoutProps {
  children: ReactNode;
  blueBackground?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  blueBackground = false,
}) => {
  return (
    <>
      <Header />
      <main
        style={{
          backgroundColor: blueBackground ? "#97AFDE" : "transparent",
          minHeight: "100vh",
          paddingTop: "20px",
        }}
      >
        {children}
      </main>
    </>
  );
};

export default Layout;
