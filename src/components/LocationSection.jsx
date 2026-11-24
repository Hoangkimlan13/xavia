"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./LocationSection.module.css";

const DEFAULT_LOCATION = {
  brandName: "XAVIA SPA",
  pinLabel: "Xavia Beauty & Clinic Spa",
  eyebrow: "ĐỊA CHỈ CỬA HÀNG & ĐẶT LỊCH",
  headingPrefix: "Ghé thăm không gian chăm sóc da",
  headingItalic: "tại XAVIA SPA",
  subtitle:
    "Đặt lịch trước để được phân tích nền da, tư vấn phác đồ cá nhân hóa và sắp xếp thời gian thuận tiện nhất cho bạn.",
  spaImage: "/images/about/spa-space-1.webp",
  spaImageAlt: "Không gian chăm sóc da và trị liệu tại XAVIA SPA",
  address: "Số 20 Gò Mèo, thị trấn Phùng, Đan Phượng, Hà Nội",
  landmarkNote: "Đối diện Đài tưởng niệm liệt sĩ huyện Đan Phượng",
  districtNote: "Thị trấn Phùng, Đan Phượng • Thuận tiện hẹn lịch 1:1",
  hours: "Thứ 2 – Chủ Nhật: 8:00 – 20:00",
  hoursNote: "Nên đặt lịch trước để được đón tiếp chu đáo",
  phones: [
    {
      label: "Hotline / Zalo 1",
      display: "0976 719 995",
      telHref: "tel:0976719995",
      zaloHref: "https://zalo.me/0976719995",
    },
    {
      label: "Hotline / Zalo 2",
      display: "0913 345 493",
      telHref: "tel:0913345493",
      zaloHref: "https://zalo.me/0913345493",
    },
  ],
  mapsHref: "https://maps.google.com/?q=Xavia+Spa+Đan+Phượng",
  mapEmbedUrl:
    "https://maps.google.com/maps?q=21.0853305,105.6740429&z=17&hl=vi&output=embed",
  bookingHref: "https://xaviaspa.salonhero.vn/dat-lich",
};

export default function LocationSection({
  location = DEFAULT_LOCATION,
  onBookClick = undefined,
}) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const info = { ...DEFAULT_LOCATION, ...location };
  const primaryPhone = info.phones?.[0];
  const secondaryPhone = info.phones?.[1];
  const isExternalBooking = /^https?:\/\//i.test(info.bookingHref || "");

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

  const handleBooking = (e) => {
    if (onBookClick) {
      e.preventDefault();
      onBookClick(info);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="location"
      className={`${styles.locationSection} ${
        isVisible ? styles.isVisible : ""
      }`}
      aria-labelledby="location-heading"
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            {info.eyebrow}
          </span>

          <h2 id="location-heading" className={styles.heading}>
            {info.headingPrefix} <em>{info.headingItalic}</em>
          </h2>

          <p className={styles.subtitle}>{info.subtitle}</p>
        </div>

        <div className={styles.layout}>
          {/* Cột thông tin cửa hàng */}
          <div className={styles.infoCard}>
            <div className={styles.topCompactRow}>
              {info.spaImage && (
                <div className={styles.spaThumbWrap}>
                  <Image
                    src={info.spaImage}
                    alt={info.spaImageAlt || info.brandName}
                    fill
                    sizes="(max-width: 767px) 110px, 136px"
                    className={styles.spaThumb}
                  />
                </div>
              )}

              <div className={styles.infoRow}>
                <span className={styles.infoBadge}>ĐỊA CHỈ</span>
                <p className={styles.addressText}>{info.address}</p>
                {info.landmarkNote && (
                  <p className={styles.landmarkText}>{info.landmarkNote}</p>
                )}
                {info.districtNote && (
                  <p className={styles.subNote}>{info.districtNote}</p>
                )}
              </div>
            </div>

            <div className={styles.divider} />

            <div className={styles.metaCompactGrid}>
              <div className={styles.infoRow}>
                <span className={styles.infoBadge}>GIỜ MỞ CỬA</span>
                <p className={styles.hoursText}>{info.hours}</p>
                {info.hoursNote && (
                  <p className={styles.subNote}>{info.hoursNote}</p>
                )}
              </div>

              <div className={styles.infoRow}>
                <span className={styles.infoBadge}>HOTLINE</span>
                <div className={styles.phoneList}>
                  {info.phones?.map((p) => (
                    <a key={p.display} href={p.telHref} className={styles.phoneLink}>
                      {p.display}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.actionGroup}>
              <a
                href={info.bookingHref}
                onClick={handleBooking}
                {...(isExternalBooking
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={styles.primaryBtn}
              >
                Đặt lịch tư vấn 1:1 →
              </a>

              <div className={styles.secondaryRow}>
                {primaryPhone && (
                  <a
                    href={primaryPhone.zaloHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.secondaryBtn}
                  >
                    Zalo {primaryPhone.display}
                  </a>
                )}

                {secondaryPhone && (
                  <a
                    href={secondaryPhone.zaloHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.secondaryBtn}
                  >
                    Zalo {secondaryPhone.display}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Cột bản đồ có nhãn ghim tên spa cạnh chấm đỏ */}
          <div className={styles.mapCard}>
            <div className={styles.pinCallout}>
              <span className={styles.redDot} aria-hidden="true" />
              <div className={styles.pinCalloutText}>
                <strong>{info.pinLabel}</strong>
                <span>{info.landmarkNote}</span>
              </div>
              <a
                href={info.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.pinActionLink}
              >
                Dẫn đường →
              </a>
            </div>

            {info.mapEmbedUrl ? (
              <iframe
                title={`Bản đồ ${info.brandName}`}
                src={info.mapEmbedUrl}
                className={styles.mapIframe}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className={styles.mapPlaceholder}>
                <p className={styles.mapDesc}>{info.address}</p>
                <a
                  href={info.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapOpenBtn}
                >
                  Mở bản đồ dẫn đường →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}