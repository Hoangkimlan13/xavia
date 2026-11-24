"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./ProductsSection.module.css";
import ProductDetailModal from "./Products/ProductDetailModal";

const DEFAULT_PRODUCTS = [
  {
    id: "prod-recovery-serum",
    badge: "Bán chạy",
    discountTag: "Sale 20%",
    savingsLabel: "Tiết kiệm 250.000đ",
    name: "Tinh chất phục hồi chuyên sâu",
    subtitle: "Làm dịu da, củng cố hàng rào ẩm mềm mượt",
    originalPriceLabel: "1.250.000đ",
    salePriceLabel: "1.000.000đ",
    priceLabel: "1.000.000đ",
    volume: "30ml",
    texture: "Tinh chất lỏng thấm nhanh",
    idealFor:
      "Người có làn da đang nhạy cảm, mới làm liệu trình hoặc cần phục hồi nền da yếu.",
    skinTypes: ["Da nhạy cảm", "Da yếu sau treatment", "Da khô thiếu ẩm"],
    highlights: [
      "Hỗ trợ làm dịu nhanh cảm giác châm chích, căng rít trên bề mặt da",
      "Củng cố hàng rào ẩm giúp da giữ nước và khỏe vững hơn mỗi ngày",
      "Dễ kết hợp trong chu trình chăm sóc tại nhà theo hướng dẫn 1:1",
    ],
    usage:
      "Dùng ngày 2 lần sáng và tối sau bước làm sạch/cân bằng da, lấy 2–3 giọt vỗ nhẹ trước bước khóa ẩm.",
    note: "Thích hợp dùng duy trì sau các buổi phục hồi tại spa. Kết quả tùy cơ địa từng người.",
    image: "/images/products/recovery-serum.webp",
    href: "/products/tinh-chat-phuc-hoi-chuyen-sau",
  },
  {
    id: "prod-barrier-cream",
    badge: "Cấp ẩm sâu",
    discountTag: "Sale 15%",
    savingsLabel: "Tiết kiệm 177.000đ",
    name: "Kem dưỡng khóa ẩm đàn hồi",
    subtitle: "Nuôi dưỡng da căng mịn, giảm khô căng suốt ngày",
    originalPriceLabel: "1.180.000đ",
    salePriceLabel: "1.003.000đ",
    priceLabel: "1.003.000đ",
    volume: "50ml",
    texture: "Kem mềm mướt, không bết nặng",
    idealFor:
      "Khách hàng có da khô, da thiếu đàn hồi hoặc ngồi máy lạnh thường xuyên.",
    skinTypes: ["Da khô", "Da thiếu ẩm", "Da cần cải thiện đàn hồi"],
    highlights: [
      "Hỗ trợ cân bằng dầu – nước và khóa ẩm giúp bề mặt da mềm mại",
      "Giúp da trông căng mịn, giảm cảm giác khô sần vào cuối ngày",
      "Tạo lớp màng bảo vệ êm ái trước khi đi ngủ hoặc bước chống nắng ban ngày",
    ],
    usage:
      "Lấy lượng vừa đủ thoa đều khắp mặt và cổ ở bước cuối của chu trình dưỡng da sáng/tối.",
    note: "Phù hợp cho mọi nền da cần cấp ẩm và duy trì độ mềm mại ổn định.",
    image: "/images/products/barrier-cream.webp",
    href: "/products/kem-duong-khoa-am-dan-hoi",
  },
  {
    id: "prod-bright-essence",
    badge: "Sáng đều màu",
    discountTag: "Sale 18%",
    savingsLabel: "Tiết kiệm 250.000đ",
    name: "Dưỡng chất làm sáng đều màu",
    subtitle: "Hỗ trợ làm mờ đốm sạm, cho nền da rạng rỡ",
    originalPriceLabel: "1.390.000đ",
    salePriceLabel: "1.140.000đ",
    priceLabel: "1.140.000đ",
    volume: "30ml",
    texture: "Dưỡng chất êm dịu, thấm mịn",
    idealFor:
      "Người có nền da kém tươi tắn, da không đều màu hoặc vùng sạm sau mụn cần chăm sóc dịu nhẹ.",
    skinTypes: ["Da không đều màu", "Da xỉn màu", "Da sau mụn cần làm sáng"],
    highlights: [
      "Hỗ trợ cải thiện độ sáng trong và sự đều màu của bề mặt da",
      "Ưu tiên độ êm ái để không gây khô căng hay kích ứng nền da",
      "Giúp làn da trông rạng rỡ, tươi tắn hơn theo từng tuần sử dụng",
    ],
    usage:
      "Thoa sau bước làm sạch và cân bằng da vào buổi sáng hoặc tối, luôn kết hợp chống nắng ban ngày.",
    note: "Nên dùng đều đặn theo tư vấn chuyên viên để đạt độ đồng đều tối ưu.",
    image: "/images/products/radiance-essence.webp",
    href: "/products/duong-chat-lam-sang-deu-mau",
  },
  {
    id: "prod-shield-sunscreen",
    badge: "Bảo vệ mỗi ngày",
    discountTag: "Sale 15%",
    savingsLabel: "Tiết kiệm 133.500đ",
    name: "Kem chống nắng bảo vệ da",
    subtitle: "Chống nắng phổ rộng, mỏng nhẹ thoáng mịn",
    originalPriceLabel: "890.000đ",
    salePriceLabel: "756.500đ",
    priceLabel: "756.500đ",
    volume: "50ml",
    texture: "Mỏng nhẹ, ráo mịn tự nhiên",
    idealFor:
      "Mọi khách hàng cần bảo vệ da hằng ngày, đặc biệt người đang phục hồi da, trị mụn hoặc nâng cơ trẻ hóa.",
    skinTypes: ["Mọi loại da", "Da nhạy cảm", "Da sau liệu trình"],
    highlights: [
      "Hỗ trợ bảo vệ da trước tác động từ tia UV và môi trường hằng ngày",
      "Kết cấu mỏng nhẹ, thoáng mịn, không gây bí nặng trên da",
      "Giúp giữ vững thành quả chăm sóc và phục hồi da tại nhà",
    ],
    usage:
      "Thoa lượng đủ trước khi ra ngoài 15–20 phút mỗi sáng và dặm lại khi hoạt động ngoài trời lâu.",
    note: "Bước bắt buộc trong routine ban ngày để duy trì nền da khỏe và sáng đều.",
    image: "/images/products/mineral-uv-veil.webp",
    href: "/products/kem-chong-nang-bao-ve-da",
  },
];

export default function ProductsSection({
  products = DEFAULT_PRODUCTS,
  viewAllHref = "/products",
  onAddToCart,
  onSelectProduct = undefined,
}) {
  const trackRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const [addedId, setAddedId] = useState(null);
  const [modalProduct, setModalProduct] = useState(null);

  const productList =
    products && products.length > 0 ? products : DEFAULT_PRODUCTS;

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
      setActiveDot(Math.max(0, Math.min(productList.length - 1, idx)));
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [productList.length]);

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

  const handleAdd = (e, product, qty = 1) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setAddedId(product.id);
    if (onAddToCart) {
      for (let i = 0; i < qty; i += 1) {
        onAddToCart(product);
      }
    }
    window.setTimeout(() => {
      setAddedId((prev) => (prev === product.id ? null : prev));
    }, 1400);
  };

  const handleCardClick = (e, product) => {
    e.preventDefault();
    setModalProduct(product);
    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  return (
    <section
      id="products"
      className={styles.productsSection}
      aria-labelledby="products-heading"
    >
      {/* Vòm sóng mềm ở đầu phần mỹ phẩm */}
      <div className={styles.topWave} aria-hidden="true">
        <svg
          className={styles.waveSvg}
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
        >
          <path
            className={styles.topWaveFill}
            d="M0,0 L1440,0 L1440,18 C1120,58 780,6 420,38 C220,56 90,42 0,24 Z"
          />
          <path
            className={styles.waveGoldLine}
            d="M0,24 C90,42 220,56 420,38 C780,6 1120,58 1440,18"
          />
        </svg>
      </div>

      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.topBar}>
          <div className={styles.headingGroup}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowLine} aria-hidden="true" />
              SẢN PHẨM MỸ PHẨM • ƯU ĐÃI ĐỘC QUYỀN
            </span>

            <h2 id="products-heading" className={styles.heading}>
              Chăm sóc da mỗi ngày{" "}
              <em>cùng XAVIA</em>
            </h2>

            <p className={styles.subHeading}>
              Các dòng dưỡng chất dịu nhẹ giúp làn da duy trì độ ẩm, độ sáng và sự rạng rỡ
            </p>
          </div>

        </div>

        {/* DANH SÁCH SẢN PHẨM */}
        <div ref={trackRef} className={styles.cardsTrack}>
          {productList.map((item) => {
            const isAdded = addedId === item.id;
            const hasSale = Boolean(
              item.salePriceLabel && item.originalPriceLabel
            );

            return (
              <article key={item.id} className={styles.card}>
                <a
                  href={item.href}
                  onClick={(e) => handleCardClick(e, item)}
                  className={styles.imageLink}
                >
                  <div className={styles.imageWrap}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 767px) 78vw, (max-width: 1023px) 48vw, 25vw"
                      className={styles.image}
                    />
                    <div className={styles.imageGlow} aria-hidden="true" />
                    {item.badge && (
                      <span className={styles.tagBadge}>{item.badge}</span>
                    )}
                    {item.discountTag && (
                      <span className={styles.saleBadge}>{item.discountTag}</span>
                    )}
                  </div>
                </a>

                <div className={styles.cardBody}>
                  <a
                    href={item.href}
                    onClick={(e) => handleCardClick(e, item)}
                    className={styles.titleLink}
                  >
                    <h3 className={styles.productName}>{item.name}</h3>
                    <p className={styles.productSubtitle}>{item.subtitle}</p>
                  </a>

                  <div className={styles.cardFooter}>
                    <div className={styles.priceGroup}>
                      {hasSale ? (
                        <>
                          <span className={styles.originalPrice}>
                            {item.originalPriceLabel}
                          </span>
                          <span className={styles.salePrice}>
                            {item.salePriceLabel}
                          </span>
                        </>
                      ) : (
                        <span className={styles.salePrice}>{item.priceLabel}</span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleAdd(e, item, 1)}
                      className={`${styles.addBtn} ${
                        isAdded ? styles.addBtnAdded : ""
                      }`}
                    >
                      {isAdded ? "Đã thêm ✓" : "Thêm giỏ"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* DẤU CHẤM TRÊN MOBILE */}
        {productList.length > 1 && (
          <div className={styles.dots} aria-label="Chỉ báo sản phẩm">
            {productList.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Xem sản phẩm ${idx + 1}: ${item.name}`}
                onClick={() => scrollToIndex(idx)}
                className={`${styles.dot} ${
                  idx === activeDot ? styles.dotActive : ""
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Vòm sóng mềm ở cuối phần mỹ phẩm */}
      <div className={styles.bottomWave} aria-hidden="true">
        <svg
          className={styles.waveSvg}
          viewBox="0 0 1440 68"
          preserveAspectRatio="none"
        >
          <path
            className={styles.bottomWaveFill}
            d="M0,24 C340,64 680,4 1020,34 C1210,50 1350,28 1440,16 L1440,68 L0,68 Z"
          />
          <path
            className={styles.waveGoldLine}
            d="M0,24 C340,64 680,4 1020,34 C1210,50 1350,28 1440,16"
          />
        </svg>
      </div>

      <ProductDetailModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
        onAddToCart={(prod, qty) => handleAdd(null, prod, qty)}
      />
    </section>
  );
}