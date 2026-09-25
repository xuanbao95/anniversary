import type { StoryPhoto } from "../story";

export type ChapterThree = {
  id: string;
  nextId: string;
  title: string;
  nextTitle: string;
  cue: string;
  top: string;
  video: string;
  opening: {
    kicker: string;
    title: string;
    lines: string[];
  };
  question: string[];
  moment: string;
  still: string[];
  ask: {
    line: string;
    aside: string;
  };
  yes: {
    line: string;
    word: string;
    forever: string;
    photo: StoryPhoto;
  };
  after: {
    lines: string[];
    photos: StoryPhoto[];
  };
  ending: {
    lines: string[];
    nextLine: string;
  };
};

const place = (src: string, alt: string, note: string, rotate: number): StoryPhoto => ({
  src,
  alt,
  note,
  rotate,
  placeholder: true,
});

export const CHAPTER_THREE: ChapterThree = {
  id: "03",
  nextId: "04",
  title: "Ngày chúng ta nói có",
  nextTitle: "THE DAY WE BECAME US",
  cue: "Cuộn tiếp",
  top: "Quay lại đầu trang",
  video: "/video/proposal.mp4",
  opening: {
    kicker: "Chương 03",
    title: "The Day I Asked You",
    lines: [
      "Sau mọi chuyến đi, mọi tiếng cười, mọi lần cãi nhau nhỏ,",
      "anh biết chỉ có một người",
      "anh muốn được ở bên mãi mãi.",
    ],
  },
  question: ["Có một điều anh đã muốn hỏi em từ lâu...", "Một câu hỏi sẽ đổi cả mọi thứ."],
  moment: "Khoảnh khắc anh hỏi em",
  still: ["Người khác có thể tốt hơn anh, nhưng chưa chắc họ sẽ cho Em tất cả những gì họ có.",
     "Còn anh", "Có thể không tốt bằng người khác",
      "Nhưng anh sẽ cho e tất cả những gì anh có."],
  ask: {
    line: "Em làm vợ anh nhé?",
    aside: "Và không hiểu sao, em đã nói có.",
  },
  yes: {
    line: "Một chữ ấy trở thành khởi đầu của mãi mãi.",
    word: "Có.",
    forever: "Mãi mãi của chúng ta",
    photo: place("/chapters/03/after.jpg", "Ảnh tạm, khoảnh khắc sau lời cầu hôn", "Sau lời ấy", -2),
  },
  after: {
    lines: ["Chúng ta chưa biết tương lai sẽ ra sao.", "Nhưng chúng ta biết mình muốn đối mặt cùng ai."],
    photos: [
      place("/chapters/03/embrace.jpg", "Ảnh tạm, hai người ôm nhau", "Ôm nhau", -4),
      place("/chapters/03/ring.jpg", "Ảnh tạm, chiếc nhẫn", "Chiếc nhẫn", 3),
      place("/chapters/03/laugh.jpg", "Ảnh tạm, khoảnh khắc cười", "Nụ cười", -2),
      place("/chapters/03/together.jpg", "Ảnh tạm, chụp cùng nhau", "Cùng nhau", 4),
      place("/chapters/03/after.jpg", "Ảnh tạm, ngay sau lời cầu hôn", "Ngay sau đó", -3),
    ],
  },
  ending: {
    lines: ["Anh đã hỏi em ở bên anh mãi mãi.", "Và em đã nói có."],
    nextLine: "Rồi từ đó, mãi mãi trở thành những ngày thường.",
  },
};
