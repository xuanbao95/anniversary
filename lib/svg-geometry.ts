// Hàm vẽ đường cong Arc chính xác bằng SVG
export function createArcPath(
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  startDeg: number,
  endDeg: number
): string {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const sRad = toRad(startDeg);
  const eRad = toRad(endDeg);

  const x1 = cx + rOuter * Math.cos(sRad);
  const y1 = cy + rOuter * Math.sin(sRad);
  const x2 = cx + rOuter * Math.cos(eRad);
  const y2 = cy + rOuter * Math.sin(eRad);

  const x3 = cx + rInner * Math.cos(eRad);
  const y3 = cy + rInner * Math.sin(eRad);
  const x4 = cx + rInner * Math.cos(sRad);
  const y4 = cy + rInner * Math.sin(sRad);

  return `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 0 0 ${x4} ${y4} Z`;
}

// Hàm tính toán vị trí và góc xoay cho nhãn dán
export function getBadgePosition(
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  startDeg: number,
  endDeg: number
): { x: number; y: number; rotate: number } {
  const midDeg = (startDeg + endDeg) / 2;
  const midRad = (midDeg * Math.PI) / 180;
  const rMid = (rOuter + rInner) / 2;

  const x = cx + rMid * Math.cos(midRad);
  const y = cy + rMid * Math.sin(midRad);
  const rotate = midDeg + 90;

  return { x, y, rotate };
}
