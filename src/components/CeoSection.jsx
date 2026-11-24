"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./CeoSection.module.css";

const BOOKING_URL = "https://xaviaspa.salonhero.vn/dat-lich";

const DEFAULT_CEO = {
  eyebrow: "THE FOUNDER & CEO",
  roleBadge: "NHÀ SÁNG LẬP XAVIA SPA",
  name: "Hương RuBi",
  headline: "Vẻ đẹp bền vững bắt đầu từ sự thấu hiểu làn da.",
  story:
    "Với hơn 10 năm gắn bó chuyên sâu trong lĩnh vực chăm sóc và phục hồi làn da, CEO Hương RuBi kiên định với triết lý làm đẹp khoa học, êm ái và cá nhân hóa. Mỗi khách hàng đến với XAVIA SPA đều được soi khám, phân tích tình trạng da và tư vấn liệu trình phù hợp.",
  quote:
    "Làn da đẹp bền vững bắt đầu từ sự thấu hiểu đúng tình trạng da và sự kiên nhẫn đồng hành từng bước.",
  image: "/images/ceo-huong-rubi.png",
  imageAlt: "CEO Hương RuBi - Nhà sáng lập XAVIA SPA",
  stats: [
    { number: "10+", label: "Năm kinh nghiệm" },
    { number: "350+", label: "Khách hàng nâng cơ" },
    { number: "300+", label: "Khách hàng da mụn" },
  ],
  highlights: [
    {
      title: "Phục hồi nền da nhạy cảm",
      desc: "Chăm sóc chuyên biệt cho làn da căng rát, ửng đỏ và nhạy cảm khi giao mùa.",
    },
    {
      title: "Nâng cơ trẻ hóa",
      desc: "Đồng hành cùng hơn 350 khách hàng cải thiện đường nét và độ săn chắc tự nhiên.",
    },
    {
      title: "Thư giãn cơ mặt",
      desc: "Kỹ thuật chăm sóc chuyên sâu giúp thư giãn nhóm cơ mặt và cải thiện tuần hoàn.",
    },
    {
      title: "Chăm sóc da mụn 1:1",
      desc: "Theo sát quá trình làm sạch, ổn định dầu và phục hồi hàng rào bảo vệ da.",
    },
  ],
  ctaLabel: "ĐẶT LỊCH TƯ VẤN CÙNG CEO",
};

export default function CeoSection({
  ceo = DEFAULT_CEO,
  bookingHref = BOOKING_URL,
  onBookClick = undefined,
}) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imgError, setImgError] = useState(false);

  const info = { ...DEFAULT_CEO, ...ceo };
  const isExternalBooking = /^https?:\/\//i.test(bookingHref || "");

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

  const handleBooking = (e) => {
    if (onBookClick) {
      e.preventDefault();
      onBookClick(info);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="ceo"
      className={`${styles.ceoSection} ${isVisible ? styles.isVisible : ""}`}
      aria-labelledby="ceo-heading"
    >
      {/* SÓNG ELIP MỀM MẠI Ở MÉP TRÊN */}
      <div className={styles.waveTop} aria-hidden="true">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className={styles.waveSvg}
        >
          <defs>
            <linearGradient id="ceoWaveGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(237, 211, 150, 0.08)" />
              <stop offset="28%" stopColor="rgba(237, 211, 150, 0.65)" />
              <stop offset="50%" stopColor="rgba(248, 226, 173, 0.85)" />
              <stop offset="72%" stopColor="rgba(237, 211, 150, 0.65)" />
              <stop offset="100%" stopColor="rgba(237, 211, 150, 0.08)" />
            </linearGradient>
          </defs>

          <path
            d="M0,0 L1440,0 L1440,34 C1120,104 320,104 0,22 Z"
            className={styles.waveTopFill}
          />
          <path
            d="M0,22 C320,104 1120,104 1440,34"
            stroke="url(#ceoWaveGold)"
            className={styles.waveGoldStroke}
          />
        </svg>
      </div>

      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.glowOne} aria-hidden="true" />
      <div className={styles.glowTwo} aria-hidden="true" />
      <span className={styles.watermark} aria-hidden="true">
        XAVIA
      </span>

      <div className={styles.container}>
        <div className={styles.sectionLabel}>
          <span />
          GẶP GỠ NGƯỜI ĐỨNG SAU XAVIA
          <span />
        </div>

        <div className={styles.profileGrid}>
          {/* CỘT ẢNH PNG CẮT NỀN */}
          <div className={styles.portraitCol}>
            <div className={styles.portraitStage}>
              <div className={styles.portraitAura} aria-hidden="true" />
              <div className={styles.portraitArch} aria-hidden="true" />

              <div className={styles.portraitWrap}>
                {!imgError ? (
                  <Image
                    src={info.image}
                    alt={info.imageAlt || info.name}
                    fill
                    priority={false}
                    sizes="(max-width: 767px) 82vw, (max-width: 1023px) 42vw, 480px"
                    className={styles.portraitImg}
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className={styles.portraitFallback}>
                    <span>HR</span>
                    <strong>{info.name}</strong>
                  </div>
                )}
              </div>

              <div className={styles.portraitPedestal} aria-hidden="true" />
            </div>

            <div className={styles.portraitSignature}>
              <span className={styles.signatureLine} />
              <span>FOUNDER &amp; CEO · XAVIA SPA</span>
              <span className={styles.signatureLine} />
            </div>
          </div>

          {/* CỘT NỘI DUNG BÊN CẠNH */}
          <div className={styles.contentCol}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              {info.eyebrow}
            </div>

            <span className={styles.rolePill}>{info.roleBadge}</span>

            <h2 id="ceo-heading" className={styles.ceoName}>
              {info.name}
              <span className={styles.nameDot}>.</span>
            </h2>

            <p className={styles.headline}>{info.headline}</p>

            <div className={styles.goldDivider}>
              <span />
            </div>

            <p className={styles.story}>{info.story}</p>

            <blockquote className={styles.quote}>
              <span className={styles.quoteMark}>“</span>
              <p>{info.quote}</p>
            </blockquote>

            <div className={styles.statsGrid}>
              {info.stats.map((item) => (
                <div key={item.label} className={styles.statItem}>
                  <strong>{item.number}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4 DẤU ẤN CHUYÊN MÔN */}
        <div className={styles.achievements}>
          <div className={styles.achievementsHeading}>
            <span>01 — 04</span>
            <h3>DẤU ẤN CHUYÊN MÔN</h3>
            <p>Triết lý chăm sóc da được thể hiện qua từng hành trình.</p>
          </div>

          <div className={styles.highlightsGrid}>
            {info.highlights.map((item, idx) => (
              <article key={item.title} className={styles.highlightItem}>
                <span className={styles.highlightIndex}>0{idx + 1}</span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* CTA CHỐT ĐẶT LỊCH TRƯỚC FOOTER */}
        <div className={styles.bottomCta}>
          <p>Hãy để XAVIA đồng hành cùng hành trình chăm sóc làn da của bạn.</p>
          <a
            href={bookingHref}
            onClick={handleBooking}
            {...(isExternalBooking && !onBookClick
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className={styles.primaryBtn}
          >
            {info.ctaLabel}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}