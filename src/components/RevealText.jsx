"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./RevealText.module.css";

export default function RevealText({
  children,
  as: Component = "div",
  delay = 0,
  masked = false,
  className = "",
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -36px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      style={{ "--reveal-delay": `${delay}ms` }}
      className={`${styles.reveal} ${masked ? styles.masked : ""} ${
        shown ? styles.shown : ""
      } ${className}`}
    >
      {masked ? <span className={styles.inner}>{children}</span> : children}
    </Component>
  );
}