"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./StoryModal.module.css";

const DEFAULT_XAVIA_STORIES = [
  {
    id: "treatment-space",
    pill: "Không gian điều trị",
    headline: "Không gian điều trị và nền da khỏe",
    subline: "Chăm đúng từ gốc, đẹp bền theo thời gian.",
    image: "/images/about/about-xavia.webp",
    note: "Không gian điều trị XAVIA SPA — ưu tiên hàng rào bảo vệ, cân bằng dầu – nước, pH và hệ vi sinh",
    description:
      "Tại không gian điều trị XAVIA SPA, mọi liệu trình tôn trọng sinh lý tự nhiên của làn da thay vì tác động mạnh gây bong tróc hay kích ứng, tập trung phục hồi hàng rào bảo vệ và cân bằng dầu – nước, pH, hệ vi sinh.",
    tags: ["Không gian điều trị", "Hàng rào bảo vệ", "Dầu – nước và pH"],
  },
  {
    id: "care-team",
    pill: "Chăm sóc chuyên sâu",
    headline: "Chăm sóc da, quản lý mụn và HIFU, RF",
    subline: "Kỹ thuật viên chăm sóc tận tâm, êm ái và giữ trọn nét tự nhiên.",
    image: "/images/about/about-xavia-5.webp",
    note: "Đội ngũ chăm sóc da trực tiếp — phục hồi nền da, quản lý mụn và nâng cơ HIFU, RF không xâm lấn",
    description:
      "Đội ngũ thực hiện chăm sóc da chuyên sâu, phục hồi nền da, quản lý da mụn khoa học và ứng dụng công nghệ HIFU, RF không xâm lấn, hướng tới làn da săn chắc, đàn hồi và hài hòa tự nhiên.",
    tags: ["Phục hồi và trị mụn", "Công nghệ HIFU", "Công nghệ RF"],
  },
  {
    id: "reception-care",
    pill: "Đồng hành 1:1",
    headline: "Cá nhân hóa liệu trình và theo dõi 1:1",
    subline: "Đồng hành trọn vẹn từ liệu trình.",
    image: "/images/about/about-xavia-4.webp",
    note: "Cá nhân hóa phác đồ, theo dõi 1:1 và bảo hành rõ ràng",
    description:
      "Mỗi làn da có nhịp đáp ứng riêng nên XAVIA cá nhân hóa liệu trình, theo dõi 1:1 từ xa sát sao và áp dụng chính sách bảo hành sản phẩm rõ ràng.",
    tags: ["Cá nhân hóa liệu trình", "Theo dõi 1:1", "Bảo hành rõ ràng"],
  },
];

export default function StoryModal({
  isOpen,
  onClose,
  onBook,
  chapters = DEFAULT_XAVIA_STORIES,
}) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [dragOffsetY, setDragOffsetY] = useState(0);
  const [isDraggingSheet, setIsDraggingSheet] = useState(false);
  const touchStartY = useRef(null);

  const items =
    chapters && chapters.length > 0 ? chapters : DEFAULT_XAVIA_STORIES;
  const current = items[selectedIdx] || items[0];

  useEffect(() => {
    if (!isOpen) return;

    setSelectedIdx(0);
    setDragOffsetY(0);
    setIsDraggingSheet(false);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        setSelectedIdx((i) => (i + 1) % items.length);
      } else if (e.key === "ArrowLeft") {
        setSelectedIdx((i) => (i - 1 + items.length) % items.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, items.length, onClose]);

  if (!isOpen) return null;

  const handleClose = () => {
    setDragOffsetY(0);
    setIsDraggingSheet(false);
    onClose();
  };

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    setIsDraggingSheet(true);
  };

  const handleTouchMove = (e) => {
    if (touchStartY.current === null) return;
    const delta = e.touches[0].clientY - touchStartY.current;
    if (delta > 0) setDragOffsetY(delta);
  };

  const handleTouchEnd = () => {
    setIsDraggingSheet(false);
    if (dragOffsetY > 110) {
      handleClose();
    } else {
      setDragOffsetY(0);
    }
    touchStartY.current = null;
  };

  const handleBookClick = () => {
    handleClose();
    if (onBook) onBook();
  };

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="xavia-lookbook-title"
      onClick={handleClose}
    >
      <div
        className={`${styles.sheet} ${
          isDraggingSheet ? styles.sheetDragging : ""
        }`}
        style={
          dragOffsetY > 0
            ? { transform: `translateY(${dragOffsetY}px)` }
            : undefined
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={styles.grabberZone}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <span className={styles.grabberBar} aria-hidden="true" />
        </div>

        {/* Phần đầu Lookbook */}
        <div className={styles.topBar}>
          <div>
            <p className={styles.kicker}>
              XAVIA SPA • KHỎE TỪ NỀN DA, ĐẸP THEO THỜI GIAN
            </p>
            <h3 id="xavia-lookbook-title" className={styles.brandHeading}>
              Khám phá <span>XAVIA SPA</span>
            </h3>
          </div>

          <button
            type="button"
            className={styles.dismissBtn}
            onClick={handleClose}
            aria-label="Đóng thông tin XAVIA SPA"
          >
            ✕
          </button>
        </div>

        {/* Bộ chọn nhanh theo đúng 3 mảng ảnh thực tế */}
        <div
          className={styles.filterPills}
          role="tablist"
          aria-label="Mảng hình ảnh và trải nghiệm tại XAVIA SPA"
        >
          {items.map((item, idx) => {
            const active = idx === selectedIdx;
            return (
              <button
                key={item.id || idx}
                type="button"
                role="tab"
                aria-selected={active}
                className={`${styles.filterPill} ${
                  active ? styles.filterPillActive : ""
                }`}
                onClick={() => setSelectedIdx(idx)}
              >
                {item.pill || item.tag || `Mục 0${idx + 1}`}
              </button>
            );
          })}
        </div>

        {/* Nội dung chính: trên iPad & Desktop chia 2 cột cân đối */}
        <div key={current.id || selectedIdx} className={styles.lookbookBody}>
          <div className={styles.photoShowcase}>
            <div className={styles.photoStage}>
              <Image
                src={current.image}
                alt={current.note || current.headline || current.title}
                fill
                sizes="(max-width: 767px) 92vw, 420px"
                className={styles.photoElement}
              />
            </div>

            <div className={styles.thumbStrip}>
              {items.map((thumb, idx) => (
                <button
                  key={thumb.id || idx}
                  type="button"
                  className={`${styles.thumbItem} ${
                    idx === selectedIdx ? styles.thumbItemActive : ""
                  }`}
                  onClick={() => setSelectedIdx(idx)}
                  aria-label={thumb.pill || thumb.headline || thumb.title}
                >
                  <span className={styles.thumbImgWrap}>
                    <Image
                      src={thumb.image}
                      alt={thumb.note || thumb.pill || thumb.headline}
                      fill
                      sizes="140px"
                      className={styles.thumbImg}
                    />
                  </span>
                  <span className={styles.thumbLabel}>
                    {thumb.pill || thumb.tag}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.detailsCol}>
            <div className={styles.infoCard}>
              <h4 className={styles.cardTitle}>
                {current.headline || current.title}
              </h4>
              <p className={styles.cardSubline}>
                {current.subline || current.lead}
              </p>
              <p className={styles.cardDesc}>
                {current.description ||
                  current.summary ||
                  (current.paragraphs && current.paragraphs.join(" "))}
              </p>

              {(current.tags || current.highlights) && (
                <div className={styles.chipRow}>
                  {(current.tags || current.highlights).map((chip) => (
                    <span key={chip} className={styles.infoChip}>
                      {chip}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.footerMotto}>
              {current.quote || "“Chăm đúng từ gốc, đẹp bền theo thời gian.”"}
            </div>
          </div>
        </div>

        {/* Thanh hành động đáy */}
        <div className={styles.actionFooter}>
          <span className={styles.counterText}>
            {current.pill || `Góc nhìn ${selectedIdx + 1}`} ({selectedIdx + 1}/
            {items.length})
          </span>
          <button
            type="button"
            className={styles.bookBtn}
            onClick={handleBookClick}
          >
            Đặt lịch tư vấn →
          </button>
        </div>
      </div>
    </div>
  );
}