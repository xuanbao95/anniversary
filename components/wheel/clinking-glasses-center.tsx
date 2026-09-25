type ClinkingGlassesCenterProps = {
  cx: number;
  cy: number;
  rInner: number;
};

export function ClinkingGlassesCenter({ cx, cy, rInner }: ClinkingGlassesCenterProps) {
  return (
    <g className="select-none">
      {/* Nền Vòng Tròn Tâm */}
      <circle
        cx={cx}
        cy={cy}
        r={rInner - 10}
        fill="#0A0908"
        stroke="#B99A63"
        strokeWidth="1.8"
        opacity="0.98"
        className="drop-shadow-2xl"
      />
      <circle
        cx={cx}
        cy={cy}
        r={rInner - 16}
        fill="none"
        stroke="#B99A63"
        strokeWidth="0.8"
        strokeDasharray="2 4"
        opacity="0.4"
      />

      {/* Header Tên Thương Hiệu / Lời Tựa */}
      <text
        x={cx}
        y={cy - 128}
        textAnchor="middle"
        fill="#FAF6EE"
        fontSize="13"
        fontWeight="bold"
        letterSpacing="0.32em"
        fontFamily="var(--font-serif), serif"
      >
        RENEW
      </text>
      <text
        x={cx}
        y={cy - 116}
        textAnchor="middle"
        fill="#B99A63"
        fontSize="6"
        fontWeight="600"
        letterSpacing="0.22em"
        fontFamily="var(--font-body), sans-serif"
      >
        OUR WEDDING STORY
      </text>

      {/* Ánh Sao Lấp Lánh Phía Trên 2 Ly */}
      <path
        d={`M ${cx - 36} ${cy - 108} Q ${cx - 36} ${cy - 100} ${cx - 44} ${cy - 100} Q ${cx - 36} ${cy - 100} ${cx - 36} ${cy - 92} Q ${cx - 36} ${cy - 100} ${cx - 28} ${cy - 100} Z`}
        fill="#FFF4D4"
        className="drop-shadow-[0_0_6px_rgba(255,244,212,0.8)]"
      />
      <path
        d={`M ${cx - 18} ${cy - 92} Q ${cx - 18} ${cy - 87} ${cx - 23} ${cy - 87} Q ${cx - 18} ${cy - 87} ${cx - 18} ${cy - 82} Q ${cx - 18} ${cy - 87} ${cx - 13} ${cy - 87} Z`}
        fill="#FFF4D4"
      />
      <path
        d={`M ${cx + 42} ${cy - 102} Q ${cx + 42} ${cy - 95} ${cx + 35} ${cy - 95} Q ${cx + 42} ${cy - 95} ${cx + 42} ${cy - 88} Q ${cx + 42} ${cy - 95} ${cx + 49} ${cy - 95} Z`}
        fill="#FFF4D4"
        className="drop-shadow-[0_0_6px_rgba(255,244,212,0.8)]"
      />

      {/* CỤM ANIMATION 2 LY RƯỢU CỤNG LY */}
      <g transform={`translate(${cx - 75}, ${cy - 95})`}>
        {/* Ly Trái (Họa tiết vòng đồng tâm) */}
        <g
          style={{
            transformOrigin: "42px 75px",
            animation: "glass-clink-left 3.2s ease-in-out infinite",
          }}
        >
          <path
            d="M 22 18 C 22 48, 62 48, 62 18 Z"
            fill="rgba(216,185,128,0.12)"
            stroke="#FAF6EE"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M 42 48 L 42 78" stroke="#FAF6EE" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 25 78 L 59 78" stroke="#FAF6EE" strokeWidth="1.8" strokeLinecap="round" />

          {/* Concentric Nested Loops */}
          <path
            d="M 29 25 C 29 42, 55 42, 55 25"
            fill="none"
            stroke="#FAF6EE"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M 34 29 C 34 38, 50 38, 50 29"
            fill="none"
            stroke="#FAF6EE"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M 38 32 C 38 35, 46 35, 46 32"
            fill="none"
            stroke="#FAF6EE"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </g>

        {/* Ly Phải (Nghiêng chạm ly + Sóng nước) */}
        <g
          style={{
            transformOrigin: "108px 75px",
            animation: "glass-clink-right 3.2s ease-in-out infinite",
          }}
        >
          <path
            d="M 88 18 C 88 48, 128 48, 128 18 Z"
            fill="rgba(216,185,128,0.12)"
            stroke="#FAF6EE"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M 108 48 L 108 78" stroke="#FAF6EE" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 91 78 L 125 78" stroke="#FAF6EE" strokeWidth="1.8" strokeLinecap="round" />

          <path
            d="M 92 28 Q 108 34 124 28"
            fill="none"
            stroke="#FAF6EE"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M 94 31 Q 108 37 122 31"
            fill="none"
            stroke="#FAF6EE"
            strokeWidth="1"
            strokeDasharray="1 2"
          />
        </g>

        {/* Ánh sao lóe sáng khi chạm ly */}
        <g
          transform="translate(75, 18)"
          style={{
            transformOrigin: "center",
            animation: "sparkle-burst 3.2s ease-in-out infinite",
          }}
        >
          <path
            d="M 0 -10 L 0 10 M -10 0 L 10 0 M -6 -6 L 6 6 M -6 6 L 6 -6"
            stroke="#FFF6DC"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="0" cy="0" r="2.8" fill="#FFE28A" />
        </g>
      </g>

      {/* Typography Thư Tay */}
      <text
        x={cx}
        y={cy + 18}
        textAnchor="middle"
        fill="#E8D1B0"
        fontSize="25"
        fontFamily="var(--font-script), cursive"
      >
        Cocktails
      </text>
      <text
        x={cx}
        y={cy + 36}
        textAnchor="middle"
        fill="#D8B980"
        fontSize="13"
        fontStyle="italic"
        fontFamily="var(--font-serif), serif"
      >
        &amp;
      </text>
      <text
        x={cx}
        y={cy + 60}
        textAnchor="middle"
        fill="#E8D1B0"
        fontSize="27"
        fontFamily="var(--font-script), cursive"
      >
        Sweet Love
      </text>

      {/* Mốc Thời Gian Kỷ Niệm */}
      <text
        x={cx}
        y={cy + 86}
        textAnchor="middle"
        fill="#FAF6EE"
        fontSize="8.5"
        fontWeight="bold"
        letterSpacing="0.26em"
        fontFamily="var(--font-body), sans-serif"
      >
        CELEBRATING 2 YEARS OF US
      </text>
      <text
        x={cx}
        y={cy + 102}
        textAnchor="middle"
        fill="#D8B980"
        fontSize="11"
        fontWeight="600"
        letterSpacing="0.16em"
        fontFamily="var(--font-body), sans-serif"
      >
        27.11.2022 — 27.11.2024
      </text>

      {/* Huy Hiệu 730 Ngày Yêu */}
      <g transform={`translate(${cx - 65}, ${cy + 114})`}>
        <rect
          x="0"
          y="0"
          width="130"
          height="22"
          rx="11"
          fill="#1C1A18"
          stroke="#B99A63"
          strokeWidth="1"
        />
        <text
          x="65"
          y="14.5"
          textAnchor="middle"
          fill="#FAF6EE"
          fontSize="8.5"
          fontWeight="bold"
          letterSpacing="0.2em"
          fontFamily="var(--font-body), sans-serif"
        >
          730 NGÀY BÊN NHAU
        </text>
      </g>
    </g>
  );
}
