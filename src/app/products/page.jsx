"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Toast from "@/components/Toast";
import useToast from "@/hooks/useToast";
import { DEFAULT_PRODUCTS } from "@/data/products";
import ProductDetailModal from "@/components/Products/ProductDetailModal";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import styles from "./ProductsPage.module.css";

const QUICK_ACTIVES = [
  { label: "Tất cả", query: "" },
  { label: "NMN & Trẻ hóa", query: "nmn" },
  { label: "Retinal", query: "retinal" },
  { label: "HA & B5", query: "ha" },
  { label: "LHA & Mụn", query: "mụn" },
  { label: "Sáng da · Nám", query: "nám" },
];

export default function ProductsPage({ onAddToCart }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBadge, setSelectedBadge] = useState("Tất cả");
  const [modalProduct, setModalProduct] = useState(null);
  const [isDraggingChips, setIsDraggingChips] = useState(false);

  // KHỞI TẠO TOAST
  const { toast, showToast } = useToast();

  const chipsRef = useRef(null);
  const dragStateRef = useRef({
    isDown: false,
    moved: false,
    startX: 0,
    scrollLeft: 0,
  });

  const badges = useMemo(() => {
    const unique = new Set(["Tất cả"]);
    DEFAULT_PRODUCTS.forEach((item) => {
      if (item.badge) unique.add(item.badge);
    });
    return Array.from(unique);
  }, []);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLocaleLowerCase("vi");

    return DEFAULT_PRODUCTS.filter((item) => {
      const matchBadge =
        selectedBadge === "Tất cả" || item.badge === selectedBadge;

      if (!matchBadge) return false;
      if (!q) return true;

      const haystack = [
        item.name,
        item.subtitle,
        item.badge,
        item.idealFor,
        ...(Array.isArray(item.skinTypes) ? item.skinTypes : []),
        ...(Array.isArray(item.highlights) ? item.highlights : []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("vi");

      return haystack.includes(q);
    });
  }, [searchQuery, selectedBadge]);

  const handleResetFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedBadge("Tất cả");
  }, []);

  const handleChipsMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    const el = chipsRef.current;
    if (!el) return;

    dragStateRef.current = {
      isDown: true,
      moved: false,
      startX: e.pageX - el.offsetLeft,
      scrollLeft: el.scrollLeft,
    };
    setIsDraggingChips(true);
  }, []);

  const handleChipsMouseMove = useCallback((e) => {
    const state = dragStateRef.current;
    const el = chipsRef.current;
    if (!state.isDown || !el) return;

    const x = e.pageX - el.offsetLeft;
    const walk = (x - state.startX) * 1.25;

    if (Math.abs(walk) > 5) {
      state.moved = true;
    }

    if (state.moved) {
      e.preventDefault();
      el.scrollLeft = state.scrollLeft - walk;
    }
  }, []);

  const stopDraggingChips = useCallback(() => {
    if (!dragStateRef.current.isDown) return;
    dragStateRef.current.isDown = false;
    setIsDraggingChips(false);

    window.setTimeout(() => {
      dragStateRef.current.moved = false;
    }, 0);
  }, []);

  const handleSelectBadge = useCallback((badge) => {
    if (dragStateRef.current.moved) return;
    setSelectedBadge(badge);
  }, []);

  // HÀM XỬ LÝ ZALO DÙNG CHUNG (ĐÃ CHUYỂN RA NGOÀI MAP)
  const handleZaloConsult = useCallback(
    async (e, item) => {
      e.preventDefault();
      e.stopPropagation();

      const message =
        `Xin chào XAVIA SPA! Tôi muốn được tư vấn về sản phẩm ${item.name}. ` +
        "Nhờ chuyên viên hỗ trợ tư vấn giúp tôi. Cảm ơn!";

      try {
        await navigator.clipboard.writeText(message);

        showToast(
          "Đã sao chép nội dung tư vấn – chỉ cần Dán vào Zalo",
          1800,
          "success"
        );
      } catch (error) {
        console.warn("Không thể tự động sao chép nội dung:", error);

        showToast(
          "Không thể sao chép nội dung. Bạn vui lòng kiểm tra quyền clipboard.",
          1800,
          "error"
        );
      }

      window.setTimeout(() => {
        window.location.assign("https://zalo.me/0976719995");
      }, 1800);
    },
    [showToast]
  );

  const hasActiveFilter =
    searchQuery.trim() !== "" || selectedBadge !== "Tất cả";

  return (
    <>
      <Toast toast={toast} />

      <div className={styles.pageShell}>
        <div className={styles.ambientGlow} aria-hidden="true" />

        <SiteHeader activeNavHref="/products" />

        <main className={styles.page}>
          <div className={styles.container}>
            {/* INTRO */}
            <header className={styles.header}>
              <div className={styles.topMetaRow}>
                <Link href="/" className={styles.backLink}>
                  <span aria-hidden="true">←</span>
                  <span>Trang chủ</span>
                </Link>

                <span className={styles.countPill} aria-live="polite">
                  <strong>{filteredProducts.length}</strong>
                  <span>/</span>
                  <span>{DEFAULT_PRODUCTS.length} sản phẩm</span>
                </span>
              </div>

              <div className={styles.heroContent}>
                <div className={styles.eyebrow}>
                  <span className={styles.eyebrowLine} />
                  <span>THE SKINCARE COLLECTION</span>
                </div>

                <h1 className={styles.title}>
                  Chăm sóc da
                  <br />
                  <em>theo cách tinh tế hơn.</em>
                </h1>

                <p className={styles.subtitle}>
                  Khám phá bộ sưu tập chăm sóc da Dr.Anmytas tại XAVIA SPA.
                  Những công thức được tuyển chọn theo từng nhu cầu, nền da
                  và mục tiêu chăm sóc chuyên biệt.
                </p>

                <div className={styles.heroFootnote}>
                  <span className={styles.heroDot} />
                  <span>DISCOVER YOUR SKINCARE RITUAL</span>
                </div>
              </div>
            </header>

            {/* SEARCH AND FILTER */}
            <section
              className={styles.toolbar}
              aria-label="Tìm kiếm và lọc sản phẩm"
            >
              <div className={styles.toolbarHeading}>
                <div>
                  <span className={styles.sectionEyebrow}>OUR COLLECTION</span>
                  <h2 className={styles.toolbarTitle}>Tìm sản phẩm phù hợp</h2>
                </div>

                {hasActiveFilter && (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className={styles.resetFilterLink}
                  >
                    Xóa bộ lọc
                    <span aria-hidden="true"> ↗</span>
                  </button>
                )}
              </div>

              <div className={styles.searchBox}>
                <svg
                  className={styles.searchIcon}
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4-4" />
                </svg>

                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Bạn đang tìm sản phẩm nào?"
                  className={styles.searchInput}
                  aria-label="Tìm kiếm sản phẩm"
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className={styles.clearSearchBtn}
                    aria-label="Xóa tìm kiếm"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* QUICK ACTIVE FILTERS */}
              <div className={styles.filterSection}>
                <span className={styles.filterLabel}>TÌM THEO HOẠT CHẤT</span>

                <div className={styles.quickList}>
                  {QUICK_ACTIVES.map((preset) => {
                    const active =
                      searchQuery.trim().toLocaleLowerCase("vi") ===
                      preset.query.toLocaleLowerCase("vi");

                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setSearchQuery(preset.query)}
                        className={`${styles.quickPill} ${
                          active ? styles.quickPillActive : ""
                        }`}
                        aria-pressed={active}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CATEGORY FILTER (Hỗ trợ kéo ngang bằng chuột trên laptop) */}
              <div className={styles.filterSection}>
                <div className={styles.filterLabelRow}>
                  <span className={styles.filterLabel}>DANH MỤC SẢN PHẨM</span>
                  <span className={styles.dragHint}>
                    Kéo ngang hoặc cuộn chuột để xem thêm →
                  </span>
                </div>

                <div
                  ref={chipsRef}
                  className={`${styles.filterChips} ${
                    isDraggingChips ? styles.filterChipsDragging : ""
                  }`}
                  onMouseDown={handleChipsMouseDown}
                  onMouseMove={handleChipsMouseMove}
                  onMouseUp={stopDraggingChips}
                  onMouseLeave={stopDraggingChips}
                >
                  {badges.map((badge) => {
                    const active = selectedBadge === badge;

                    return (
                      <button
                        key={badge}
                        type="button"
                        onClick={() => handleSelectBadge(badge)}
                        className={`${styles.chip} ${
                          active ? styles.chipActive : ""
                        }`}
                        aria-pressed={active}
                      >
                        {badge}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* PRODUCT COLLECTION */}
            <section className={styles.collection}>
              <div className={styles.collectionHeading}>
                <div>
                  <span className={styles.sectionEyebrow}>
                    CURATED FOR YOUR SKIN
                  </span>

                  <h2 className={styles.collectionTitle}>
                    Bộ sưu tập sản phẩm
                  </h2>
                </div>

                <span className={styles.resultCount}>
                  {filteredProducts.length} kết quả
                </span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className={styles.emptyState}>
                  <span className={styles.emptyIcon}>✳</span>

                  <h3 className={styles.emptyTitle}>
                    Chưa tìm thấy sản phẩm phù hợp
                  </h3>

                  <p className={styles.emptyDesc}>
                    Thử thay đổi từ khóa hoặc chọn danh mục khác để khám phá
                    thêm sản phẩm.
                  </p>

                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className={styles.resetBtn}
                  >
                    Xem tất cả sản phẩm
                    <span aria-hidden="true"> →</span>
                  </button>
                </div>
              ) : (
                <div className={styles.grid}>
                  {filteredProducts.map((item, idx) => {
                    const skinTags = Array.isArray(item.skinTypes)
                      ? item.skinTypes.slice(0, 2)
                      : [];

                    return (
                      <article key={item.id} className={styles.card}>
                        <button
                          type="button"
                          onClick={() => setModalProduct(item)}
                          className={styles.imageBtn}
                          aria-label={`Xem chi tiết ${item.name}`}
                        >
                          <div className={styles.imageWrap}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              priority={idx < 4}
                              sizes="(max-width: 520px) 50vw, (max-width: 820px) 50vw, (max-width: 1120px) 33vw, 25vw"
                              className={styles.image}
                            />

                            <div
                              className={styles.imageScrim}
                              aria-hidden="true"
                            />

                            {item.badge && (
                              <span className={styles.badge}>
                                {item.badge}
                              </span>
                            )}

                            <span className={styles.quickViewPill}>
                              Khám phá
                              <span aria-hidden="true"> ↗</span>
                            </span>
                          </div>
                        </button>

                        <div className={styles.cardBody}>
                          <button
                            type="button"
                            onClick={() => setModalProduct(item)}
                            className={styles.cardTitleBtn}
                          >
                            <h3 className={styles.cardTitle}>{item.name}</h3>

                            {item.subtitle && (
                              <p className={styles.cardSubtitle}>
                                {item.subtitle}
                              </p>
                            )}
                          </button>

                          {(skinTags.length > 0 || item.volume) && (
                            <div className={styles.metaRow}>
                              {skinTags.map((tag) => (
                                <span key={tag} className={styles.skinTag}>
                                  {tag}
                                </span>
                              ))}

                              {item.volume && (
                                <span className={styles.volumeTag}>
                                  {item.volume}
                                </span>
                              )}
                            </div>
                          )}

                          <div className={styles.cardFooter}>
                            <a
                              href="https://zalo.me/0976719995"
                              className={styles.consultBadge}
                              aria-label={`Tư vấn ngay về ${item.name} qua Zalo`}
                              onClick={(e) => handleZaloConsult(e, item)}
                            >
                              <svg
                                className={styles.messageIcon}
                                viewBox="0 0 24 24"
                                width="16"
                                height="16"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path d="M22 2 11 13" />
                                <path d="m22 2-7 20-4-9-9-4Z" />
                              </svg>

                              <span>{item.priceLabel || "Tư vấn ngay"}</span>
                            </a>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>

            {/* BOTTOM BRAND MESSAGE */}
            <section className={styles.bottomNote}>
              <span className={styles.bottomLine} />

              <p>
                BEAUTY IS A RITUAL.
                <br />
                <em>Let your skin tell its story.</em>
              </p>

              <span className={styles.bottomLine} />
            </section>
          </div>
        </main>

        <ProductDetailModal
          product={modalProduct}
          onClose={() => setModalProduct(null)}
          onAddToCart={onAddToCart}
        />

        <Footer />
      </div>
    </>
  );
}