"use client";

import { useEffect, useState } from "react";
import type { CSSProperties, MouseEvent as ReactMouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./HeaderHero.module.css";

export const BOOKING_URL = "https://xaviaspa.salonhero.vn/dat-lich";

export const NAV_ITEMS = [
  { label: "Trang chủ", hash: "#top", pageHref: "/" },
  { label: "Giới thiệu", hash: "#about", pageHref: "/#about" },
  { label: "Dịch vụ", hash: "#services", pageHref: "/#services" },
  { label: "Kết quả", hash: "#results", pageHref: "/#results" },
  { label: "Sản phẩm", hash: "#products", pageHref: "/products" },
  { label: "Địa chỉ", hash: "#location", pageHref: "/#location" },
  { label: "Về CEO", hash: "#ceo", pageHref: "/#ceo" },
];

type SiteHeaderProps = {
  cartCount?: number;
  bookingHref?: string;
  useAnchorLinks?: boolean;
  activeNavHref?: string;
  onOpenBooking?: () => void;
  onOpenCart?: () => void;
  onOpenMenu?: () => void;
};

export default function SiteHeader({
  cartCount = 0,
  bookingHref = BOOKING_URL,
  useAnchorLinks = false,
  activeNavHref,
  onOpenBooking,
  onOpenCart,
  onOpenMenu,
}: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#top");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!useAnchorLinks) return;

    const handleScrollSpy = () => {
      const activationLine = window.scrollY + 180;

      const sections = NAV_ITEMS.filter((item) => item.hash !== "#top")
        .flatMap((item) => {
          const element = document.getElementById(item.hash.slice(1));
          if (!element) return [];

          return [
            {
              href: item.hash,
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
    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    window.addEventListener("resize", handleScrollSpy);

    return () => {
      window.removeEventListener("scroll", handleScrollSpy);
      window.removeEventListener("resize", handleScrollSpy);
    };
  }, [useAnchorLinks]);

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

  const isExternalBooking = /^https?:\/\//i.test(bookingHref);

  const getItemHref = (item: (typeof NAV_ITEMS)[number]) =>
    useAnchorLinks ? item.hash : item.pageHref;

  const isItemActive = (item: (typeof NAV_ITEMS)[number]) => {
    if (!useAnchorLinks) {
      return activeNavHref === item.pageHref;
    }
    return activeSection === item.hash;
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <Link href="/" className={styles.logo} aria-label="XAVIA SPA - Trang chủ">
          <Image
            src="/images/logo-xavia.png"
            alt="XAVIA SPA"
            width={168}
            height={48}
            priority
            className={styles.logoImg}
            sizes="(max-width: 480px) 126px, (max-width: 1023px) 150px, 168px"
          />
        </Link>

        <nav className={styles.desktopNav} aria-label="Điều hướng chính">
          {NAV_ITEMS.map((item) => {
            const href = getItemHref(item);
            const active = isItemActive(item);

            if (useAnchorLinks) {
              return (
                <a
                  key={item.hash}
                  href={href}
                  className={active ? styles.activeNav : undefined}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <Link
                key={item.hash}
                href={href}
                className={active ? styles.activeNav : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.actions}>

          {/* Nút tư vấn mobile */}
          {onOpenBooking ? (
            <button
              type="button"
              onClick={onOpenBooking}
              className={styles.mobileConsultBtn}
            >
              Tư vấn
            </button>
          ) : (
            <a
              href={bookingHref}
              {...(isExternalBooking
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={styles.mobileConsultBtn}
            >
              Tư vấn ngay
            </a>
          )}
          {/* <button
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
          </button> */}

          {onOpenBooking ? (
            <button
              type="button"
              onClick={onOpenBooking}
              className={styles.ctaHeader}
            >
              Đặt lịch tư vấn <span aria-hidden="true">→</span>
            </button>
          ) : (
            <a
              href={bookingHref}
              {...(isExternalBooking
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={styles.ctaHeader}
            >
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
              {NAV_ITEMS.map((item, idx) => {
                const href = getItemHref(item);
                const active = isItemActive(item);

                if (useAnchorLinks) {
                  return (
                    <a
                      key={item.hash}
                      href={href}
                      style={{ "--item-index": idx } as CSSProperties}
                      className={active ? styles.drawerActive : undefined}
                      onClick={() => setInternalMenuOpen(false)}
                    >
                      <span className={styles.drawerLinkText}>{item.label}</span>
                      <span className={styles.drawerArrow} aria-hidden="true">
                        →
                      </span>
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.hash}
                    href={href}
                    style={{ "--item-index": idx } as CSSProperties}
                    className={active ? styles.drawerActive : undefined}
                    onClick={() => setInternalMenuOpen(false)}
                  >
                    <span className={styles.drawerLinkText}>{item.label}</span>
                    <span className={styles.drawerArrow} aria-hidden="true">
                      →
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className={styles.drawerFooter}>
              <p className={styles.drawerTagline}>THE SCIENCE OF BEAUTY</p>
              <a
                href={bookingHref}
                {...(isExternalBooking && !onOpenBooking
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={styles.btnGold}
                onClick={handleBookingClick}
              >
                Đặt lịch tư vấn <span aria-hidden="true">→</span>
              </a>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}