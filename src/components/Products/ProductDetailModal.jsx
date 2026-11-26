
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./ProductDetailModal.module.css";

const getZaloConsultMessage = (product) => {
  return (
    `Xin chào XAVIA SPA! Tôi muốn được tư vấn về sản phẩm ${product.name}. ` +
    "Nhờ chuyên viên hỗ trợ tư vấn giúp tôi. Cảm ơn!"
  );
};

export default function ProductDetailModal({ product, onClose }) {
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // IMAGE LIGHTBOX
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [imageScale, setImageScale] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  const pointersRef = useRef(new Map());
  const pinchRef = useRef(null);
  const dragRef = useRef(null);
  const touchStartY = useRef(null);

  // Reset zoom
  const resetImageZoom = () => {
    setImageScale(1);
    setImagePosition({ x: 0, y: 0 });
  };

  // Open image
  const openImageViewer = () => {
    resetImageZoom();
    setIsImageOpen(true);
  };

  // Close image
  const closeImageViewer = () => {
    setIsImageOpen(false);
    resetImageZoom();
    pointersRef.current.clear();
    pinchRef.current = null;
    dragRef.current = null;
  };

  // Zoom buttons
  const changeZoom = (amount) => {
    setImageScale((current) => {
      const next = Math.min(4, Math.max(1, current + amount));

      if (next === 1) {
        setImagePosition({ x: 0, y: 0 });
      }

      return next;
    });
  };

  // Mouse wheel zoom
  const handleImageWheel = (e) => {
    e.preventDefault();

    setImageScale((current) => {
      const next = Math.min(
        4,
        Math.max(1, current + (e.deltaY < 0 ? 0.25 : -0.25))
      );

      if (next === 1) {
        setImagePosition({ x: 0, y: 0 });
      }

      return next;
    });
  };

  // Calculate distance between two fingers
  const getPointerDistance = (a, b) => {
    return Math.hypot(a.x - b.x, a.y - b.y);
  };

  // Pointer down: drag or pinch
  const handleImagePointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);

    pointersRef.current.set(e.pointerId, {
      x: e.clientX,
      y: e.clientY,
    });

    if (pointersRef.current.size === 2) {
      const points = Array.from(pointersRef.current.values());

      pinchRef.current = {
        distance: getPointerDistance(points[0], points[1]),
        scale: imageScale,
      };

      dragRef.current = null;
      return;
    }

    if (imageScale > 1) {
      dragRef.current = {
        x: e.clientX,
        y: e.clientY,
        originX: imagePosition.x,
        originY: imagePosition.y,
      };
    }
  };

  // Pointer move: pinch zoom or drag
  const handleImagePointerMove = (e) => {
    if (!pointersRef.current.has(e.pointerId)) return;

    pointersRef.current.set(e.pointerId, {
      x: e.clientX,
      y: e.clientY,
    });

    if (pointersRef.current.size >= 2 && pinchRef.current) {
      const points = Array.from(pointersRef.current.values());

      const distance = getPointerDistance(points[0], points[1]);
      const ratio = distance / Math.max(pinchRef.current.distance, 1);

      const nextScale = Math.min(
        4,
        Math.max(1, pinchRef.current.scale * ratio)
      );

      setImageScale(nextScale);

      if (nextScale === 1) {
        setImagePosition({ x: 0, y: 0 });
      }

      return;
    }

    if (imageScale <= 1 || !dragRef.current) return;

    const deltaX = e.clientX - dragRef.current.x;
    const deltaY = e.clientY - dragRef.current.y;

    setImagePosition({
      x: dragRef.current.originX + deltaX,
      y: dragRef.current.originY + deltaY,
    });
  };

  // Pointer up
  const handleImagePointerUp = (e) => {
    pointersRef.current.delete(e.pointerId);

    if (pointersRef.current.size < 2) {
      pinchRef.current = null;
    }

    if (pointersRef.current.size === 1 && imageScale > 1) {
      const point = Array.from(pointersRef.current.values())[0];

      dragRef.current = {
        x: point.x,
        y: point.y,
        originX: imagePosition.x,
        originY: imagePosition.y,
      };
    } else {
      dragRef.current = null;
    }
  };

  // MAIN MODAL: lock body scroll
  // Effect này không phụ thuộc isImageOpen
  useEffect(() => {
    if (!product) return;

    setDragY(0);
    setIsDragging(false);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [product]);

  // ESC: close image first, then close product modal
  // Tách riêng effect để dependency luôn cố định
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key !== "Escape") return;

      if (isImageOpen) {
        closeImageViewer();
      } else if (product) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isImageOpen, product, onClose]);

  if (!product) return null;

  const handleClose = () => {
    closeImageViewer();
    setDragY(0);
    setIsDragging(false);
    onClose();
  };

  // Swipe down to close product modal
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (touchStartY.current === null) return;

    const delta = e.touches[0].clientY - touchStartY.current;

    if (delta > 0) {
      setDragY(delta);
    }
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

  const hasSale = Boolean(
    product.salePriceLabel && product.originalPriceLabel
  );

  const handleZaloConsult = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const message = getZaloConsultMessage(product);

    // Sao chép nội dung trước khi chuyển sang Zalo
    try {
      await navigator.clipboard.writeText(message);
    } catch (error) {
      console.warn("Không thể sao chép nội dung tư vấn:", error);
    }

    window.location.assign("https://zalo.me/0976719995");
  };

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={handleClose}
    >
      {/* PRODUCT DETAIL MODAL */}
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

        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.headerMeta}>
            <div className={styles.pillRow}>
              <span className={styles.brandChip}>
                XAVIA HOMECARE • CHUẨN LÂM SÀNG
              </span>

              {product.discountTag && (
                <span className={styles.saleChip}>
                  {product.discountTag}
                </span>
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

        {/* BODY */}
        <div className={styles.body}>
          <div className={styles.topShowcase}>
            {/* PRODUCT IMAGE */}
            <div
              className={styles.imageBox}
              onClick={openImageViewer}
              role="button"
              tabIndex={0}
              aria-label={`Phóng to ảnh ${product.name}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openImageViewer();
                }
              }}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 767px) 92vw, 320px"
                className={styles.productImg}
              />

              {product.badge && (
                <span className={styles.floatBadge}>
                  {product.badge}
                </span>
              )}

              <span className={styles.imageZoomHint}>
                <span>⌕</span>
                Phóng to hình ảnh
              </span>
            </div>

            {/* PRICE */}
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

          {/* IDEAL FOR & SKIN TYPES */}
          <div className={styles.twoColGrid}>
            {product.idealFor && (
              <section className={styles.infoCard}>
                <span className={styles.cardEyebrow}>
                  ĐỐI TƯỢNG SỬ DỤNG
                </span>

                <h4 className={styles.cardHeading}>
                  Sản phẩm dành cho ai?
                </h4>

                <p className={styles.cardText}>{product.idealFor}</p>
              </section>
            )}

            {product.skinTypes && product.skinTypes.length > 0 && (
              <section className={styles.infoCard}>
                <span className={styles.cardEyebrow}>NỀN DA PHÙ HỢP</span>

                <h4 className={styles.cardHeading}>
                  Da như thế nào nên dùng?
                </h4>

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

          {/* HIGHLIGHTS */}
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

          {/* USAGE & NOTE */}
          {(product.usage || product.note) && (
            <div className={styles.twoColGrid}>
              {product.usage && (
                <section className={styles.infoCard}>
                  <span className={styles.cardEyebrow}>
                    HƯỚNG DẪN SỬ DỤNG
                  </span>

                  <h4 className={styles.cardHeading}>
                    Cách dùng tại nhà
                  </h4>

                  <p className={styles.cardText}>{product.usage}</p>
                </section>
              )}

              {product.note && (
                <section className={styles.infoCard}>
                  <span className={styles.cardEyebrow}>
                    LƯU Ý CHUYÊN MÔN
                  </span>

                  <h4 className={styles.cardHeading}>
                    Cam kết và lưu ý
                  </h4>

                  <p className={styles.cardText}>{product.note}</p>
                </section>
              )}
            </div>
          )}

          <p className={styles.disclaimer}>
            Giá niêm yết tính bằng đồng. Phù hợp phối hợp cùng phác đồ cá nhân
            hóa và theo dõi 1:1 tại XAVIA SPA.
          </p>
        </div>

        {/* FOOTER */}
        <div className={styles.footer}>
          <button
            type="button"
            className={styles.closeModalBtn}
            onClick={handleClose}
          >
            Đóng
          </button>

          <a
            href="https://zalo.me/0976719995"
            onClick={handleZaloConsult}
            className={styles.primaryBtn}
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

            <span>Tư vấn ngay</span>
          </a>
        </div>
      </div>

      {/* IMAGE LIGHTBOX - đặt bên trong backdrop, sau sheet */}
      {isImageOpen && (
        <div
          className={styles.imageLightbox}
          onClick={closeImageViewer}
          role="dialog"
          aria-modal="true"
          aria-label={`Xem ảnh lớn ${product.name}`}
        >
          <div className={styles.lightboxHeader}>
            <div className={styles.lightboxInfo}>
              <span className={styles.lightboxEyebrow}>
                XAVIA SPA · PRODUCT GALLERY
              </span>

              <span className={styles.lightboxTitle}>
                {product.name}
              </span>
            </div>

            <button
              type="button"
              className={styles.lightboxClose}
              onClick={closeImageViewer}
              aria-label="Đóng ảnh"
            >
              ✕
            </button>
          </div>

          <div
            className={styles.lightboxStage}
            onClick={(e) => e.stopPropagation()}
            onWheel={handleImageWheel}
            onPointerDown={handleImagePointerDown}
            onPointerMove={handleImagePointerMove}
            onPointerUp={handleImagePointerUp}
            onPointerCancel={handleImagePointerUp}
            onLostPointerCapture={handleImagePointerUp}
          >
            <div
              className={styles.lightboxImageWrap}
              style={{
                transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${imageScale})`,
              }}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="100vw"
                quality={100}
                className={styles.lightboxImage}
                draggable={false}
              />
            </div>
          </div>

          <div
            className={styles.lightboxControls}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.zoomButtons}>
              <button
                type="button"
                onClick={() => changeZoom(-0.5)}
                disabled={imageScale <= 1}
                aria-label="Thu nhỏ ảnh"
              >
                −
              </button>

              <span className={styles.zoomValue}>
                {Math.round(imageScale * 100)}%
              </span>

              <button
                type="button"
                onClick={() => changeZoom(0.5)}
                disabled={imageScale >= 4}
                aria-label="Phóng to ảnh"
              >
                +
              </button>
            </div>

            <button
              type="button"
              className={styles.zoomReset}
              onClick={resetImageZoom}
            >
              Đặt lại
            </button>
          </div>

          <p className={styles.lightboxHint}>
            Dùng hai ngón tay để zoom · Kéo để di chuyển ảnh · ESC để đóng
          </p>
        </div>
      )}
    </div>
  );
}
