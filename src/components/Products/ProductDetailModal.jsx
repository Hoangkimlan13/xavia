"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./ProductDetailModal.module.css";

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
}) {
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const touchStartY = useRef(null);

  useEffect(() => {
    if (!product) return;

    setDragY(0);
    setIsDragging(false);
    setQuantity(1);
    setAddedFeedback(false);

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
  }, [product, onClose]);

  if (!product) return null;

  const handleClose = () => {
    setDragY(0);
    setIsDragging(false);
    setAddedFeedback(false);
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

  const handleAddClick = () => {
    setAddedFeedback(true);
    if (onAddToCart) {
      onAddToCart(product, quantity);
    }
    window.setTimeout(() => {
      setAddedFeedback(false);
    }, 1500);
  };

  const hasSale = Boolean(product.salePriceLabel && product.originalPriceLabel);

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={handleClose}
    >
      <div
        className={`${styles.sheet} ${isDragging ? styles.sheetDragging : ""}`}
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

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerMeta}>
            <div className={styles.pillRow}>
              <span className={styles.brandChip}>XAVIA HOMECARE • CHUẨN LÂM SÀNG</span>
              {product.discountTag && (
                <span className={styles.saleChip}>{product.discountTag}</span>
              )}
            </div>
            <h3 id="product-modal-title" className={styles.title}>
              {product.name}
            </h3>
          </div>

          <button
            type="button"
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label="Đóng thông tin sản phẩm"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {/* Khối ảnh & giá nổi bật */}
          <div className={styles.topShowcase}>
            <div className={styles.imageBox}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 767px) 92vw, 320px"
                className={styles.productImg}
              />
              {product.badge && (
                <span className={styles.floatBadge}>{product.badge}</span>
              )}
            </div>

            <div className={styles.pricePanel}>
              <p className={styles.subtitle}>{product.subtitle}</p>

              <div className={styles.priceCard}>
                {hasSale ? (
                  <>
                    <div className={styles.saleTopRow}>
                      <span className={styles.originalPrice}>
                        {product.originalPriceLabel}
                      </span>
                      {product.savingsLabel && (
                        <span className={styles.savePill}>
                          {product.savingsLabel}
                        </span>
                      )}
                    </div>
                    <strong className={styles.salePrice}>
                      {product.salePriceLabel}
                    </strong>
                  </>
                ) : (
                  <strong className={styles.salePrice}>
                    {product.priceLabel}
                  </strong>
                )}
              </div>

              <div className={styles.quickSpecGrid}>
                {product.volume && (
                  <div className={styles.quickSpec}>
                    <span>Dung tích</span>
                    <strong>{product.volume}</strong>
                  </div>
                )}
                {product.texture && (
                  <div className={styles.quickSpec}>
                    <span>Kết cấu</span>
                    <strong>{product.texture}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Dành cho ai & Tình trạng da phù hợp */}
          <div className={styles.twoColGrid}>
            {product.idealFor && (
              <section className={styles.infoCard}>
                <span className={styles.cardEyebrow}>ĐỐI TƯỢNG SỬ DỤNG</span>
                <h4 className={styles.cardHeading}>Sản phẩm dành cho ai?</h4>
                <p className={styles.cardText}>{product.idealFor}</p>
              </section>
            )}

            {product.skinTypes && product.skinTypes.length > 0 && (
              <section className={styles.infoCard}>
                <span className={styles.cardEyebrow}>NỀN DA PHÙ HỢP</span>
                <h4 className={styles.cardHeading}>Da như thế nào nên dùng?</h4>
                <div className={styles.chipWrap}>
                  {product.skinTypes.map((type) => (
                    <span key={type} className={styles.skinTag}>
                      {type}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Điểm nổi bật & công dụng */}
          {product.highlights && product.highlights.length > 0 && (
            <section className={styles.infoCard}>
              <span className={styles.cardEyebrow}>GIÁ TRỊ CỐT LÕI</span>
              <h4 className={styles.cardHeading}>
                Vì sao làn da cần bước chăm sóc này?
              </h4>
              <ul className={styles.checkList}>
                {product.highlights.map((item) => (
                  <li key={item} className={styles.checkItem}>
                    <span className={styles.checkMark} aria-hidden="true">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Cách dùng & lưu ý */}
          {(product.usage || product.note) && (
            <div className={styles.twoColGrid}>
              {product.usage && (
                <section className={styles.infoCard}>
                  <span className={styles.cardEyebrow}>HƯỚNG DẪN SỬ DỤNG</span>
                  <h4 className={styles.cardHeading}>Cách dùng tại nhà</h4>
                  <p className={styles.cardText}>{product.usage}</p>
                </section>
              )}

              {product.note && (
                <section className={styles.infoCard}>
                  <span className={styles.cardEyebrow}>LƯU Ý CHUYÊN MÔN</span>
                  <h4 className={styles.cardHeading}>Cam kết và lưu ý</h4>
                  <p className={styles.cardText}>{product.note}</p>
                </section>
              )}
            </div>
          )}

          <p className={styles.disclaimer}>
            Giá niêm yết tính bằng đồng. Phù hợp phối hợp cùng phác đồ cá nhân hóa và theo dõi 1:1 tại XAVIA SPA.
          </p>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.qtyControl} aria-label="Số lượng sản phẩm">
            <button
              type="button"
              className={styles.qtyBtn}
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Giảm số lượng"
            >
              −
            </button>
            <span className={styles.qtyValue}>{quantity}</span>
            <button
              type="button"
              className={styles.qtyBtn}
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Tăng số lượng"
            >
              +
            </button>
          </div>

          <button
            type="button"
            className={`${styles.primaryBtn} ${
              addedFeedback ? styles.primaryBtnSuccess : ""
            }`}
            onClick={handleAddClick}
          >
            {addedFeedback
              ? "Đã thêm vào giỏ hàng ✓"
              : `Thêm vào giỏ (${quantity}) • ${
                  hasSale ? product.salePriceLabel : product.priceLabel
                }`}
          </button>
        </div>
      </div>
    </div>
  );
}