import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollProgress() {
  const progressRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Sayfa yüksekliğine göre değer güncelleniyor
      ScrollTrigger.create({
        start: 0,
        end: "max", // Sayfa sonuna kadar
        onUpdate: (self) => {
          const scrollProgress = self.progress * 100;
          if (progressRef.current) {
            progressRef.current.value = scrollProgress;
          }
        },
      });
    }
  }, []);

  return (
    <progress
      ref={progressRef}
      max="100"
      value="0"
      className="w-full fixed top-0 left-0 h-2 z-50 text-blue-500"
    />
  );
}
