"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Footer.module.css";

const FACEBOOK_URL = "https://www.facebook.com/xaviaspa.danphuong/";
const ZALO_URL = "https://zalo.me/0976719995";
const MAPS_URL = "https://maps.google.com/?q=Xavia+Spa+Đan+Phượng";
const PHONE_TEL = "tel:0976719995";
const PHONE_DISPLAY = "0976 719 995";
const LOGO_SRC = "/images/logo-xavia.png";

const QUICK_LINKS = [
  { label: "Trang chủ", href: "/" },
  { label: "Dịch vụ", href: "/#services" },
  { label: "Kết quả", href: "/#results" },
  { label: "Giới thiệu", href: "/#space-tech" },
  { label: "Sản phẩm", href: "/#products" }, 
  { label: "Địa chỉ", href: "/#location" },
  { label: "CEO XAVIA SPA", href: "/#ceo" },
];

const SERVICE_LINKS = [
  { label: "Phục hồi da nhạy cảm", href: "/#services" },
  { label: "Chăm sóc da mụn 1:1", href: "/#services" },
  { label: "Nâng cơ trẻ hóa", href: "/#services" },
  { label: "Thư giãn cơ mặt", href: "/#services" },
];

const SOCIAL_CHANNELS = [
  {
    key: "facebook",
    label: "Facebook",
    sub: "Cập nhật ưu đãi & kiến thức da",
    href: FACEBOOK_URL,
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.6 1.6-1.6h1.7V3c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.5v3.2h2.8V21h3.2z" />
      </svg>
    ),
  },
  {
    key: "zalo",
    label: "Zalo",
    sub: "Trao đổi nhanh cùng chuyên viên",
    href: ZALO_URL,
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    key: "maps",
    label: "Google Maps",
    sub: "Xem bản đồ & chỉ đường tới spa",
    href: MAPS_URL,
    icon: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 1 1 13 0c0 5.4-6.5 11-6.5 11z" />
        <circle cx="12" cy="10" r="2.3" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer
      className={styles.footer}
      aria-label="Thông tin chân trang XAVIA SPA"
    >
      <div className={styles.topAccent} aria-hidden="true" />
      <div className={styles.glowLeft} aria-hidden="true" />
      <div className={styles.glowRight} aria-hidden="true" />

      <div className={styles.container}>
        {/* HÀNG THƯƠNG HIỆU + KÊNH THEO DÕI (FACEBOOK / ZALO / MAPS) */}
        <div className={styles.brandBanner}>
          <div className={styles.brandIdentity}>
            <div className={styles.logoFrame}>
              <Image
                src={LOGO_SRC}
                alt="Logo XAVIA SPA"
                width={52}
                height={52}
                className={styles.logoImg}
              />
            </div>
            <div>
              <p className={styles.brandName}>XAVIA SPA</p>
              <span className={styles.brandTag}>
                PHỤC HỒI · NÂNG CƠ · TRẺ HÓA
              </span>
              <p className={styles.brandBio}>
                Chăm sóc làn da khoa học, êm ái và cá nhân hóa dưới sự đồng
                hành của CEO XAVIA SPA.
              </p>
            </div>
          </div>

          <div className={styles.followBox}>
            <span className={styles.followTitle}>THEO DÕI &amp; KẾT NỐI</span>
            <div className={styles.followRow}>
              {SOCIAL_CHANNELS.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.followChip}
                  aria-label={`${item.label} - ${item.sub}`}
                >
                  <span className={styles.followIcon}>{item.icon}</span>
                  <span className={styles.followLabel}>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* LƯỚI ĐIỀU HƯỚNG, CHUYÊN MÔN & THÔNG TIN LIÊN HỆ */}
        <div className={styles.columnsGrid}>
          <div className={styles.col}>
            <h3 className={styles.colHeading}>ĐIỀU HƯỚNG</h3>
            <ul className={styles.quickGrid}>
              {QUICK_LINKS.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={styles.navLink}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h3 className={styles.colHeading}>LIỆU TRÌNH TRỌNG TÂM</h3>
            <ul className={styles.serviceList}>
              {SERVICE_LINKS.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={styles.navLink}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h3 className={styles.colHeading}>THÔNG TIN LIÊN HỆ</h3>
            <div className={styles.contactLines}>
              <a href={PHONE_TEL} className={styles.contactRow}>
                <span>Hotline</span>
                <strong>{PHONE_DISPLAY}</strong>
              </a>
              <a
                href={ZALO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactRow}
              >
                <span>Zalo</span>
                <strong>XAVIA SPA →</strong>
              </a>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactRow}
              >
                <span>Bản đồ</span>
                <strong>Xem vị trí →</strong>
              </a>
              <div className={styles.contactRowStatic}>
                <span>Giờ mở cửa</span>
                <strong>08:00 – 20:00 (T2 – CN)</strong>
              </div>
            </div>
          </div>
        </div>

        {/* DÒNG BẢN QUYỀN */}
        <div className={styles.bottomBar}>
          <span>
            © {year} XAVIA SPA -{" "}
            <strong className={styles.creditName}>Design by Kim Lân</strong>
          </span>
          <span className={styles.dotSep} aria-hidden="true">
            ·
          </span>
          <span>Hiệu quả chăm sóc tùy thuộc cơ địa từng khách hàng</span>
        </div>
      </div>
    </footer>
  );
}