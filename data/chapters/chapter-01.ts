import type { StoryPhoto } from "../story";

export type ChapterOne = {
  id: string;
  nextId: string;
  title: string;
  nextTitle: string;
  period: string;
  notice: {
    kicker: string;
    title: string;
    subtitle: string;
    photo: StoryPhoto;
    coworker: string;
    impression: string;
  };
  ordinary: {
    photos: StoryPhoto[];
  };
  trip: {
    title: string;
    subtitle: string;
    period: string;
    photos: StoryPhoto[];
  };
  bus: {
    lines: string[];
    photo: StoryPhoto;
    window: StoryPhoto;
  };
  moment: {
    lines: string[];
    photo: StoryPhoto;
  };
  realization: {
    lead: string;
    lines: string[];
    bridge: string;
    handwritten: string;
    photos: StoryPhoto[];
  };
  ending: {
    title: string;
    lines: string[];
    final: string;
    cue: string;
    top: string;
  };
};

export const CHAPTER_ONE: ChapterOne = {
  id: "01",
  nextId: "02",
  title: "Ngày anh để ý em",
  nextTitle: "Falling in Love",
  period: "Những ngày ở bưu điện",
  notice: {
    kicker: "01",
    title: "Ngày anh để ý em",
    subtitle: "Đôi khi tình yêu bắt đầu chỉ từ một ấn tượng đầu tiên.",
    photo: {
      src: "/chapters/01/notice.jpg",
      alt: "Ảnh tạm cho những ngày cùng làm ở bưu điện",
    },
    coworker: "Hồi ấy, mình chỉ là hai người cùng làm ở một bưu điện.",
    impression: "Anh chưa biết điều gì sẽ đến... Anh chỉ thấy em dễ thương.",
  },
  ordinary: {
    photos: [
      {
        src: "/chapters/01/ordinary-1.jpg",
        alt: "Ảnh tạm, một ngày làm việc",
        note: "Cùng một chỗ.",
        rotate: -6,
      },
      {
        src: "/chapters/01/ordinary-2.jpg",
        alt: "Ảnh tạm, nhịp ngày thường",
        note: "Cùng một nhịp mỗi ngày.",
        rotate: 4,
      },
      {
        src: "/chapters/01/ordinary-3.jpg",
        alt: "Ảnh tạm, lúc anh bắt đầu để ý",
        note: "Mà không hiểu sao, anh bắt đầu để ý em.",
        rotate: -2,
      },
    ],
  },
  trip: {
    title: "Company Trip",
    subtitle: "Rồi một chuyến đi đổi tất cả.",
    period: "Một chuyến đi",
    photos: [
      { src: "/chapters/01/company-trip-1.jpg", alt: "Ảnh tạm, cả nhóm đi cùng" },
      { src: "/chapters/01/company-trip-2.jpg", alt: "Ảnh tạm, trên đường" },
      { src: "/chapters/01/company-trip-3.jpg", alt: "Ảnh tạm, nơi chuyến đi dừng lại" },
      { src: "/chapters/01/company-trip-4.jpg", alt: "Ảnh tạm, hai người trong chuyến đi" },
    ],
  },
  bus: {
    lines: [
      "Anh vẫn nhớ chuyến xe ấy.",
      "Em mệt...",
      "Rồi không hiểu sao, em gối đầu lên vai anh.",
    ],
    photo: {
      src: "/chapters/01/bus.jpg",
      alt: "Khung tạm cho khoảnh khắc trên xe. Đổi file bus.jpg khi có ảnh thật.",
      placeholder: true,
    },
    window: {
      src: "/chapters/01/bus-window.jpg",
      alt: "",
    },
  },
  moment: {
    lines: [
      "Anh ngồi yên.",
      "Anh không muốn đánh thức em.",
      "Anh không biết chính xác từ lúc nào...",
      "...nhưng anh nghĩ đó là khoảnh khắc anh đổ em.",
    ],
    photo: {
      src: "/chapters/01/shoulder.jpg",
      alt: "Khung tạm cho khoảnh khắc anh ngồi yên. Đổi file shoulder.jpg khi có ảnh thật.",
      placeholder: true,
    },
  },
  realization: {
    lead: "Sau chuyến đi ấy, em không còn chỉ là đồng nghiệp.",
    lines: [
      "Anh bắt đầu tìm em.",
      "Anh bắt đầu chờ được gặp em.",
      "Anh bắt đầu nhớ những điều nhỏ.",
    ],
    bridge: "Và đâu đó giữa những ngày rất đỗi bình thường...",
    handwritten: "Anh đổ em.",
    photos: [
      { src: "/chapters/01/after-1.jpg", alt: "Ảnh tạm sau chuyến đi", rotate: -7 },
      { src: "/chapters/01/after-2.jpg", alt: "Ảnh tạm, một ngày rất thường", rotate: 5 },
      { src: "/chapters/01/after-3.jpg", alt: "Ảnh tạm, điều nhỏ anh nhớ", rotate: -3 },
    ],
  },
  ending: {
    title: "Khoảnh khắc anh đổ em",
    lines: [
      "Có lẽ tình yêu không phải lúc nào cũng bắt đầu từ điều lớn.",
      "Đôi khi, nó bắt đầu từ một nụ cười...",
      "Một chuyến đi...",
      "Một khoảnh khắc rất khẽ...",
    ],
    final: "Hay chỉ là em gối đầu lên vai anh.",
    cue: "Cuộn tiếp",
    top: "Quay lại đầu trang",
  },
};
