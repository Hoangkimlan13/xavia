"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./ProductsSection.module.css";

const DEFAULT_PRODUCTS = [
  {
    id: "prod-recovery-serum",
    badge: "Bán chạy",
    name: "Tinh chất phục hồi chuyên sâu",
    subtitle: "Làm dịu da, củng cố hàng rào ẩm mềm mượt",
    priceLabel: "1.250.000đ",
    image: "/images/products/recovery-serum.webp",
    href: "/products/tinh-chat-phuc-hoi-chuyen-sau",
  },
  {
    id: "prod-barrier-cream",
    badge: "Cấp ẩm sâu",
    name: "Kem dưỡng khóa ẩm đàn hồi",
    subtitle: "Nuôi dưỡng da căng mịn, giảm khô căng suốt ngày",
    priceLabel: "1.180.000đ",
    image: "/images/products/barrier-cream.webp",
    href: "/products/kem-duong-khoa-am-dan-hoi",
  },
  {
    id: "prod-bright-essence",
    badge: "Sáng đều màu",
    name: "Dưỡng chất làm sáng đều màu",
    subtitle: "Hỗ trợ làm mờ đốm sạm, cho nền da rạng rỡ",
    priceLabel: "1.390.000đ",
    image: "/images/products/radiance-essence.webp",
    href: "/products/duong-chat-lam-sang-deu-mau",
  },
  {
    id: "prod-shield-sunscreen",
    badge: "Bảo vệ mỗi ngày",
    name: "Kem chống nắng bảo vệ da",
    subtitle: "Chống nắng phổ rộng, mỏng nhẹ thoáng mịn",
    priceLabel: "890.000đ",
    image: "/images/products/mineral-uv-veil.webp",
    href: "/products/kem-chong-nang-bao-ve-da",
  },
];

export default function ProductsSection({
  products = DEFAULT_PRODUCTS,
  viewAllHref = "/products",
  onAddToCart,
  onSelectProduct = undefined,
}) {
  const trackRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const [addedId, setAddedId] = useState(null);

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
      setActiveDot(Math.max(0, Math.min(products.length - 1, idx)));
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [products.length]);

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

  const handleAdd = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    setAddedId(product.id);
    if (onAddToCart) {
      onAddToCart(product);
    }
    window.setTimeout(() => {
      setAddedId((prev) => (prev === product.id ? null : prev));
    }, 1400);
  };

  const handleCardClick = (e, product) => {
    if (onSelectProduct) {
      e.preventDefault();
      onSelectProduct(product);
    }
  };

  return (
    <section
      id="products"
      className={styles.productsSection}
      aria-labelledby="products-heading"
    >
      {/* Vòm sóng mềm ở đầu phần mỹ phẩm */}
      <div className={styles.topWave} aria-hidden="true">
        <svg
          className={styles.waveSvg}
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
        >
          <path
            className={styles.topWaveFill}
            d="M0,0 L1440,0 L1440,18 C1120,58 780,6 420,38 C220,56 90,42 0,24 Z"
          />
          <path
            className={styles.waveGoldLine}
            d="M0,24 C90,42 220,56 420,38 C780,6 1120,58 1440,18"
          />
        </svg>
      </div>

      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.topBar}>
          <div className={styles.headingGroup}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowLine} aria-hidden="true" />
              SẢN PHẨM MỸ PHẨM
            </span>

            <h2 id="products-heading" className={styles.heading}>
              Chăm sóc da mỗi ngày{" "}
              <em>cùng XAVIA</em>
            </h2>

            <p className={styles.subHeading}>
              Các dòng dưỡng chất dịu nhẹ giúp làn da duy trì độ ẩm, độ sáng và sự rạng rỡ
            </p>
          </div>

          <a href={viewAllHref} className={styles.viewAllBtn}>
            <span>Xem tất cả</span>
            <span className={styles.viewAllIcon} aria-hidden="true">
              →
            </span>
          </a>
        </div>

        {/* DANH SÁCH SẢN PHẨM */}
        <div ref={trackRef} className={styles.cardsTrack}>
          {products.map((item) => {
            const isAdded = addedId === item.id;
            return (
              <article key={item.id} className={styles.card}>
                <a
                  href={item.href}
                  onClick={(e) => handleCardClick(e, item)}
                  className={styles.imageLink}
                >
                  <div className={styles.imageWrap}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 767px) 78vw, (max-width: 1023px) 48vw, 25vw"
                      className={styles.image}
                    />
                    <div className={styles.imageGlow} aria-hidden="true" />
                    {item.badge && (
                      <span className={styles.tagBadge}>{item.badge}</span>
                    )}
                  </div>
                </a>

                <div className={styles.cardBody}>
                  <a
                    href={item.href}
                    onClick={(e) => handleCardClick(e, item)}
                    className={styles.titleLink}
                  >
                    <h3 className={styles.productName}>{item.name}</h3>
                    <p className={styles.productSubtitle}>{item.subtitle}</p>
                  </a>

                  <div className={styles.cardFooter}>
                    <span className={styles.price}>{item.priceLabel}</span>

                    <button
                      type="button"
                      onClick={(e) => handleAdd(e, item)}
                      className={`${styles.addBtn} ${
                        isAdded ? styles.addBtnAdded : ""
                      }`}
                    >
                      {isAdded ? "Đã thêm ✓" : "Thêm giỏ"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* DẤU CHẤM TRÊN MOBILE */}
        {products.length > 1 && (
          <div className={styles.dots} aria-label="Chỉ báo sản phẩm">
            {products.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Xem sản phẩm ${idx + 1}: ${item.name}`}
                onClick={() => scrollToIndex(idx)}
                className={`${styles.dot} ${
                  idx === activeDot ? styles.dotActive : ""
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Vòm sóng mềm ở cuối phần mỹ phẩm */}
      <div className={styles.bottomWave} aria-hidden="true">
        <svg
          className={styles.waveSvg}
          viewBox="0 0 1440 68"
          preserveAspectRatio="none"
        >
          <path
            className={styles.bottomWaveFill}
            d="M0,24 C340,64 680,4 1020,34 C1210,50 1350,28 1440,16 L1440,68 L0,68 Z"
          />
          <path
            className={styles.waveGoldLine}
            d="M0,24 C340,64 680,4 1020,34 C1210,50 1350,28 1440,16"
          />
        </svg>
      </div>
    </section>
  );
}