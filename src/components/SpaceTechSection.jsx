"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./SpaceTechSection.module.css";

const TABS = [
  { id: "all", label: "Tất cả hình ảnh" },
  { id: "space", label: "Không gian Spa" },
  { id: "staff", label: "KTV chăm sóc 1:1" },
  { id: "tech", label: "Công nghệ & Máy móc" },
];

const DEFAULT_ITEMS = [
  {
    id: "space-lobby",
    category: "space",
    tag: "KHÔNG GIAN THƯ GIÃN",
    title: "Khu vực đón tiếp",
    desc: "Không gian ấm cúng, tách biệt ồn ào để khách hàng thoải mái chia sẻ tình trạng da trước mỗi buổi chăm sóc.",
    image: "/images/space/lobby.webp",
    featured: true,
  },
  {
    id: "staff-treatment",
    category: "staff",
    tag: "KỸ THUẬT VIÊN CHĂM SÓC",
    title: "Thao tác chuẩn xác, theo sát từng bước",
    desc: "Đội ngũ KTV được đào tạo bài bản, thao tác nhẹ nhàng và kiểm tra phản ứng da xuyên suốt liệu trình.",
    image: "/images/space/ktv-treatment.webp",
    featured: true,
  },
  {
    id: "tech-hifu",
    category: "tech",
    tag: "CÔNG NGHỆ NÂNG CƠ",
    title: "Hệ thống HIFU-MFU trẻ hóa không xâm lấn",
    desc: "Thiết bị được đầu tư đồng bộ, điều chỉnh mức năng lượng phù hợp từng vùng da và cấu trúc gương mặt.",
    image: "/images/space/tech-hifu.webp",
    featured: false,
  },
  {
    id: "space-room",
    category: "space",
    tag: "PHÒNG CHĂM SÓC",
    title: "Phòng chăm sóc sạch sẽ, gọn gàng",
    desc: "Khăn và dụng cụ được thay, vệ sinh sạch sẽ sau mỗi khách.",
    image: "/images/space/treatment-room.webp",
    featured: false,
  },
  {
    id: "staff-skin-check",
    category: "staff",
    tag: "TƯ VẤN TRỰC TIẾP",
    title: "Trao đổi và giải thích da rõ ràng trước khi làm",
    desc: "Ngồi trao đổi trực tiếp, chỉ rõ tình trạng da qua mô hình và tài liệu minh họa để khách hiểu và chọn hướng phù hợp.",
    image: "/images/space/ktv-skin-analysis.webp",
    featured: false,
  },
  {
    id: "space-products-tools",
    category: "space",
    tag: "SẢN PHẨM & DỤNG CỤ",
    title: "Khu vực sản phẩm và dụng cụ",
    desc: "Sắp xếp gọn gàng, dễ lấy và luôn sẵn sàng phục vụ từng buổi chăm sóc da.",
    image: "/images/space/products-tools.webp",
    featured: false,
  },
];

const ASSURANCE_PILLARS = [
  {
    num: "01",
    title: "Không gian riêng tư, vệ sinh chuẩn mực",
    desc: "Dụng cụ được khử khuẩn, thay mới theo từng khách hàng.",
  },
  {
    num: "02",
    title: "KTV tay nghề vững, làm tận tâm",
    desc: "Được đào tạo bài bản và theo sát phác đồ từ chuyên môn.",
  },
  {
    num: "03",
    title: "Máy móc chính hãng, rõ nguồn gốc",
    desc: "Đầu tư bài bản, kiểm tra thông số an toàn trước khi vận hành.",
  },
];

export default function SpaceTechSection({
  items = DEFAULT_ITEMS,
  bookingHref = "https://xaviaspa.salonhero.vn/dat-lich",
}) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [lightboxItem, setLightboxItem] = useState(null);
  const [brokenImages, setBrokenImages] = useState({});

  const gallery = items && items.length > 0 ? items : DEFAULT_ITEMS;
  const filteredItems =
    activeTab === "all"
      ? gallery
      : gallery.filter((item) => item.category === activeTab);

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
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!lightboxItem) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") setLightboxItem(null);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxItem]);

  return (
    <section
      ref={sectionRef}
      id="space-tech"
      className={`${styles.section} ${isVisible ? styles.isVisible : ""}`}
      aria-labelledby="space-tech-heading"
    >
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            KHÔNG GIAN · CON NGƯỜI · CÔNG NGHỆ
          </span>

          <h2 id="space-tech-heading" className={styles.heading}>
            Trải nghiệm thực tế tại <em>Xavia Spa</em>
          </h2>

          <p className={styles.lead}>
            Từ không gian thư giãn riêng tư, bàn tay chăm sóc của kỹ thuật viên
            đến hệ thống thiết bị được đầu tư bài bản — mọi chi tiết đều hướng
            tới sự an tâm của bạn.
          </p>
        </div>

        {/* 3 TRỤ CỘT NIỀM TIN */}
        <div className={styles.pillarsGrid}>
          {ASSURANCE_PILLARS.map((pillar) => (
            <div key={pillar.num} className={styles.pillarCard}>
              <span className={styles.pillarNum}>{pillar.num}</span>
              <div className={styles.pillarBody}>
                <h3>{pillar.title}</h3>
                <p>{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* TAB LỌC DANH MỤC */}
        <div
          className={styles.tabsBar}
          role="tablist"
          aria-label="Phân loại hình ảnh tại Xavia Spa"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`${styles.tabBtn} ${
                  isActive ? styles.tabBtnActive : ""
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* LƯỚI GALLERY */}
        <div className={styles.galleryGrid}>
          {filteredItems.map((item, idx) => {
            const isBroken = !!brokenImages[item.id];
            const isWide = activeTab === "all" && item.featured;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setLightboxItem(item)}
                style={{ "--stagger": idx }}
                className={`${styles.galleryCard} ${
                  isWide ? styles.galleryCardWide : ""
                }`}
              >
                <div className={styles.mediaBox}>
                  {!isBroken ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes={
                        isWide
                          ? "(max-width: 767px) 100vw, 50vw"
                          : "(max-width: 767px) 100vw, 33vw"
                      }
                      className={styles.mediaImg}
                      onError={() =>
                        setBrokenImages((prev) => ({ ...prev, [item.id]: true }))
                      }
                    />
                  ) : (
                    <div className={styles.mediaPlaceholder}>
                      <span>XAVIA SPA</span>
                      <small>{item.tag}</small>
                    </div>
                  )}

                  <div className={styles.mediaScrim} aria-hidden="true" />

                  <div className={styles.mediaTop}>
                    <span className={styles.tagPill}>{item.tag}</span>
                    <span className={styles.zoomBadge} aria-hidden="true">
                      +
                    </span>
                  </div>

                  <div className={styles.mediaCaption}>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* GHI CHÚ + CTA NHẸ */}
        <div className={styles.footerBar}>
          <p>
            Ảnh thực tế tại Xavia Spa — đặt lịch ghé trải nghiệm và kiểm tra da
            trực tiếp.
          </p>
          <a
            href={bookingHref}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.bookBtn}
          >
            ĐẶT LỊCH TƯ VẤN
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* LIGHTBOX XEM ẢNH LỚN */}
      {lightboxItem && (
        <div
          className={styles.lightboxBackdrop}
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
          onClick={() => setLightboxItem(null)}
        >
          <div
            className={styles.lightboxDialog}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.lightboxClose}
              aria-label="Đóng ảnh"
              onClick={() => setLightboxItem(null)}
            >
              ✕
            </button>

            <div className={styles.lightboxMedia}>
              {!brokenImages[lightboxItem.id] ? (
                <Image
                  src={lightboxItem.image}
                  alt={lightboxItem.title}
                  fill
                  sizes="(max-width: 900px) 94vw, 860px"
                  className={styles.lightboxImg}
                />
              ) : (
                <div className={styles.mediaPlaceholder}>
                  <span>XAVIA SPA</span>
                  <small>{lightboxItem.title}</small>
                </div>
              )}
            </div>

            <div className={styles.lightboxInfo}>
              <span className={styles.tagPill}>{lightboxItem.tag}</span>
              <h3>{lightboxItem.title}</h3>
              <p>{lightboxItem.desc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}