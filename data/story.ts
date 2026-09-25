export type StoryPhoto = {
  src: string;
  alt: string;
  /** Ghi chú viết tay trên Polaroid. */
  note?: string;
  rotate?: number;
  /**
   * Ảnh tạm. Đổi file cùng tên trong `public/chapters` khi có ảnh thật.
   */
  placeholder?: boolean;
};
