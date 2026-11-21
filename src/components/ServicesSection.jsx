"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./ServicesSection.module.css";

const DEFAULT_SERVICES = [
  {
    id: "rejuvenation",
    title: "HIFU Nâng cơ trẻ hóa",
    subtitle: "Làn da săn chắc, rạng rỡ",
    image: "/images/services/hifu.webp",
    href: "/services/tre-hoa-da",
  },
  {
    id: "rf",
    title: "RF Trẻ hóa da",
    subtitle: "Da căng mịn, tươi trẻ",
    image: "/images/services/rf.webp",
    href: "/services/rf",
  },
  {
    id: "acne",
    title: "Điều trị mụn chuyên sâu",
    subtitle: "Da sạch mụn, mịn màng",
    image: "/images/services/acne.webp",
    href: "/services/dieu-tri-mun",
  },
  {
    id: "brightening",
    title: "Làm sáng và cải thiện nám",
    subtitle: "Rạng rỡ đều màu từ bên trong",
    image: "/images/services/brightening.webp",
    href: "/services/lam-sang-da",
  },
];

export default function ServicesSection({
  services = DEFAULT_SERVICES,
  viewAllHref = "/services",
  onSelectService,
}) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Kích hoạt animation mượt khi cuộn vào vùng nhìn thấy
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const handleScroll = () => {
      const firstCard = el.firstElementChild;
      if (!firstCard) return;
      const cardWidth = firstCard.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(el).columnGap || "14") || 14;
      const step = cardWidth + gap;
      if (step <= 0) return;

      const idx = Math.round(el.scrollLeft / step);
      setActiveDot(Math.max(0, Math.min(services.length - 1, idx)));
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [services.length]);

  const scrollToIndex = (idx) => {
    const el = trackRef.current;
    if (!el) return;
    const firstCard = el.firstElementChild;
    if (!firstCard) return;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(el).columnGap || "14") || 14;
    el.scrollTo({
      left: idx * (cardWidth + gap),
      behavior: "smooth",
    });
    setActiveDot(idx);
  };

  const handleCardClick = (e, service) => {
    if (onSelectService) {
      e.preventDefault();
      onSelectService(service);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className={`${styles.servicesSection} ${
        isVisible ? styles.isVisible : ""
      }`}
      aria-labelledby="services-heading"
    >
      {/* Ánh sáng lụa chuyển động ở đầu phần dịch vụ */}
      <div className={styles.silkAura} aria-hidden="true" />

      <div className={styles.container}>
        {/* HEADER MỤC DỊCH VỤ NỔI BẬT */}
        <div className={styles.topBar}>
          <div className={styles.headingGroup}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowLine} aria-hidden="true" />
              DỊCH VỤ NỔI BẬT
            </span>

            <h2 id="services-heading" className={styles.heading}>
              Liệu trình chăm sóc da{" "}
              <em>cá nhân hóa</em>
            </h2>
          </div>

          <a href={viewAllHref} className={styles.viewAllBtn}>
            <span>Xem tất cả</span>
            <span className={styles.viewAllIcon} aria-hidden="true">
              →
            </span>
          </a>
        </div>

        {/* DANH SÁCH THẺ DỊCH VỤ */}
        <div ref={trackRef} className={styles.cardsTrack}>
          {services.map((item, idx) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleCardClick(e, item)}
              style={{ "--stagger": idx }}
              className={styles.card}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 767px) 84vw, (max-width: 1023px) 48vw, 25vw"
                className={styles.image}
              />

              <div className={styles.cardScrim} aria-hidden="true" />
              <div className={styles.cardShimmer} aria-hidden="true" />

              <div className={styles.cardOverlayContent}>
                <div className={styles.cardText}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardSubtitle}>{item.subtitle}</p>
                </div>

                <span className={styles.cardArrow} aria-hidden="true">
                  →
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* CHẤM CHỈ BÁO SLIDE TRÊN MOBILE */}
        {services.length > 1 && (
          <div className={styles.dots} aria-label="Chỉ báo dịch vụ nổi bật">
            {services.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Xem dịch vụ ${idx + 1}: ${item.title}`}
                onClick={() => scrollToIndex(idx)}
                className={`${styles.dot} ${
                  idx === activeDot ? styles.dotActive : ""
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ĐƯỜNG SÓNG GỢN / ELIP MỀM Ở CUỐI PHẦN DỊCH VỤ */}
      <div className={styles.bottomWave} aria-hidden="true">
        <svg
          className={styles.waveSvg}
          viewBox="0 0 1440 72"
          preserveAspectRatio="none"
        >
          <path
            className={styles.waveFill}
            d="M0,26 C320,66 640,4 980,34 C1180,52 1330,30 1440,18 L1440,72 L0,72 Z"
          />
          <path
            className={styles.waveGoldLine}
            d="M0,26 C320,66 640,4 980,34 C1180,52 1330,30 1440,18"
          />
        </svg>
      </div>
    </section>
  );
}