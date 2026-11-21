"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./ResultsSection.module.css";

const FILTER_TABS = [
  { id: "all", label: "Tất cả" },
  { id: "rejuvenation", label: "Trẻ hóa & Nâng cơ" },
  { id: "acne", label: "Điều trị mụn" },
  { id: "brightening", label: "Làm sáng & Nám" },
];

const DEFAULT_ITEMS = [
  {
    id: "res-hifu",
    category: "rejuvenation",
    serviceName: "HIFU Nâng cơ trẻ hóa",
    durationBadge: "Sau 3 buổi • Không nghỉ dưỡng",
    beforeImage: "/images/results/hifu-before.webp",
    afterImage: "/images/results/hifu-after.webp",
    beforeLabel: "Trước liệu trình",
    afterLabel: "Sau liệu trình",
    quote:
      "Vùng má bớt các đốm sạm nhỏ thấy rõ, bề mặt da sáng đều màu và mịn màng hơn mà liệu trình làm êm, không sưng đỏ hay cần nghỉ dưỡng.",
    clientName: "Chị Minh Anh",
    clientMeta: "34 tuổi • Nhân viên văn phòng",
  },
  {
    id: "res-acne",
    category: "acne",
    serviceName: "Điều trị mụn chuyên sâu",
    durationBadge: "Sau 5 tuần • Phục hồi cân bằng",
    beforeImage: "/images/results/acne-before.webp",
    afterImage: "/images/results/acne-after.webp",
    beforeLabel: "Trước liệu trình",
    afterLabel: "Sau liệu trình",
    quote:
      "Các đốm sạm liti và vùng da ửng nhẹ hai bên má dịu đi rõ rệt, bề mặt da trông đều màu và mịn màng hơn. Chăm sóc nhẹ nhàng, được theo sát từng buổi rất kỹ.",
    clientName: "Bạn Bảo Trâm",
    clientMeta: "23 tuổi • Sáng tạo nội dung",
  },
  {
    id: "res-brightening",
    category: "brightening",
    serviceName: "Làm sáng và cải thiện nám",
    durationBadge: "Sau 4 buổi • Chăm sóc chuyên sâu",
    beforeImage: "/images/results/brightening-before.webp",
    afterImage: "/images/results/brightening-after.webp",
    beforeLabel: "Trước liệu trình",
    afterLabel: "Sau liệu trình",
    quote:
      "Nền da sáng trong và đều màu hơn, các mảng sạm ở gò má dịu đi trông thấy mà không bị bào mòn hay châm chích.",
    clientName: "Chị Thu Hà",
    clientMeta: "31 tuổi • Kinh doanh tự do",
  },
  {
    id: "res-rf",
    category: "rejuvenation",
    serviceName: "RF Trẻ hóa da",
    durationBadge: "Sau 4 buổi • Căng bóng đàn hồi",
    beforeImage: "/images/results/rf-before.webp",
    afterImage: "/images/results/rf-after.webp",
    beforeLabel: "Trước liệu trình",
    afterLabel: "Sau liệu trình",
    quote:
      "Cảm giác ấm thư giãn suốt buổi trị liệu, sau đó da căng mướt và giữ lớp trang điểm mịn đẹp hơn hẳn.",
    clientName: "Chị Khánh Linh",
    clientMeta: "36 tuổi • Quản lý dự án",
  },
];

function BeforeAfterSlider({
  beforeImage,
  afterImage,
  serviceName,
  beforeLabel = "Trước liệu trình",
  afterLabel = "Sau liệu trình",
}) {
  const [splitPercent, setSplitPercent] = useState(50);
  const [dragging, setDragging] = useState(false);
  const frameRef = useRef(null);

  const updateFromClientX = useCallback((clientX) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    const raw = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.max(8, Math.min(92, raw));
    setSplitPercent(clamped);
  }, []);

  useEffect(() => {
    if (!dragging) return;

    const handlePointerMove = (e) => {
      updateFromClientX(e.clientX);
    };

    const stopDragging = () => {
      setDragging(false);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopDragging);
    window.addEventListener("pointercancel", stopDragging);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopDragging);
      window.removeEventListener("pointercancel", stopDragging);
    };
  }, [dragging, updateFromClientX]);

  const handlePointerDown = (e) => {
    setDragging(true);
    updateFromClientX(e.clientX);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSplitPercent((prev) => Math.max(8, prev - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setSplitPercent((prev) => Math.min(92, prev + 5));
    }
  };

  return (
    <div
      ref={frameRef}
      className={styles.compareFrame}
      onPointerDown={handlePointerDown}
    >
      {/* Lớp nền: TRƯỚC LIỆU TRÌNH */}
      <Image
        src={beforeImage}
        alt={`${serviceName} - ${beforeLabel}`}
        fill
        sizes="(max-width: 767px) 84vw, (max-width: 1023px) 48vw, 33vw"
        className={styles.compareImg}
      />

      {/* Lớp phủ cắt theo thanh kéo: SAU LIỆU TRÌNH */}
      <div
        className={styles.afterLayer}
        style={{ clipPath: `inset(0 0 0 ${splitPercent}%)` }}
      >
        <Image
          src={afterImage}
          alt={`${serviceName} - ${afterLabel}`}
          fill
          sizes="(max-width: 767px) 84vw, (max-width: 1023px) 48vw, 33vw"
          className={styles.compareImg}
        />
      </div>

      {/* Nhãn trước / sau */}
      <span className={styles.tagBefore}>{beforeLabel}</span>
      <span className={styles.tagAfter}>{afterLabel}</span>

      {/* Thanh chia & núm kéo ngang */}
      <div
        className={styles.divider}
        style={{ left: `${splitPercent}%` }}
      >
        <span className={styles.dividerLine} aria-hidden="true" />
        <button
          type="button"
          role="slider"
          aria-label={`Kéo để so sánh trước & sau liệu trình ${serviceName}`}
          aria-valuemin={8}
          aria-valuemax={92}
          aria-valuenow={Math.round(splitPercent)}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerDown={(e) => {
            e.stopPropagation();
            setDragging(true);
          }}
          className={`${styles.handleBtn} ${
            dragging ? styles.handleBtnActive : ""
          }`}
        >
          <span aria-hidden="true">↔</span>
        </button>
      </div>
    </div>
  );
}

export default function ResultsSection({
  items = DEFAULT_ITEMS,
  bookingHref = "/booking",
  onSelectBooking,
}) {
  const [activeTab, setActiveTab] = useState("all");
  const [activeDot, setActiveDot] = useState(0);
  const trackRef = useRef(null);

  const filteredItems =
    activeTab === "all"
      ? items
      : items.filter((item) => item.category === activeTab);

  useEffect(() => {
    setActiveDot(0);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [activeTab]);

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
      setActiveDot(Math.max(0, Math.min(filteredItems.length - 1, idx)));
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [filteredItems.length]);

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

  return (
    <section
      id="results"
      className={styles.resultsSection}
      aria-labelledby="results-heading"
    >
      <div className={styles.container}>
        <div className={styles.topBar}>
          <div className={styles.headingGroup}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowLine} aria-hidden="true" />
              KẾT QUẢ &amp; ĐÁNH GIÁ THỰC TẾ
            </span>

            <h2 id="results-heading" className={styles.heading}>
              Kéo xem kết quả{" "}
              <em>trước và sau liệu trình</em>
            </h2>

            <p className={styles.subHeading}>
              Kéo thanh ở giữa ảnh sang trái hoặc phải để đối chiếu sự thay đổi cùng cảm nhận khách hàng
            </p>
          </div>

          <div
            className={styles.tabs}
            role="tablist"
            aria-label="Lọc kết quả theo dịch vụ"
          >
            {FILTER_TABS.map((tab) => {
              const selected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${styles.tabBtn} ${
                    selected ? styles.tabBtnActive : ""
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div ref={trackRef} className={styles.cardsTrack}>
          {filteredItems.map((item) => (
            <article key={item.id} className={styles.card}>
              <div className={styles.cardTopMeta}>
                <span className={styles.serviceChip}>{item.serviceName}</span>
                <span className={styles.durationText}>{item.durationBadge}</span>
              </div>

              <BeforeAfterSlider
                beforeImage={item.beforeImage}
                afterImage={item.afterImage}
                serviceName={item.serviceName}
                beforeLabel={item.beforeLabel}
                afterLabel={item.afterLabel}
              />

              <div className={styles.cardBody}>
                <blockquote className={styles.quote}>“{item.quote}”</blockquote>

                <div className={styles.cardFooter}>
                  <div className={styles.clientBox}>
                    <span className={styles.avatar} aria-hidden="true">
                      {item.clientName.slice(-1)}
                    </span>
                    <div className={styles.clientText}>
                      <strong className={styles.clientName}>
                        {item.clientName}
                      </strong>
                      <span className={styles.clientMeta}>
                        {item.clientMeta}
                      </span>
                    </div>
                  </div>

                  {onSelectBooking ? (
                    <button
                      type="button"
                      onClick={() => onSelectBooking(item)}
                      className={styles.consultLink}
                    >
                      Tư vấn <span aria-hidden="true">→</span>
                    </button>
                  ) : (
                    <a href={bookingHref} className={styles.consultLink}>
                      Tư vấn <span aria-hidden="true">→</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredItems.length > 1 && (
          <div className={styles.dots} aria-label="Chỉ báo kết quả điều trị">
            {filteredItems.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Xem kết quả ${idx + 1}: ${item.serviceName}`}
                onClick={() => scrollToIndex(idx)}
                className={`${styles.dot} ${
                  idx === activeDot ? styles.dotActive : ""
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}