"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./CeoSection.module.css";

const BOOKING_URL = "https://xaviaspa.salonhero.vn/dat-lich";

const DEFAULT_CEO = {
  eyebrow: "THE FOUNDER & CEO · ĐẸP CÓ CƠ SỞ – AN TÂM CÓ LÝ DO",
  roleBadge: "CEO XAVIA SPA · CEO CÔNG TY DR.ANMYTAS",
  name: "Nguyễn Thị Mai Hương",
  headline: "Nuôi dưỡng làn da khỏe, gìn giữ nét thanh xuân.",
  story:
    "Không chỉ mong muốn giúp bạn đẹp hơn hôm nay, Xavia Spa còn mong muốn đồng hành cùng bạn gìn giữ vẻ đẹp trong nhiều năm về sau. Với 10+ năm kinh nghiệm trong lĩnh vực tư vấn, chăm sóc, phục hồi và trẻ hóa làn da cùng đội ngũ kỹ thuật viên được đào tạo bài bản, có tay nghề và tận tâm, Mai Hương luôn theo đuổi định hướng làm đẹp khoa học — làm đúng những gì làn da thực sự cần, tôn trọng vẻ đẹp tự nhiên và giúp bạn tự tin hơn với làn da mặt mộc ở mọi độ tuổi.",
  quote:
    "Một làn da đẹp trước hết phải là một làn da khỏe. Thanh xuân không chỉ được gìn giữ bằng việc làm đẹp, mà bằng cách chăm sóc đúng ngay từ gốc.",
  image: "/images/ceo-huong-rubi.png",
  imageAlt: "CEO Nguyễn Thị Mai Hương - CEO Xavia Spa & CEO Công ty Dr.Anmytas",
  stats: [
    { number: "10+", label: "Năm kinh nghiệm" },
    { number: "1.050", label: "Ca mụn các cấp độ" },
    { number: "≈1.000", label: "Ca nâng cơ – trẻ hóa" },
  ],
  highlights: [
    {
      title: "Chứng nhận chuyên môn Y tế",
      desc: "Có chứng nhận của Trung tâm Bồi dưỡng kiến thức chăm sóc da và trẻ hóa làn da – Viện Khoa học Quản lý Y tế.",
    },
    {
      title: "CEO Xavia Spa",
      desc: "Dẫn dắt đội ngũ kỹ thuật viên giàu kinh nghiệm, soi khám, phân tích da và theo sát từng hành trình làm đẹp.",
    },
    {
      title: "CEO Công ty Dr.Anmytas",
      desc: "Định hướng giải pháp dược mỹ phẩm khoa học, chú trọng tái tạo, phục hồi và nuôi dưỡng làn da từ gốc.",
    },
    {
      title: "Công nghệ ＆ định hướng bền vững",
      desc: "Kết hợp nền tảng khoa học, hệ thống công nghệ được đầu tư bài bản và sự theo sát từng khách hàng.",
    },
  ],
  advisorsTitle: "BẢO TRỢ CHUYÊN MÔN CHO XAVIA SPA",
  advisorsSubtitle:
    "Nền tảng kiến thức và định hướng khoa học được bảo trợ chuyên môn bởi đội ngũ chuyên gia đầu ngành.",
  advisors: [
    {
      name: "TS.BS Nguyễn Sỹ Hóa",
      role: "Thầy thuốc ưu tú · Bác sĩ cao cấp",
      points: [
        "Nguyên Phó Viện trưởng, kiêm Trưởng khoa Laser phẫu thuật tạo hình thẩm mỹ – Viện Da liễu Quốc gia Việt Nam.",
        "Hơn 33 năm kinh nghiệm trong lĩnh vực phẫu thuật tạo hình thẩm mỹ.",
        "Một trong những chuyên gia đầu ngành về phẫu thuật tạo hình thẩm mỹ.",
        "Từng nghiên cứu, thực tập và thực hành chuyên môn tại Hà Lan và Hoa Kỳ.",
      ],
      image: "/images/advisor-nguyen-sy-hoa.png",
      imageAlt: "TS.BS Nguyễn Sỹ Hóa - Bảo trợ chuyên môn Xavia Spa",
      initials: "SH",
    },
    {
      name: "BS. Nguyễn Quỳnh Ân",
      role: "Nhà sáng lập thương hiệu dược mỹ phẩm Dr.Anmytas",
      points: [
        "Giám đốc sáng tạo sản phẩm Công ty Dược mỹ phẩm Dr.Anmytas.",
        "Nhà sáng lập hệ thống Dr.Anmytas Face Wash.",
        "Phó Giám đốc Trung tâm Bồi dưỡng kiến thức chăm sóc da bệnh lý và trẻ hóa làn da, trực thuộc Viện Khoa học Quản lý Y tế.",
      ],
      image: "/images/advisor-nguyen-quynh-an.png",
      imageAlt: "BS. Nguyễn Quỳnh Ân - Bảo trợ chuyên môn Xavia Spa",
      initials: "QA",
    },
  ],
  assuranceHeading: "ĐẾN XAVIA, BẠN CÓ THỂ AN TÂM VỀ ĐIỀU GÌ?",
  assuranceIntro:
    "Tại Xavia Spa, bạn không chỉ được chăm sóc nhan sắc bởi đội ngũ tận tâm mà còn được an tâm gửi gắm trọn vẹn hành trình làm đẹp:",
  assurances: [
    "Được lắng nghe mong muốn làm đẹp của mình.",
    "Được lựa chọn dịch vụ phù hợp với ngân sách.",
    "Được biết rõ chi phí trước khi thực hiện.",
    "Không áp lực mua liệu trình.",
    "Được đồng hành và theo dõi sau mỗi buổi làm đẹp.",
  ],
  assuranceClosing:
    "“Hãy bắt đầu làm đẹp theo cách khiến bạn cảm thấy thoải mái nhất — bởi vẻ đẹp bền vững là gìn giữ qua nhiều năm về sau.”",
  ctaLabel: "ĐẶT LỊCH TƯ VẤN CÙNG CEO",
};

function AdvisorCard({ advisor, index }) {
  const [imgError, setImgError] = useState(!advisor.image);
  const points =
    advisor.points || (advisor.desc ? [advisor.desc] : []);

  return (
    <article className={styles.advisorCard}>
      <div className={styles.advisorTop}>
        <div className={styles.advisorMediaWrap}>
          {!imgError && advisor.image ? (
            <Image
              src={advisor.image}
              alt={advisor.imageAlt || advisor.name}
              fill
              sizes="(max-width: 767px) 84px, 98px"
              className={styles.advisorImg}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className={styles.advisorFallback} aria-hidden="true">
              <span>{advisor.initials || "BS"}</span>
            </div>
          )}
        </div>

        <div className={styles.advisorHeaderText}>
          <span className={styles.advisorTag}>
            CỐ VẤN &amp; BẢO TRỢ 0{index + 1}
          </span>
          <h4>{advisor.name}</h4>
          <p className={styles.advisorRole}>{advisor.role}</p>
        </div>
      </div>

      {points.length > 0 && (
        <ul className={styles.advisorList}>
          {points.map((pt) => (
            <li key={pt}>{pt}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default function CeoSection({
  ceo = DEFAULT_CEO,
  bookingHref = BOOKING_URL,
  onBookClick = undefined,
}) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imgError, setImgError] = useState(false);

  const info = {
    ...DEFAULT_CEO,
    ...ceo,
    stats: ceo?.stats ?? DEFAULT_CEO.stats,
    highlights: ceo?.highlights ?? DEFAULT_CEO.highlights,
    advisors: ceo?.advisors ?? DEFAULT_CEO.advisors,
    assurances: ceo?.assurances ?? DEFAULT_CEO.assurances,
  };
  const isExternalBooking = /^https?:\/\//i.test(bookingHref || "");

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
      id="ceo"
      className={`${styles.ceoSection} ${isVisible ? styles.isVisible : ""}`}
      aria-labelledby="ceo-heading"
    >
      {/* SÓNG ELIP MỀM MẠI Ở MÉP TRÊN */}
      <div className={styles.waveTop} aria-hidden="true">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className={styles.waveSvg}
        >
          <defs>
            <linearGradient id="ceoWaveGold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(237, 211, 150, 0.08)" />
              <stop offset="28%" stopColor="rgba(237, 211, 150, 0.65)" />
              <stop offset="50%" stopColor="rgba(248, 226, 173, 0.85)" />
              <stop offset="72%" stopColor="rgba(237, 211, 150, 0.65)" />
              <stop offset="100%" stopColor="rgba(237, 211, 150, 0.08)" />
            </linearGradient>
          </defs>

          <path
            d="M0,0 L1440,0 L1440,34 C1120,104 320,104 0,22 Z"
            className={styles.waveTopFill}
          />
          <path
            d="M0,22 C320,104 1120,104 1440,34"
            stroke="url(#ceoWaveGold)"
            className={styles.waveGoldStroke}
          />
        </svg>
      </div>

      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.glowOne} aria-hidden="true" />
      <div className={styles.glowTwo} aria-hidden="true" />
      <span className={styles.watermark} aria-hidden="true">
        XAVIA
      </span>

      <div className={styles.container}>
        <div className={styles.sectionLabel}>
          <span />
          XAVIA SPA · NƠI AN TÂM GỬI GẮM NHAN SẮC
          <span />
        </div>

        <div className={styles.profileGrid}>
          {/* CỘT ẢNH PNG CẮT NỀN */}
          <div className={styles.portraitCol}>
            <div className={styles.portraitStage}>
              <div className={styles.portraitAura} aria-hidden="true" />
              <div className={styles.portraitArch} aria-hidden="true" />

              <div className={styles.portraitWrap}>
                {!imgError ? (
                  <Image
                    src={info.image}
                    alt={info.imageAlt || info.name}
                    fill
                    priority={false}
                    sizes="(max-width: 767px) 82vw, (max-width: 1023px) 42vw, 480px"
                    className={styles.portraitImg}
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className={styles.portraitFallback}>
                    <span>MH</span>
                    <strong>{info.name}</strong>
                  </div>
                )}
              </div>

              <div className={styles.portraitPedestal} aria-hidden="true" />
            </div>

            <div className={styles.portraitSignature}>
              <span className={styles.signatureLine} />
              <span>CEO XAVIA SPA</span>
              <span className={styles.signatureLine} />
            </div>
          </div>

          {/* CỘT NỘI DUNG BÊN CẠNH */}
          <div className={styles.contentCol}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              {info.eyebrow}
            </div>


            <h2 id="ceo-heading" className={styles.ceoName}>
              {info.name}
              <span className={styles.nameDot}>.</span>
            </h2>

            <p className={styles.headline}>{info.headline}</p>

            <div className={styles.goldDivider}>
              <span />
            </div>

            <p className={styles.story}>{info.story}</p>

            <blockquote className={styles.quote}>
              <span className={styles.quoteMark}>“</span>
              <p>{info.quote}</p>
            </blockquote>

            <div className={styles.statsGrid}>
              {info.stats.map((item) => (
                <div key={item.label} className={styles.statItem}>
                  <strong>{item.number}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* NỀN TẢNG & DẤU ẤN CHUYÊN MÔN */}
        <div className={styles.achievements}>
          <div className={styles.achievementsHeading}>
            <span>01 — 04 · NHỮNG CON SỐ TẠO NÊN NIỀM TIN</span>
            <h3>NỀN TẢNG ＆ DẤU ẤN CHUYÊN MÔN</h3>
            <p>
              Làm đẹp có cơ sở – an tâm có lý do: làm đúng những gì làn da thực
              sự cần, tôn trọng vẻ đẹp tự nhiên và đồng hành bền vững.
            </p>
          </div>

          <div className={styles.highlightsGrid}>
            {info.highlights.map((item, idx) => (
              <article key={item.title} className={styles.highlightItem}>
                <span className={styles.highlightIndex}>0{idx + 1}</span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* BẢO TRỢ CHUYÊN MÔN */}
        {info.advisors && info.advisors.length > 0 && (
          <div className={styles.advisorsSection}>
            <div className={styles.achievementsHeading}>
              <span>NỀN TẢNG KHOA HỌC – NIỀM TIN CHO NHAN SẮC</span>
              <h3>{info.advisorsTitle}</h3>
              <p>{info.advisorsSubtitle}</p>
            </div>

            <div className={styles.advisorsGrid}>
              {info.advisors.map((advisor, idx) => (
                <AdvisorCard key={advisor.name} advisor={advisor} index={idx} />
              ))}
            </div>
          </div>
        )}

        {/* LỒNG GHÉP KHÉO LÉO: BẠN CÓ THỂ YÊN TÂM ĐIỀU GÌ Ở XAVIA SPA + CTA */}
        <div className={styles.assuranceBox}>
          <div className={styles.assuranceHeader}>
            <div>
              <span className={styles.assuranceEyebrow}>
                CAM KẾT ĐỒNG HÀNH CÙNG BẠN
              </span>
              <h3>{info.assuranceHeading}</h3>
              <p>{info.assuranceIntro}</p>
            </div>
          </div>

          <ul className={styles.assuranceList}>
            {info.assurances.map((line) => (
              <li key={line} className={styles.assuranceItem}>
                <span className={styles.checkBadge} aria-hidden="true">
                  ✓
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <div className={styles.bottomCta}>
            <p>{info.assuranceClosing}</p>
            <a
              href={bookingHref}
              onClick={handleBooking}
              {...(isExternalBooking && !onBookClick
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={styles.primaryBtn}
            >
              {info.ctaLabel}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}