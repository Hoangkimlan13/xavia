"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./ServiceDetailModal.module.css";

const BOOKING_URL = "https://xaviaspa.salonhero.vn/dat-lich";

const FALLBACK_RESULT_IMAGES = {
  "cham-soc-da-mun": {
    beforeImage: "/images/results/acne-before.webp",
    afterImage: "/images/results/acne-after.webp",
  },
  "dien-sac-phu-quy": {
    beforeImage: "/images/results/acne-before.webp",
    afterImage: "/images/results/acne-after.webp",
  },
  "hifu-mfu": {
    beforeImage: "/images/results/hifu-before.webp",
    afterImage: "/images/results/hifu-after.webp",
  },
  "enzym-tuan-hoan": {
    beforeImage: "/images/results/hifu-before.webp",
    afterImage: "/images/results/hifu-after.webp",
  },
};

export default function ServiceDetailModal({
  service,
  onClose,
  onBook,
  bookingHref = BOOKING_URL,
}) {
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);

  const touchStartY = useRef(null);
  const compareBoxRef = useRef(null);

  useEffect(() => {
    if (!service) return;

    setDragY(0);
    setIsDragging(false);
    setSliderPos(50);
    setIsDraggingSlider(false);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [service, onClose]);

  useEffect(() => {
    if (!isDraggingSlider) return;

    const updatePositionFromClientX = (clientX) => {
      const box = compareBoxRef.current;
      if (!box) return;
      const rect = box.getBoundingClientRect();
      if (rect.width <= 0) return;
      const rawPercent = ((clientX - rect.left) / rect.width) * 100;
      const clamped = Math.max(5, Math.min(95, rawPercent));
      setSliderPos(clamped);
    };

    const handleMouseMove = (e) => {
      updatePositionFromClientX(e.clientX);
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        updatePositionFromClientX(e.touches[0].clientX);
      }
    };

    const handleStop = () => {
      setIsDraggingSlider(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleStop);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleStop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleStop);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleStop);
    };
  }, [isDraggingSlider]);

  if (!service) return null;

  const isExternalBooking = /^https?:\/\//i.test(bookingHref || "");

  const handleClose = () => {
    setDragY(0);
    setIsDragging(false);
    setIsDraggingSlider(false);
    onClose();
  };

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (touchStartY.current === null) return;
    const delta = e.touches[0].clientY - touchStartY.current;
    if (delta > 0) setDragY(delta);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (dragY > 110) {
      handleClose();
    } else {
      setDragY(0);
    }
    touchStartY.current = null;
  };

  const handleBookClick = (e) => {
    const selected = service;
    if (onBook) {
      e.preventDefault();
      handleClose();
      onBook(selected);
    } else {
      handleClose();
    }
  };

  const fallbackPair =
    FALLBACK_RESULT_IMAGES[service.id] || FALLBACK_RESULT_IMAGES["hifu-mfu"];
  const beforeImg = service.beforeImage || fallbackPair.beforeImage;
  const afterImg = service.afterImage || fallbackPair.afterImage;

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-detail-title"
      onClick={handleClose}
    >
      <div
        className={`${styles.modalSheet} ${
          isDragging ? styles.modalSheetDragging : ""
        }`}
        style={dragY > 0 ? { transform: `translateY(${dragY}px)` } : undefined}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={styles.grabberWrap}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <span className={styles.grabber} aria-hidden="true" />
        </div>

        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>
              XAVIA SPA • PHỤC HỒI – NÂNG CƠ – TRẺ HÓA
            </p>
            <h3 id="service-detail-title" className={styles.title}>
              {service.title}
            </h3>
          </div>

          <button
            type="button"
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label="Đóng chi tiết dịch vụ"
          >
            ✕
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.heroBlock}>
            <div className={styles.heroImageWrap}>
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 767px) 92vw, 440px"
                className={styles.heroImage}
              />
            </div>

            <div className={styles.metaSummary}>
              <p className={styles.leadText}>{service.subtitle}</p>

              <div className={styles.specRow}>
                {service.duration && (
                  <div className={styles.specBox}>
                    <span className={styles.specLabel}>Thời lượng</span>
                    <strong className={styles.specValue}>{service.duration}</strong>
                  </div>
                )}
                {service.price && (
                  <div className={styles.specBox}>
                    <span className={styles.specLabel}>Chi phí tham khảo</span>
                    <strong className={styles.specValue}>{service.price}</strong>
                  </div>
                )}
                {service.experienceLabel && (
                  <div className={styles.specBox}>
                    <span className={styles.specLabel}>Cảm nhận liệu trình</span>
                    <strong className={styles.specValue}>
                      {service.experienceLabel}
                    </strong>
                  </div>
                )}
              </div>
            </div>
          </div>

          {service.skinSignals && service.skinSignals.length > 0 && (
            <section className={styles.sectionCard}>
              <h4 className={styles.sectionTitle}>
                Làn da bạn có đang gặp những dấu hiệu này?
              </h4>
              <p className={styles.sectionIntro}>
                Hiểu đúng tình trạng nền da giúp chọn giải pháp êm ái, đúng gốc thay vì chạy theo tác động quá mạnh.
              </p>
              <ul className={styles.tagList}>
                {service.skinSignals.map((signal) => (
                  <li key={signal} className={styles.signalItem}>
                    <span className={styles.bulletDot} aria-hidden="true" />
                    <span>{signal}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {service.whyChoose && service.whyChoose.length > 0 && (
            <section className={styles.sectionCard}>
              <h4 className={styles.sectionTitle}>
                Vì sao nên chọn {service.title} tại XAVIA SPA?
              </h4>
              <div className={styles.benefitGrid}>
                {service.whyChoose.map((reason, idx) => (
                  <div key={reason} className={styles.benefitItem}>
                    <span className={styles.indexBadge}>0{idx + 1}</span>
                    <p className={styles.itemText}>{reason}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {service.benefits && service.benefits.length > 0 && (
            <section className={styles.sectionCard}>
              <h4 className={styles.sectionTitle}>
                Lợi ích bạn nhận được sau liệu trình
              </h4>
              <ul className={styles.checkList}>
                {service.benefits.map((benefit) => (
                  <li key={benefit} className={styles.checkItem}>
                    <span className={styles.checkIcon} aria-hidden="true">
                      ✓
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className={styles.resultSection}>
            <div className={styles.resultHeader}>
              <h4 className={styles.sectionTitle}>
                Hiệu quả sau quá trình
              </h4>
              <p className={styles.sectionIntro}>{service.outcomeSummary}</p>
            </div>

            <div className={styles.resultLayout}>
              <div className={styles.resultMediaBox}>
                <div
                  ref={compareBoxRef}
                  className={styles.compareStage}
                  onMouseDown={(e) => {
                    setIsDraggingSlider(true);
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pct = ((e.clientX - rect.left) / rect.width) * 100;
                    setSliderPos(Math.max(5, Math.min(95, pct)));
                  }}
                  onTouchStart={(e) => {
                    setIsDraggingSlider(true);
                    if (e.touches && e.touches[0]) {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pct =
                        ((e.touches[0].clientX - rect.left) / rect.width) * 100;
                      setSliderPos(Math.max(5, Math.min(95, pct)));
                    }
                  }}
                >
                  <div className={styles.compareLayer}>
                    <Image
                      src={afterImg}
                      alt={`Sau liệu trình ${service.title}`}
                      fill
                      sizes="(max-width: 767px) 92vw, 360px"
                      className={styles.compareImg}
                    />
                    <span className={styles.badgeAfter}>Sau liệu trình</span>
                  </div>

                  <div
                    className={styles.compareLayerClip}
                    style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                  >
                    <Image
                      src={beforeImg}
                      alt={`Trước liệu trình ${service.title}`}
                      fill
                      sizes="(max-width: 767px) 92vw, 360px"
                      className={styles.compareImg}
                    />
                    <span className={styles.badgeBefore}>Trước liệu trình</span>
                  </div>

                  <div
                    className={styles.dividerLine}
                    style={{ left: `${sliderPos}%` }}
                  >
                    <button
                      type="button"
                      className={styles.dividerHandle}
                      aria-label="Kéo sang trái hoặc phải để so sánh trước và sau liệu trình"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        setIsDraggingSlider(true);
                      }}
                      onTouchStart={(e) => {
                        e.stopPropagation();
                        setIsDraggingSlider(true);
                      }}
                    >
                      ↔
                    </button>
                  </div>
                </div>

                <div className={styles.rangeControl}>
                  <span className={styles.rangeHint}>Trước</span>
                  <input
                    type="range"
                    min={5}
                    max={95}
                    value={Math.round(sliderPos)}
                    onChange={(e) => setSliderPos(Number(e.target.value))}
                    aria-label="Điều chỉnh tỷ lệ đối chiếu trước và sau liệu trình"
                    className={styles.rangeInput}
                  />
                  <span className={styles.rangeHint}>Sau</span>
                </div>

                {service.resultCaption && (
                  <p className={styles.resultCaption}>{service.resultCaption}</p>
                )}
              </div>

              {service.milestones && service.milestones.length > 0 && (
                <div className={styles.milestoneList}>
                  {service.milestones.map((m) => (
                    <div key={m.stage} className={styles.milestoneCard}>
                      <span className={styles.milestoneStage}>{m.stage}</span>
                      <p className={styles.milestoneDesc}>{m.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {(service.suitableFor || service.aftercareNote) && (
            <section className={styles.extraGrid}>
              {service.suitableFor && (
                <div className={styles.miniCard}>
                  <h5 className={styles.miniTitle}>Phù hợp với ai?</h5>
                  <p className={styles.miniDesc}>{service.suitableFor}</p>
                </div>
              )}
              {service.aftercareNote && (
                <div className={styles.miniCard}>
                  <h5 className={styles.miniTitle}>Lưu ý chăm sóc và đồng hành</h5>
                  <p className={styles.miniDesc}>{service.aftercareNote}</p>
                </div>
              )}
            </section>
          )}

          <p className={styles.disclaimer}>
            Kết quả tùy thuộc cơ địa và tình trạng da.
          </p>
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={handleClose}
          >
            Xem dịch vụ khác
          </button>

          <a
            href={bookingHref}
            onClick={handleBookClick}
            {...(isExternalBooking && !onBook
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className={styles.primaryBtn}
          >
            Đặt lịch tư vấn {service.title} →
          </a>
        </div>
      </div>
    </div>
  );
}