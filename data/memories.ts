import { MemorySlice } from "@/types/memory";

// 6 slices × 60° = 360° — full circle coverage
// Degrees: -180 → -120 → -60 → 0 → 60 → 120 → 180
export const MEMORIES: MemorySlice[] = [
  // ── 1. Ngày Cưới ─────────────────────────────────────────────────────────────
  {
    id: 1,
    badge: "LỄ THÀNH HÔN",
    year: "2022",
    title: "Ngày Ta Về Chung Đôi",
    subtitle: "27/11/2022 — LỄ THÀNH HÔN",
    description:
      "Chiếc váy cưới trắng tinh khôi và lời nguyện ước trăm năm cùng bước vào lễ đường thiêng liêng.",
    quote:
      "Giây phút cầm tay em bước vào lễ đường, anh biết cuộc đời mình từ nay đã trọn vẹn một bến đỗ bình yên.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85",
    location: "Đà Nẵng",
    date: "27 / 11 / 2022",
    startDeg: -180,
    endDeg: -120,
  },

  // ── 2. Tuần Trăng Mật ────────────────────────────────────────────────────────
  {
    id: 2,
    badge: "TUẦN TRĂNG MẬT",
    year: "2022",
    title: "Mật Ngọt Đầu Đời",
    subtitle: "12/2022 — TUẦN TRĂNG MẬT",
    description:
      "Chuyến đi đầu tiên với tư cách vợ chồng — ánh nắng ban mai, sóng biển vỗ và nụ cười không tắt suốt hành trình.",
    quote:
      "Anh nhớ mãi cái lần em ngồi bên cửa sổ nhìn ra biển, tóc bay nhẹ, đẹp hơn bất kỳ bức tranh nào anh từng thấy.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85",
    location: "Phú Quốc",
    date: "05 / 12 / 2022",
    startDeg: -120,
    endDeg: -60,
  },

  // ── 3. Chuyến Đi Đầu Tiên ───────────────────────────────────────────────────
  {
    id: 3,
    badge: "CHUYẾN ĐI ĐẦU TIÊN",
    year: "2023",
    title: "Những Vùng Đất Mới",
    subtitle: "2023 — CHUYẾN ĐI ĐẦU TIÊN",
    description:
      "Cùng nhau ngắm hoàng hôn buông trên phố cổ, nắm tay nhau qua từng nẻo đường đầy ắp tiếng cười.",
    quote:
      "Không quan trọng đích đến ở đâu, chỉ cần trên mỗi dặm đường luôn có bàn tay của người đồng hành.",
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=85",
    location: "Hội An",
    date: "18 / 05 / 2023",
    startDeg: -60,
    endDeg: 0,
  },

  // ── 4. Tổ Ấm Bình Yên ───────────────────────────────────────────────────────
  {
    id: 4,
    badge: "TỔ ẤM BÌNH YÊN",
    year: "2023",
    title: "Góc Nhỏ Ngập Tràn Yêu Thương",
    subtitle: "2023 — TỔ ẤM BÌNH YÊN",
    description:
      "Những bữa cơm chiều giản dị, tách trà ấm và những câu chuyện nhỏ sau một ngày dài tất bật.",
    quote:
      "Hạnh phúc sau cánh cửa nhà chính là thấy nụ cười của em và những lời tâm sự không bao giờ dứt.",
    image:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=85",
    location: "Tổ ấm nhỏ",
    date: "24 / 11 / 2023",
    startDeg: 0,
    endDeg: 60,
  },

  // ── 5. Kỷ Niệm 2 Năm ────────────────────────────────────────────────────────
  {
    id: 5,
    badge: "730 NGÀY YÊU",
    year: "2024",
    title: "Hai Năm Chung Một Mái Nhà",
    subtitle: "27/11/2024 — KỶ NIỆM NGÀY CƯỚI",
    description:
      "730 ngày cùng chung nhịp đập — Tình yêu sau hai năm càng thêm đượm nồng và gắn bó sâu sắc.",
    quote:
      "Hai năm cùng nhau đi qua bao thăng trầm, để nhận ra tình cảm chúng mình vẫn vẹn nguyên như những ngày đầu.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=85",
    location: "Kỷ niệm ngày cưới",
    date: "27 / 11 / 2024",
    startDeg: 60,
    endDeg: 120,
  },

  // ── 6. Hành Trình Phía Trước ─────────────────────────────────────────────────
  {
    id: 6,
    badge: "HÀNH TRÌNH TIẾP NỐI",
    year: "MÃI MÃI",
    title: "Hành Trình Phía Trước",
    subtitle: "TƯƠNG LAI — TIẾP NỐI",
    description:
      "Cùng già đi và nắm chặt tay nhau đi hết những chặng đường hạnh phúc phía trước.",
    quote:
      "Cảm ơn vì đã luôn là mảnh ghép tuyệt vời nhất trong cuộc đời anh. Chúc mừng kỷ niệm ngày cưới của chúng mình!",
    image:
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1000&q=85",
    location: "Hành trình vĩnh cửu",
    date: "Mãi mãi về sau",
    startDeg: 120,
    endDeg: 180,
  },
];
