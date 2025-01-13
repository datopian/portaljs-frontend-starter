import React, { FC, ReactNode, useCallback } from "react";
import styles from "./styles.module.scss";
import { Inter } from "next/font/google";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

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
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
  }, []);

  return (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          particles: {
            destroy: {
              mode: "split",
              split: {
                count: 1,
                factor: {
                  value: {
                    min: 2,
                    max: 4,
                  },
                },
                rate: {
                  value: 100,
                },
                particles: {
                  life: {
                    count: 1,
                    duration: {
                      value: {
                        min: 2,
                        max: 3,
                      },
                    },
                  },
                  move: {
                    speed: {
                      min: 10,
                      max: 15,
                    },
                  },
                },
              },
            },
            number: {
              value: 20,
            },
            color: {
              value: ["#00DEF2", "#6990BE", "#00375F", "#FFB88A"],
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0,
            },
            stroke: {
              width: 1,
            },

            size: {
              value: {
                min: 2,
                max: 4,
              },
            },
            collisions: {
              enable: true,
              mode: "bounce",
            },
            move: {
              enable: true,
              speed: 1,
              outModes: "bounce",
            },
          },
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "pop",
              },
            },
          },
          background: {
            color: "transparent",
          },
        }}
      />
      <a
        href="#main-content"
        className="absolute left-0 top-0 bg-accent text-white py-2 px-4 z-50 transform -translate-y-full focus:translate-y-0 transition"
      >
        Skip to main content
      </a>
      <div className={` ${styles.LightTheme} ${inter.className} relative`}>
        {Header && <Header />}
        <div className="content-wrapper">
          {Sidebar && <Sidebar />}
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
        </div>
        {Footer && <Footer />}
      </div>
    </>
  );
};

export default LigtherTheme;
