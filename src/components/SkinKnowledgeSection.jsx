"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SkinKnowledgeSection.module.css";

const KNOWLEDGE_ITEMS = [
  {
    id: "barrier-ph",
    code: "01",
    tag: "NỀN DA KHỎE",
    highlight: "Hàng rào da & pH ổn định trước khi làm sâu",
    question: "Vì sao cần phục hồi nền da trước mọi liệu trình?",
    summary:
      "Nền da yếu hoặc lệch dầu – nước dễ kích ứng và kém hấp thụ dưỡng chất. Giữ da khỏe giúp liệu trình êm ái và bền hơn.",
    relatedLabel: "Enzym Tuần Hoàn",
    href: "#services",
  },
  {
    id: "acne-sebum",
    code: "02",
    tag: "CẢI THIỆN MỤN",
    highlight: "Làm dịu & kiểm soát nhờn thay vì ép da mạnh",
    question: "Chăm sóc da mụn thế nào để giảm bí tắc?",
    summary:
      "Ưu tiên làm dịu, cân bằng bã nhờn và giữ lỗ chân lông thông thoáng để hạn chế da nhạy cảm hoặc tái phát mụn.",
    relatedLabel: "Chăm Sóc Da Mụn",
    href: "#services",
  },
  {
    id: "lifting-harmony",
    code: "03",
    tag: "NÂNG CƠ TRẺ HÓA",
    highlight: "Gọn nét & thư giãn cơ mặt giữ vẻ tự nhiên",
    question: "Làm sao để mặt gọn và tươi tắn mà không đơ cứng?",
    summary:
      "Kết hợp đánh giá độ đàn hồi và thư giãn các cơ trán, mắt, má, hàm giúp gương mặt hài hòa và rạng rỡ tự nhiên.",
    relatedLabel: "HIFU-MFU • Diện Sắc Phú Quý",
    href: "#services",
  },
  {
    id: "homecare-1on1",
    code: "04",
    tag: "ĐỒNG HÀNH 1:1",
    highlight: "Chăm tại nhà & theo dõi sát sau liệu trình",
    question: "Vì sao XAVIA SPA theo dõi 1:1 sau mỗi buổi làm?",
    summary:
      "Hướng dẫn chăm sóc tại nhà đúng nhịp và theo dõi phản ứng thực tế của da để giữ kết quả ổn định lâu dài.",
    relatedLabel: "Phác đồ cá nhân hóa",
    href: "#services",
  },
];

export default function SkinKnowledgeSection({ onSelectTopic = undefined }) {
  const sectionRef = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const handleCardClick = (item) => {
    setActiveId((currentId) =>
        currentId === item.id ? null : item.id
    );

    if (onSelectTopic) {
        onSelectTopic(item);
    }
    };

  return (
    <section
      ref={sectionRef}
      id="knowledge"
      className={`${styles.knowledgeSection} ${
        isVisible ? styles.isVisible : ""
      }`}
      aria-labelledby="knowledge-heading"
    >
      <div className={styles.container}>
        {/* Header gọn trên mobile */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            CHUYÊN MÔN 9 NĂM • XAVIA SPA
          </span>

          <h2 id="knowledge-heading" className={styles.heading}>
            Hiểu nền da,{" "}
            <em>chọn đúng cách</em>
          </h2>

          <p className={styles.lead}>
            Nguyên tắc cốt lõi đúc kết qua 9 năm phục hồi da, cải thiện mụn và nâng cơ trẻ hóa.
          </p>
        </div>

        {/* Grid thẻ gọn, dễ đọc */}
        <div className={styles.grid}>
          {KNOWLEDGE_ITEMS.map((item, idx) => {
            const isActive = activeId === item.id;
            return (
              <article
                key={item.id}
                style={{ "--stagger": idx }}
                onClick={() => handleCardClick(item)}
                className={`${styles.card} ${
                  isActive ? styles.cardActive : ""
                }`}
              >
                <div className={styles.cardTop}>
                  <span className={styles.tag}>{item.tag}</span>
                  <span className={styles.code}>{item.code}</span>
                </div>

                <h3 className={styles.cardTitle}>{item.question}</h3>

                <div className={styles.highlightBox}>
                  <span className={styles.highlightDot} aria-hidden="true" />
                  <p className={styles.highlightText}>{item.highlight}</p>
                </div>

                <p className={styles.cardSummary}>{item.summary}</p>

                <a href={item.href} className={styles.relatedLink}>
                  <span>{item.relatedLabel}</span>
                  <span className={styles.arrow} aria-hidden="true">
                    →
                  </span>
                </a>
              </article>
            );
          })}
        </div>

        <p className={styles.disclaimer}>
          Hiệu quả tùy thuộc cơ địa và tình trạng da từng người.
        </p>
      </div>
    </section>
  );
}