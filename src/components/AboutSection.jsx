"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import StoryModal from "./About/StoryModal";
import styles from "./AboutSection.module.css";

const HIGHLIGHTS = [
  { value: "100%", label: "Phác đồ cá nhân hóa" },
  { value: "HIFU và RF", label: "Chăm sóc chuyên sâu" },
  { value: "1:1", label: "Đồng hành & bảo hành" },
];

const DEFAULT_IMAGES = [
  {
    src: "/images/about/about-xavia.webp",
    alt: "Không gian trị liệu và chăm sóc da tại XAVIA SPA",
  },
  {
    src: "/images/about/about-xavia-2.webp",
    alt: "Phòng chăm sóc da chuyên sâu XAVIA SPA",
  },
  {
    src: "/images/about/about-xavia-3.webp",
    alt: "Không gian tại XAVIA SPA",
  },
];

export default function AboutSection({
  onOpenBooking = undefined,
  moreHref = "#services",
  images = DEFAULT_IMAGES,
}) {
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [paused, setPaused] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const touchStartX = useRef(null);

  const slideCount = images.length;
  const currentImage = images[activeIndex] || images[0];

  const goToSlide = (nextIdx) => {
    if (slideCount <= 1) return;
    const normalized = ((nextIdx % slideCount) + slideCount) % slideCount;
    if (normalized === activeIndex) return;
    setPrevIndex(activeIndex);
    setActiveIndex(normalized);
  };

  // Kích hoạt animation chữ khi section đi vào khung nhìn
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setRevealed(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -32px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused || slideCount <= 1 || storyOpen) return;
    const timer = setInterval(() => {
      goToSlide(activeIndex + 1);
    }, 4500);
    return () => clearInterval(timer);
  }, [paused, slideCount, activeIndex, storyOpen]);

  const handleTouchStart = (e) => {
    setPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current !== null && slideCount > 1) {
      const delta = e.changedTouches[0].clientX - touchStartX.current;
      if (Math.abs(delta) > 36) {
        goToSlide(delta < 0 ? activeIndex + 1 : activeIndex - 1);
      }
    }
    touchStartX.current = null;
    setPaused(false);
  };

  const handleBookFromStory = () => {
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      const bookingEl =
        document.getElementById("booking") || document.getElementById("contact");
      if (bookingEl) {
        bookingEl.scrollIntoView({ behavior: "smooth" });
      } else if (moreHref) {
        window.location.hash = moreHref.replace(/^#/, "");
      }
    }
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="about"
        className={`${styles.aboutSection} ${revealed ? styles.isRevealed : ""}`}
        aria-labelledby="about-heading"
      >
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* CỘT NỘI DUNG TÓM TẮT (BÊN TRÁI) */}
            <div className={styles.contentCol}>
              <div className={styles.textMask} style={{ "--d": "0ms" }}>
                <span className={styles.eyebrow}>
                  <span className={styles.eyebrowLine} aria-hidden="true" />
                  Về XAVIA SPA
                </span>
              </div>

              <div className={styles.textMask} style={{ "--d": "80ms" }}>
                <h2 id="about-heading" className={styles.heading}>
                  Chăm đúng từ gốc,{" "}
                  <em>đẹp bền theo thời gian</em>
                </h2>
              </div>

              <div className={styles.textFade} style={{ "--d": "160ms" }}>
                <p className={styles.description}>
                  Phục hồi nền da, quản lý mụn &amp; nâng cơ HIFU, RF — cá nhân
                  hóa, theo dõi 1:1.
                </p>
              </div>

              <div className={styles.textFade} style={{ "--d": "230ms" }}>
                <div className={styles.statsRow}>
                  {HIGHLIGHTS.map((item) => (
                    <div key={item.label} className={styles.statItem}>
                      <strong className={styles.statValue}>{item.value}</strong>
                      <span className={styles.statLabel}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.textFade} style={{ "--d": "300ms" }}>
                <div className={styles.actions}>
                  <button
                    type="button"
                    onClick={() => setStoryOpen(true)}
                    className={styles.btnGold}
                  >
                    Xem chi tiết <span aria-hidden="true">→</span>
                  </button>

                  {onOpenBooking ? (
                    <button
                      type="button"
                      onClick={onOpenBooking}
                      className={styles.btnOutline}
                    >
                      Đặt lịch tư vấn
                    </button>
                  ) : (
                    <a href="#booking" className={styles.btnOutline}>
                      Đặt lịch tư vấn
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* CỘT HÌNH ẢNH KHÔNG GIAN SPA (BÊN PHẢI) */}
            <div
              className={`${styles.mediaCol} ${styles.textFade}`}
              style={{ "--d": "140ms" }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className={styles.frameDecor} aria-hidden="true" />

              <div className={styles.imageCard}>
                {images.map((img, idx) => {
                  const isActive = idx === activeIndex;
                  const isPrev = idx === prevIndex && idx !== activeIndex;
                  return (
                    <div
                      key={img.src}
                      className={`${styles.slide} ${
                        isActive
                          ? styles.slideActive
                          : isPrev
                          ? styles.slideExit
                          : styles.slideWaiting
                      }`}
                      aria-hidden={!isActive}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 767px) 62vw, (max-width: 1023px) 92vw, 54vw"
                        className={styles.image}
                      />
                    </div>
                  );
                })}

                <div className={styles.blendOverlay} aria-hidden="true" />

                {slideCount > 1 && (
                  <div
                    className={styles.sliderDots}
                    role="tablist"
                    aria-label="Chọn hình ảnh không gian XAVIA SPA"
                  >
                    {images.map((img, idx) => (
                      <button
                        key={img.src}
                        type="button"
                        role="tab"
                        aria-selected={idx === activeIndex}
                        aria-label={img.alt || `Ảnh ${idx + 1}`}
                        className={`${styles.dot} ${
                          idx === activeIndex ? styles.dotActive : ""
                        }`}
                        onClick={() => goToSlide(idx)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {currentImage?.alt && (
                <div className={styles.floatingTag}>
                  <span className={styles.tagDot} aria-hidden="true" />
                  <span>{currentImage.alt}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <StoryModal
        isOpen={storyOpen}
        onClose={() => setStoryOpen(false)}
        onBook={handleBookFromStory}
      />
    </>
  );
}