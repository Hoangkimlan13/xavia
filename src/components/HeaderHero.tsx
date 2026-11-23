"use client";

import { useEffect, useState } from "react";
import type {
  CSSProperties,
  MouseEvent as ReactMouseEvent,
} from "react";
import Image from "next/image";
import styles from "./HeaderHero.module.css";

const NAV_ITEMS = [
  { label: "Trang chủ", href: "#top" },
  { label: "Giới thiệu", href: "#about" },
  { label: "Dịch vụ", href: "#services" },
  { label: "Kết quả thực tế", href: "#results" },
  { label: "Sản phẩm", href: "#products" },
  { label: "Liên hệ", href: "#contact" },
];

const MOBILE_SKIN_NEEDS = [
  {
    key: "recovery",
    label: "Phục hồi da",
    href: "#services",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 19c0-5.5 4-9.5 11-10 0 5.5-3.5 10-11 10z" />
        <path d="M5 19c2.5-2.5 5.5-4.5 9-6" />
        <path d="M16 5.5c1.5 0 2.5 1 2.5 2.5" />
      </svg>
    ),
  },
  {
    key: "acne-care",
    label: "Cải thiện mụn",
    href: "#services",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 3.5c-4.4 5.2-7 8.4-7 11.7a7 7 0 0 0 14 0c0-3.3-2.6-6.5-7-11.7z" />
        <path d="M9.5 15.2a2.8 2.8 0 0 0 4.5 1.8" />
        <circle cx="12" cy="11.5" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    key: "lifting",
    label: "Nâng cơ trẻ hóa",
    href: "#services",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M7.5 5.5c2-1.5 5-1.5 7.5 0 2.2 1.4 3.5 3.8 3.5 6.5 0 4.2-2.7 7.5-6.5 8.5-3.8-1-6.5-4.3-6.5-8.5" />
        <path d="M15.5 14.5c2.2-1 3.5-2.8 3.8-5" />
        <path d="M18.5 4.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6.6-1.4z" />
      </svg>
    ),
  },
  {
    key: "personalized",
    label: "Phác đồ 1:1",
    href: "#services",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="9" cy="8" r="3" />
        <path d="M4.5 19c0-2.6 2-4.5 4.5-4.5s4.5 1.9 4.5 4.5" />
        <path d="M15.5 9.5h4" />
        <path d="M17.5 7.5v4" />
        <path d="M15.5 14.5h4" />
      </svg>
    ),
  },
];

type HeaderHeroProps = {
  cartCount?: number;
  onOpenBooking?: () => void;
  onOpenCart?: () => void;
  onOpenMenu?: () => void;
};

export default function HeaderHero({
  cartCount = 0,
  onOpenBooking,
  onOpenCart,
  onOpenMenu,
}: HeaderHeroProps) {
  const [scrolled, setScrolled] = useState(false);
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  
  const [activeSection, setActiveSection] = useState("#top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // =====================================================
  // LOGIC ĐÃ SỬA: TÍNH TOÁN VỊ TRÍ CUỘN (CHÍNH XÁC 100%)
  // =====================================================
  
  useEffect(() => {
    const handleScrollSpy = () => {
      const activationLine = window.scrollY + 180;

      const sections = NAV_ITEMS
      .filter((item) => item.href !== "#top")
      .flatMap((item) => {
        const element = document.getElementById(item.href.slice(1));

        if (!element) return [];

        return [
          {
            href: item.href,
            top: element.getBoundingClientRect().top + window.scrollY,
          },
        ];
      })
      .sort((a, b) => a.top - b.top);

      let currentSection = "#top";

      for (const section of sections) {
        if (activationLine >= section.top) {
          currentSection = section.href;
        } else {
          break;
        }
      }

      // Khi cuộn đến cuối trang, kích hoạt section cuối cùng
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50;

      if (isAtBottom && sections.length > 0) {
        currentSection = sections[sections.length - 1]?.href ?? currentSection;
      }

      setActiveSection((prev) =>
        prev === currentSection ? prev : currentSection
      );
    };

    handleScrollSpy();

    window.addEventListener("scroll", handleScrollSpy, {
      passive: true,
    });

    window.addEventListener("resize", handleScrollSpy);

    return () => {
      window.removeEventListener("scroll", handleScrollSpy);
      window.removeEventListener("resize", handleScrollSpy);
    };
  }, []);


  useEffect(() => {
    if (!internalMenuOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setInternalMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [internalMenuOpen]);

  const handleMenuToggle = () => {
    if (onOpenMenu) {
      onOpenMenu();
    } else {
      setInternalMenuOpen((prev) => !prev);
    }
  };

  const handleBookingClick = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    if (onOpenBooking) {
      e.preventDefault();
      setInternalMenuOpen(false);
      onOpenBooking();
    } else {
      setInternalMenuOpen(false);
    }
  };

  return (
    <div className={styles.wrapper} id="top">
      {/* ================= HEADER ================= */}
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <a href="#top" className={styles.logo} aria-label="XAVIA SPA - Trang chủ">
          <Image
            src="/images/logo-xavia.png"
            alt="XAVIA SPA"
            width={168}
            height={48}
            priority
            className={styles.logoImg}
            sizes="(max-width: 480px) 126px, (max-width: 1023px) 150px, 168px"
          />
        </a>

        <nav className={styles.desktopNav} aria-label="Điều hướng chính">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={activeSection === item.href ? styles.activeNav : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* ACTIONS — TÔNG VÀNG SÂM PANH */}
        <div className={styles.actions}>
          <button
            type="button"
            onClick={onOpenCart}
            className={styles.roundBtn}
            aria-label={`Giỏ hàng${cartCount > 0 ? `, ${cartCount} sản phẩm` : ""}`}
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 3h2l2.4 11.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 7H6" />
              <circle cx="10" cy="20" r="1" />
              <circle cx="19" cy="20" r="1" />
            </svg>
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </button>

          {onOpenBooking ? (
            <button
              type="button"
              onClick={onOpenBooking}
              className={styles.ctaHeader}
            >
              Đặt lịch tư vấn <span aria-hidden="true">→</span>
            </button>
          ) : (
            <a href="#booking" className={styles.ctaHeader}>
              Đặt lịch tư vấn <span aria-hidden="true">→</span>
            </a>
          )}

          <button
            type="button"
            onClick={handleMenuToggle}
            className={`${styles.menuBtn} ${internalMenuOpen ? styles.menuBtnOpen : ""}`}
            aria-label={internalMenuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={internalMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* ================= MOBILE / TABLET NAV DRAWER ================= */}
      {!onOpenMenu && (
        <div
          className={`${styles.drawerBackdrop} ${internalMenuOpen ? styles.drawerOpen : ""}`}
          onClick={() => setInternalMenuOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-hidden={!internalMenuOpen}
          aria-label="Menu điều hướng"
        >
          <aside
            className={styles.drawerPanel}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.drawerGlow} aria-hidden="true" />

            <div className={styles.drawerTop}>
              <Image
                src="/images/logo-xavia.png"
                alt="XAVIA SPA"
                width={132}
                height={38}
                className={styles.drawerLogo}
              />
              <button
                type="button"
                className={styles.drawerClose}
                onClick={() => setInternalMenuOpen(false)}
                aria-label="Đóng menu"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className={styles.drawerNav}>
              {NAV_ITEMS.map((item, idx) => (
                <a
                  key={item.href}
                  href={item.href}
                  style={{ "--item-index": idx } as CSSProperties}
                  className={activeSection === item.href ? styles.drawerActive : undefined}
                  onClick={() => setInternalMenuOpen(false)}
                >
                  <span className={styles.drawerLinkText}>
                    {item.label}
                  </span>
                  <span className={styles.drawerArrow} aria-hidden="true">→</span>
                </a>
              ))}
            </nav>

            <div className={styles.drawerFooter}>
              <p className={styles.drawerTagline}>THE SCIENCE OF BEAUTY</p>
              <a
                href="#booking"
                className={styles.btnGold}
                onClick={handleBookingClick}
              >
                Đặt lịch tư vấn <span aria-hidden="true">→</span>
              </a>
            </div>
          </aside>
        </div>
      )}

      {/* ================= HERO ================= */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image
            src="/images/hero-mobile.webp"
            alt="Chăm sóc da chuyên sâu tại XAVIA SPA"
            fill
            priority
            sizes="100vw"
            className={`${styles.heroImg} ${styles.imgMobile}`}
          />
          <Image
            src="/images/hero-desktop.webp"
            alt="Không gian chăm sóc sắc đẹp XAVIA SPA"
            fill
            priority
            sizes="100vw"
            className={`${styles.heroImg} ${styles.imgDesktop}`}
          />
          <div className={styles.heroOverlay} aria-hidden="true" />
        </div>

        <div className={styles.heroInner}>
          <div className={styles.content}>
            <span className={styles.eyebrow}>THE SCIENCE OF BEAUTY</span>
            <h1>
              Khởi nguồn
              <em>vẻ đẹp tự nhiên</em>
            </h1>
            <p className={styles.lead}>
              Chăm sóc da khoa học.
              <br />
              Cá nhân hóa. Bền vững.
            </p>

            <div className={styles.btnGroup}>
              {onOpenBooking ? (
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className={styles.btnGold}
                >
                  Đặt lịch tư vấn <span aria-hidden="true">→</span>
                </button>
              ) : (
                <a href="#booking" className={styles.btnGold}>
                  Đặt lịch tư vấn <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* VÒNG BO CÁNH CUNG NỐI LIỀN HERO VỚI PHẦN NỘI DUNG DƯỚI */}
<div className={styles.archDivider} aria-hidden="true">
  <svg
    viewBox="0 0 1440 110"
    preserveAspectRatio="none"
    className={styles.archSvg}
  >
    <defs>
      <linearGradient id="xaviaArchGold" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#C6A45B" stopOpacity="0" />
        <stop offset="25%" stopColor="#edd18e" stopOpacity="0.6" />
        <stop offset="50%" stopColor="#fff4d4" stopOpacity="0.95" />
        <stop offset="75%" stopColor="#edd18e" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#C6A45B" stopOpacity="0" />
      </linearGradient>
    </defs>

    {/* Vùng nền dưới uốn cánh cung mềm */}
    <path
      d="M0,115 L0,72 Q720,-22 1440,72 L1440,115 Z"
      className={styles.archFill}
    />

    {/* Đường chỉ vàng ánh kim mảnh dọc mép cong */}
    <path
      d="M0,72 Q720,-22 1440,72"
      className={styles.archGoldLine}
    />
  </svg>
</div>

        {/* FLOATING CONTACTS */}
        <aside className={styles.floatingContacts} aria-label="Liên hệ nhanh">
          <a
            href="https://zalo.me"
            target="_blank"
            rel="noreferrer"
            className={styles.zaloCircle}
            aria-label="Chat Zalo"
          >
            Zalo
          </a>
          <a
            href="tel:0900000000"
            className={styles.phoneCircle}
            aria-label="Gọi điện thoại"
          >
            <svg
              viewBox="0 0 24 24"
              width="19"
              height="19"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z" />
            </svg>
          </a>
        </aside>
      </section>

      {/* ================= 4 NHU CẦU LÀN DA (NẰM DƯỚI HEROINNER, CHỈ MOBILE) ================= */}
      <div className={styles.mobileSkinNeedsWrap}>
        <div className={styles.mobileSkinNeeds} aria-label="Nhu cầu chăm sóc da">
          {MOBILE_SKIN_NEEDS.map((need) => (
            <a key={need.key} href={need.href} className={styles.mobileNeedItem}>
              <span className={styles.mobileNeedIcon}>{need.icon}</span>
              <span className={styles.mobileNeedLabel}>{need.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}