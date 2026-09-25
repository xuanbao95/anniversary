"use client";

type RsvpModalProps = {
  onClose: () => void;
};

export function RsvpModal({ onClose }: RsvpModalProps) {
  return (
    <div
      data-chapter-scroll-lock=""
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-[scene-rise_.3s_ease-out_both]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-lg border border-[#B99A63]/30 bg-[#141312] p-6 text-[#FAF6EE] shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-lg text-[#E8DCC9] transition-colors hover:bg-white/20"
        >
          ✕
        </button>

        <div className="text-center">
          <span className="text-[9px] font-bold tracking-[0.24em] text-[#B99A63]">
            XUÂN BẢO &amp; MINH NGỌC
          </span>
          <h3 className="mt-1 font-[family-name:var(--font-display)] text-2xl text-[#FAF6EE]">
            Gửi Lời Chúc Mừng
          </h3>
          <p className="mt-2 text-[12px] text-[#B8A89A]">
            Cảm ơn bạn đã luôn đồng hành và chia sẻ những khoảnh khắc hạnh phúc cùng chúng mình!
          </p>

          <div className="mt-5 rounded border border-white/10 bg-[#1a1816] p-4 text-left">
            <p className="text-[10px] tracking-wider text-[#D8B980]">THÔNG TIN KỶ NIỆM:</p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-sm text-[#FAF6EE]">
              Kỷ niệm ngày cưới: 27 / 11 / 2022 — 27 / 11 / 2026
            </p>
            <p className="text-[11px] text-[#A69280]">
              730 Ngày Yêu Thương &amp; Đắp Xây Tổ Ấm
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-5 w-full rounded-full bg-[#B99A63] py-2.5 text-[10px] font-bold tracking-[0.2em] text-[#0B0A09] transition-colors hover:bg-[#d6b479]"
          >
            GỬI LỜI CHÚC YÊU THƯƠNG ♥
          </button>
        </div>
      </div>
    </div>
  );
}
