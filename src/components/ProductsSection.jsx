"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProductsSection.module.css";
import ProductDetailModal from "./Products/ProductDetailModal";
import { DEFAULT_PRODUCTS } from "@/data/products";

export default function ProductsSection({
  products = DEFAULT_PRODUCTS,
  featuredLimit = 6,
  viewAllHref = "/products",
  onAddToCart,
  onSelectProduct = undefined,
}) {
  const trackRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const [addedId, setAddedId] = useState(null);
  const [modalProduct, setModalProduct] = useState(null);

  const productList = useMemo(() => {
    const base = products && products.length > 0 ? products : DEFAULT_PRODUCTS;
    if (typeof featuredLimit === "number" && featuredLimit > 0) {
      return base.slice(0, featuredLimit);
    }
    return base;
  }, [products, featuredLimit]);

  const totalCount =
    products && products.length > 0 ? products.length : DEFAULT_PRODUCTS.length;
  const hasMoreProducts = totalCount > productList.length;

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
      setActiveDot(Math.max(0, Math.min(productList.length - 1, idx)));
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [productList.length]);

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

  const handleAdd = (e, product, qty = 1) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setAddedId(product.id);
    if (onAddToCart) {
      for (let i = 0; i < qty; i += 1) {
        onAddToCart(product);
      }
    }
    window.setTimeout(() => {
      setAddedId((prev) => (prev === product.id ? null : prev));
    }, 1400);
  };

  const handleCardClick = (e, product) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setModalProduct(product);

    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  
  const getZaloConsultMessage = (product) => {
    return (
      `Xin chào XAVIA SPA! Tôi muốn được tư vấn về sản phẩm ${product.name}. ` +
      "Nhờ chuyên viên hỗ trợ tư vấn giúp tôi. Cảm ơn!"
    );
  };

  const handleZaloConsult = async (e, product) => {
    e.preventDefault();
    e.stopPropagation();


    try {
      await navigator.clipboard.writeText(
        getZaloConsultMessage(product)
      );
    } catch (error) {
      console.warn("Không thể tự động sao chép nội dung:", error);
    }

    // Mở Zalo trong chính tab hiện tại, tránh tạo nhiều tab
    window.location.assign("https://zalo.me/0976719995");
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
              SẢN PHẨM MỸ PHẨM • TƯ VẤN CÁ NHÂN HÓA
            </span>

            <h2 id="products-heading" className={styles.heading}>
              Chăm sóc da mỗi ngày{" "}
              <em>cùng XAVIA</em>
            </h2>

            <p className={styles.subHeading}>
              Các dòng dưỡng chất dịu nhẹ được tư vấn phù hợp với từng nền da và liệu trình
            </p>
          </div>

          {viewAllHref && (
            <div className={styles.viewAllWrap}>
              <Link href={viewAllHref} className={styles.viewAllBtn}>
                <span>
                  {hasMoreProducts
                    ? `Xem tất cả (${totalCount})`
                    : "Xem tất cả sản phẩm"}
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          )}
        </div>

        {/* DANH SÁCH SẢN PHẨM NỔI BẬT */}
        <div ref={trackRef} className={styles.cardsTrack}>
          {productList.map((item) => {
            const hasSale = Boolean(
              item.salePriceLabel && item.originalPriceLabel
            );

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
                    {item.discountTag && (
                      <span className={styles.saleBadge}>{item.discountTag}</span>
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
                    <div className={styles.priceGroup}>
                      {hasSale ? (
                        <>
                          <span className={styles.originalPrice}>
                            {item.originalPriceLabel}
                          </span>
                          <span className={styles.salePrice}>
                            {item.salePriceLabel}
                          </span>
                        </>
                      ) : (
                        <a
                          href="https://zalo.me/0976719995"
                          className={styles.consultBadge}
                          onClick={(e) => handleZaloConsult(e, item)}
                          aria-label={`Tư vấn sản phẩm ${item.name} qua Zalo`}
                        >
                          <svg
                            className={styles.messageIcon}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              d="M22 2L11 13"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M22 2L15 22L11 13L2 9L22 2Z"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>

                          <span>{item.priceLabel || "Tư vấn ngay"}</span>
                        </a>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleCardClick(e, item)}
                      className={styles.addBtn}
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* DẤU CHẤM TRÊN MOBILE */}
        {productList.length > 1 && (
          <div className={styles.dots} aria-label="Chỉ báo sản phẩm">
            {productList.map((item, idx) => (
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

      <ProductDetailModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
        onAddToCart={(prod, qty) => handleAdd(null, prod, qty)}
      />
    </section>
  );
}