"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./AboutSection.module.css";

const HIGHLIGHTS = [
  { value: "100%", label: "Phác đồ cá nhân hóa" },
  { value: "Chuyên sâu", label: "Đội ngũ kỹ thuật viên" },
  { value: "An toàn", label: "Chuẩn mực chăm sóc da" },
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [paused, setPaused] = useState(false);
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

  useEffect(() => {
    if (paused || slideCount <= 1) return;
    const timer = setInterval(() => {
      goToSlide(activeIndex + 1);
    }, 4500);
    return () => clearInterval(timer);
  }, [paused, slideCount, activeIndex]);

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

  return (
    <section
      id="about"
      className={styles.aboutSection}
      aria-labelledby="about-heading"
    >
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* CỘT NỘI DUNG (BÊN TRÁI) */}
          <div className={styles.contentCol}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowLine} aria-hidden="true" />
              VỀ XAVIA SPA
            </span>

            <h2 id="about-heading" className={styles.heading}>
              Chăm sóc da{" "}
              <em>cá nhân hóa</em>
            </h2>

            {/* Đoạn mô tả: ẩn trên mobile để nhường diện tích ngang cho ảnh, hiện từ >= 768px */}
            <p className={styles.description}>
              Công nghệ tiên tiến cùng chuyên gia giàu kinh nghiệm, tối ưu cho
              từng làn da.
            </p>

            {/* Chỉ số tóm tắt: hiện từ tablet/desktop */}
            <div className={styles.statsRow}>
              {HIGHLIGHTS.map((item) => (
                <div key={item.label} className={styles.statItem}>
                  <strong className={styles.statValue}>{item.value}</strong>
                  <span className={styles.statLabel}>{item.label}</span>
                </div>
              ))}
            </div>

            <div className={styles.actions}>
              <a href={moreHref} className={styles.btnGold}>
                Xem chi tiết <span aria-hidden="true">→</span>
              </a>

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

          {/* CỘT HÌNH ẢNH KHÔNG GIAN SPA (BÊN PHẢI) */}
          <div
            className={styles.mediaCol}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Khung viền trang trí nằm dưới/sau ảnh chính */}
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

              {/* Lớp hòa quyện ảnh vào nền kem #F6F3EA */}
              <div className={styles.blendOverlay} aria-hidden="true" />

              {/* Thanh chấm chuyển ảnh */}
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
  );
}