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
  title: "The Day We Said Yes",
  nextTitle: "Life Together",
  cue: "Cuộn tiếp",
  top: "Quay lại đầu trang",
  video: "/chapters/03/proposal.mp4",
  opening: {
    kicker: "Chapter 03",
    title: "The Day I Asked You",
    lines: [
      "After every journey, every laugh, every little fight,",
      "I knew there was only one person",
      "I wanted beside me forever.",
    ],
  },
  question: ["There was something I had been wanting to ask you...", "A question that would change everything."],
  moment: "The Moment I Asked You",
  still: ["For a moment, everything stood still.", "Just you.", "Just me.", "And one question."],
  ask: {
    line: "WILL YOU MARRY ME?",
    aside: "And somehow, you said yes.",
  },
  yes: {
    line: "That single word became the beginning of our forever.",
    word: "YES.",
    forever: "Our Forever",
    photo: place("/chapters/03/after.jpg", "Ảnh tạm, khoảnh khắc sau lời cầu hôn", "Sau lời ấy", -2),
  },
  after: {
    lines: ["We had no idea what the future would look like.", "But we knew who we wanted to face it with."],
    photos: [
      place("/chapters/03/embrace.jpg", "Ảnh tạm, hai người ôm nhau", "Ôm nhau", -4),
      place("/chapters/03/ring.jpg", "Ảnh tạm, chiếc nhẫn", "Chiếc nhẫn", 3),
      place("/chapters/03/laugh.jpg", "Ảnh tạm, khoảnh khắc cười", "Nụ cười", -2),
      place("/chapters/03/together.jpg", "Ảnh tạm, chụp cùng nhau", "Cùng nhau", 4),
      place("/chapters/03/after.jpg", "Ảnh tạm, ngay sau lời cầu hôn", "Ngay sau đó", -3),
    ],
  },
  ending: {
    lines: ["I asked you to be my forever.", "And you said yes."],
    nextLine: "And then, forever became our everyday.",
  },
};
