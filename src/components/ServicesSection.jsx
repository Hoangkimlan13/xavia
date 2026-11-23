"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./ServicesSection.module.css";
import ServiceDetailModal from "./Services/ServiceDetailModal";

const DEFAULT_SERVICES = [
  {
    id: "enzym-tuan-hoan",
    title: "Enzym Tuần Hoàn",
    subtitle:
      "Hỗ trợ cân bằng hệ vi sinh trên da và phục hồi hàng rào bảo vệ da.",
    duration: "90 phút",
    price: "1.800.000đ",
    experienceLabel: "Êm dịu, phục hồi nền da",
    image: "/images/services/rf.webp",
    beforeImage: "/images/results/hifu-before.webp",
    afterImage: "/images/results/hifu-after.webp",
    resultCaption:
      "Kéo thanh sang trái hoặc phải để đối chiếu trước và sau liệu trình Enzym Tuần Hoàn.",
    href: "/services/enzym-tuan-hoan",
    skinSignals: [
      "Da dễ ửng đỏ, châm chích hoặc rát nhẹ khi đổi thời tiết hoặc mỹ phẩm",
      "Nền da yếu sau treatment mạnh, lột tẩy hoặc chăm sóc chưa phù hợp",
      "Da vừa khô căng bên trong vừa dễ đổ dầu, kém tươi tắn",
    ],
    whyChoose: [
      "Tôn trọng sinh lý tự nhiên của làn da, không bào mòn hay gây bong tróc mạnh",
      "Tập trung nuôi dưỡng hệ vi sinh và củng cố hàng rào bảo vệ từ gốc",
      "Kết hợp hướng dẫn routine tại nhà và theo dõi 1:1 phù hợp nhịp da",
    ],
    benefits: [
      "Hỗ trợ cân bằng hệ vi sinh và độ pH sinh lý trên da",
      "Phục hồi hàng rào bảo vệ, giảm tình trạng nhạy cảm khó chịu",
      "Giúp bề mặt da mềm mại, ẩm mượt và khỏe vững hơn",
    ],
    outcomeSummary:
      "Sau quá trình chăm sóc, nền da dịu lại rõ rệt, giảm cảm giác khô rát và sẵn sàng hấp thụ dưỡng chất tốt hơn.",
    milestones: [
      {
        stage: "Sau buổi đầu tiên",
        desc: "Da cảm nhận được sự thư giãn, dịu mát, bớt căng rít và bề mặt mượt hơn.",
      },
      {
        stage: "Sau liệu trình duy trì",
        desc: "Hàng rào da ổn định hơn, hạn chế kích ứng vặt và giữ vẻ tươi tắn tự nhiên.",
      },
    ],
    suitableFor:
      "Khách hàng có nền da nhạy cảm, da yếu cần phục hồi hoặc muốn chăm sóc an toàn, êm ái.",
    aftercareNote:
      "Ưu tiên cấp ẩm dịu nhẹ, chống nắng đầy đủ mỗi ngày và duy trì routine theo tư vấn của XAVIA SPA.",
  },
  {
    id: "hifu-mfu",
    title: "HIFU-MFU",
    subtitle:
      "Liệu trình nâng cơ không xâm lấn, hướng đến làn da săn chắc và đường nét gương mặt gọn hơn.",
    duration: "90 phút",
    price: "Giá theo vùng",
    experienceLabel: "Nâng cơ không xâm lấn",
    image: "/images/services/hifu.webp",
    beforeImage: "/images/results/hifu-before.webp",
    afterImage: "/images/results/hifu-after.webp",
    resultCaption:
      "Kéo thanh sang trái hoặc phải để đối chiếu trước và sau liệu trình HIFU-MFU.",
    href: "/services/hifu-mfu",
    skinSignals: [
      "Da bắt đầu kém săn chắc, đường viền hàm hoặc vùng má kém gọn nét",
      "Cảm nhận độ đàn hồi suy giảm theo nhịp sống và dấu hiệu tuổi tác",
      "Mong muốn cải thiện trẻ hóa nhưng ngại phẫu thuật hay xâm lấn sâu",
    ],
    whyChoose: [
      "Ứng dụng công nghệ HIFU-MFU không xâm lấn, hướng đến hiệu quả tự nhiên, hài hòa",
      "Cá nhân hóa mức năng lượng và vùng thực hiện theo cấu trúc gương mặt từng khách",
      "Theo dõi sát sao quá trình đáp ứng của da và tư vấn chăm sóc duy trì lâu dài",
    ],
    benefits: [
      "Hỗ trợ nâng đỡ, giúp làn da săn chắc và đàn hồi hơn",
      "Giúp đường nét gương mặt trông gọn gàng, thanh thoát tự nhiên",
      "Thực hiện nhẹ nhàng, sinh hoạt hằng ngày thuận tiện ngay sau buổi làm",
    ],
    outcomeSummary:
      "Hiệu quả nâng cơ và cải thiện độ săn chắc tiến triển tự nhiên sau buổi thực hiện và rõ nét dần theo từng tuần.",
    milestones: [
      {
        stage: "Ngay sau buổi thực hiện",
        desc: "Da có cảm giác săn gọn hơn, vẫn sinh hoạt bình thường nhẹ nhàng.",
      },
      {
        stage: "Sau vài tuần tiếp theo",
        desc: "Độ đàn hồi và đường nét gương mặt định hình rõ hơn, hài hòa với nét riêng.",
      },
    ],
    suitableFor:
      "Khách hàng muốn nâng cơ trẻ hóa không xâm lấn, cải thiện độ săn chắc và đường nét gương mặt.",
    aftercareNote:
      "Dưỡng ẩm đủ độ, tránh nhiệt độ quá cao trực tiếp lên da trong vài ngày đầu và trao đổi 1:1 khi cần.",
  },
  {
    id: "dien-sac-phu-quy",
    title: "Diện Sắc Phú Quý",
    subtitle:
      "Thư giãn các nhóm cơ vùng trán, mắt, má và hàm, hỗ trợ giảm căng cứng, giúp gương mặt hồng hào và hài hòa hơn.",
    duration: "",
    price: "980.000đ",
    experienceLabel: "Thư giãn cơ mặt, sáng thần sắc",
    image: "/images/services/brightening.webp",
    beforeImage: "/images/results/acne-before.webp",
    afterImage: "/images/results/acne-after.webp",
    resultCaption:
      "Kéo thanh sang trái hoặc phải để đối chiếu trước và sau liệu trình Diện Sắc Phú Quý.",
    href: "/services/dien-sac-phu-quy",
    skinSignals: [
      "Thường xuyên nhíu mày, mỏi mắt, nghiến hàm hoặc căng cơ mặt do làm việc nhiều",
      "Gương mặt nhìn mệt mỏi, kém tươi tắn dù ngủ đủ hoặc dưỡng da đều",
      "Các đường nét biểu cảm trên trán, quanh mắt và hàm dễ bị căng cứng",
    ],
    whyChoose: [
      "Tập trung đúng vào các nhóm cơ trán, mắt, má và hàm để giải tỏa căng cứng",
      "Kỹ thuật êm ái, chú trọng sự thư thái và thần sắc tự nhiên của gương mặt",
      "Giúp khách hàng vừa thư giãn tinh thần vừa cải thiện độ mềm mại của biểu cảm",
    ],
    benefits: [
      "Hỗ trợ giảm cảm giác căng cứng ở cơ trán, mắt, má và hàm",
      "Giúp gương mặt hồng hào, rạng ngời và hài hòa hơn",
      "Mang lại cảm giác nhẹ nhõm, thư giãn sâu sau ngày dài làm việc",
    ],
    outcomeSummary:
      "Sau liệu trình, gương mặt trông nhẹ nhàng, tươi tắn và mềm mại hơn nhờ các nhóm cơ được thư giãn đúng điểm.",
    milestones: [
      {
        stage: "Ngay sau buổi chăm sóc",
        desc: "Vùng trán, mắt và hàm bớt căng cứng; thần sắc gương mặt rạng rỡ, tươi tắn hơn.",
      },
      {
        stage: "Khi duy trì định kỳ",
        desc: "Hạn chế thói quen cau mày, căng cơ lặp lại, giữ nét mặt mềm mại, hài hòa.",
      },
    ],
    suitableFor:
      "Người làm việc căng thẳng, hay mỏi mắt hoặc muốn gương mặt trông hồng hào, thư thái tự nhiên.",
    aftercareNote:
      "Giữ tinh thần thư giãn, uống đủ nước và kết hợp thói quen thả lỏng cơ mặt trong sinh hoạt hằng ngày.",
  },
  {
    id: "cham-soc-da-mun",
    title: "Chăm Sóc Da Mụn",
    subtitle:
      "Chăm sóc da mụn, hỗ trợ làm dịu da và kiểm soát bã nhờn.",
    duration: "60 phút",
    price: "550.000đ",
    experienceLabel: "Làm dịu da, thông thoáng",
    image: "/images/services/acne.webp",
    beforeImage: "/images/results/acne-before.webp",
    afterImage: "/images/results/acne-after.webp",
    resultCaption:
      "Kéo thanh sang trái hoặc phải để đối chiếu trước và sau liệu trình Chăm Sóc Da Mụn.",
    href: "/services/cham-soc-da-mun",
    skinSignals: [
      "Da dầu thừa, bít tắc lỗ chân lông, dễ phát sinh mụn lặp đi lặp lại",
      "Vùng da mụn nhạy cảm, dễ kích ứng nếu xử lý mạnh tay hoặc sai cách",
      "Cần phác đồ chăm sóc sạch dịu kết hợp hướng dẫn chăm da tại nhà",
    ],
    whyChoose: [
      "Tiếp cận khoa học, ưu tiên làm dịu và bảo vệ nền da thay vì ép da quá mức",
      "Hỗ trợ kiểm soát dầu thừa và bã nhờn để hạn chế bít tắc mới",
      "Có tư vấn routine tại nhà và theo dõi 1:1 giúp duy trì kết quả ổn định",
    ],
    benefits: [
      "Hỗ trợ làm dịu các vùng da mụn và giảm cảm giác khó chịu trên da",
      "Hỗ trợ kiểm soát bã nhờn, giúp da thông thoáng và sạch mịn hơn",
      "Giúp khách hàng hiểu cách chăm da mụn đúng chuẩn để hạn chế tái phát",
    ],
    outcomeSummary:
      "Sau quá trình chăm sóc, da bớt dầu thừa bí bách, bề mặt dịu nhẹ và sáng sạch hơn theo từng giai đoạn.",
    milestones: [
      {
        stage: "Sau buổi chăm sóc",
        desc: "Da thông thoáng, dịu nhẹ hơn và giảm cảm giác nhờn rít trên bề mặt.",
      },
      {
        stage: "Sau lộ trình theo dõi",
        desc: "Tình trạng mụn được kiểm soát tốt hơn, nền da ổn định và dễ chăm sóc lâu dài.",
      },
    ],
    suitableFor:
      "Khách hàng gặp tình trạng da mụn, dầu thừa hoặc cần chăm sóc phục hồi cho da dễ nổi mụn.",
    aftercareNote:
      "Làm sạch dịu nhẹ, không tự ý nặn mụn sai cách và tuân thủ routine tại nhà được hướng dẫn.",
  },
];

export default function ServicesSection({
  services = DEFAULT_SERVICES,
  onSelectService = undefined,
}) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const serviceList =
    services && services.length > 0 ? services : DEFAULT_SERVICES;

  // Kích hoạt animation mượt khi cuộn vào vùng nhìn thấy
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
      setActiveDot(Math.max(0, Math.min(serviceList.length - 1, idx)));
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [serviceList.length]);

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

  const handleCardClick = (e, service) => {
    e.preventDefault();
    setSelectedService(service);
    if (onSelectService) {
      onSelectService(service);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className={`${styles.servicesSection} ${
        isVisible ? styles.isVisible : ""
      }`}
      aria-labelledby="services-heading"
    >
      {/* Ánh sáng lụa chuyển động ở đầu phần dịch vụ */}
      <div className={styles.silkAura} aria-hidden="true" />

      <div className={styles.container}>
        {/* HEADER MỤC DỊCH VỤ NỔI BẬT */}
        <div className={styles.topBar}>
          <div className={styles.headingGroup}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowLine} aria-hidden="true" />
              PHỤC HỒI – NÂNG CƠ – TRẺ HÓA
            </span>

            <h2 id="services-heading" className={styles.heading}>
              Liệu trình chăm sóc da{" "}
              <em>cá nhân hóa</em>
            </h2>
          </div>
        </div>

        {/* DANH SÁCH THẺ DỊCH VỤ */}
        <div ref={trackRef} className={styles.cardsTrack}>
          {serviceList.map((item, idx) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleCardClick(e, item)}
              style={{ "--stagger": idx }}
              className={styles.card}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 767px) 84vw, (max-width: 1023px) 48vw, 25vw"
                className={styles.image}
              />

              <div className={styles.cardScrim} aria-hidden="true" />
              <div className={styles.cardShimmer} aria-hidden="true" />

              <div className={styles.cardOverlayContent}>
                <div className={styles.cardTopMeta}>
                  {item.duration && (
                    <span className={styles.metaPill}>{item.duration}</span>
                  )}
                  {item.price && (
                    <span className={styles.pricePill}>{item.price}</span>
                  )}
                </div>

                <div className={styles.cardBottomRow}>
                  <div className={styles.cardText}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardSubtitle}>{item.subtitle}</p>
                  </div>

                  <span className={styles.cardArrow} aria-hidden="true">
                    →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CHẤM CHỈ BÁO SLIDE TRÊN MOBILE */}
        {serviceList.length > 1 && (
          <div className={styles.dots} aria-label="Chỉ báo dịch vụ nổi bật">
            {serviceList.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Xem dịch vụ ${idx + 1}: ${item.title}`}
                onClick={() => scrollToIndex(idx)}
                className={`${styles.dot} ${
                  idx === activeDot ? styles.dotActive : ""
                }`}
              />
            ))}
          </div>
        )}

        <p className={styles.disclaimer}>
          Giá niêm yết tính bằng đồng. Kết quả tùy thuộc cơ địa và tình trạng da.
        </p>
      </div>

      {/* ĐƯỜNG SÓNG GỢN / ELIP MỀM Ở CUỐI PHẦN DỊCH VỤ */}
      <div className={styles.bottomWave} aria-hidden="true">
        <svg
          className={styles.waveSvg}
          viewBox="0 0 1440 72"
          preserveAspectRatio="none"
        >
          <path
            className={styles.waveFill}
            d="M0,26 C320,66 640,4 980,34 C1180,52 1330,30 1440,18 L1440,72 L0,72 Z"
          />
          <path
            className={styles.waveGoldLine}
            d="M0,26 C320,66 640,4 980,34 C1180,52 1330,30 1440,18"
          />
        </svg>
      </div>

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </section>
  );
}