import React from "react";
import { useRouter } from "next/router";

const LOADER_THRESHOLD = 250;

export default function Loader(props) {
  const [isLoading, setLoading] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    let timer;

    const start = () =>
      (timer = setTimeout(() => setLoading(true), LOADER_THRESHOLD));

    const end = () => {
      if (timer) {
        clearTimeout(timer);
      }
      setLoading(false);
    };

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);

      if (timer) {
        clearTimeout(timer.current);
      }
    };
  }, [router.events]);

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-white bg-opacity-50 flex flex-col items-center justify-center">
      <div
        className="animate-spin inline-block w-16 h-16 border-[5px] border-current border-t-transparent text-accent rounded-full"
        role="status"
        aria-label="loading"
      ></div>
    </div>
  );
}
