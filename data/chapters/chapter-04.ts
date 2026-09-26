import type { StoryPhoto } from "../story";

export type ChapterFour = {
  id: string;
  nextId: string;
  title: string;
  nextTitle: string;
  cue: string;
  top: string;
  opening: {
    kicker: string;
    title: string;
    english: string;
    vietnamese: string;
  };
  engagement: {
    title: string;
    subtitle: string;
    lines: string[];
    hero: StoryPhoto;
    photos: StoryPhoto[];
    captions: string[];
    close: string[];
  };
  toWedding: {
    line: string;
    title: string;
  };
  wedding: {
    title: string;
    lines: string[];
    hero: StoryPhoto;
    preparation: {
      photos: StoryPhoto[];
      lines: string[];
    };
    ceremony: {
      before: string;
      video: string;
      still: StoryPhoto;
      after: string[];
      vow: string;
      lines: string[];
    };
    memory: {
      photos: StoryPhoto[];
      lines: string[];
    };
  };
  honeymoon: {
    title: string;
    subtitle: string;
    lead: string;
    from: StoryPhoto;
    photos: StoryPhoto[];
    lines: string[];
    moment: {
      kicker: string;
      title: string;
      lines: string[];
      photo: StoryPhoto;
    };
  };
  finale: {
    photo: StoryPhoto;
    pairs: { english: string; vietnamese: string }[];
    title: string;
    lines: string[];
    close: { english: string; vietnamese: string }[];
  };
  next: {
    kicker: string;
    title: string;
    subtitle: string;
  };
};

const shot = (note: string, rotate = 0): StoryPhoto => ({
  src: "/chapters/04/placeholder.jpg",
  alt: `Ảnh tạm, ${note}`,
  note,
  rotate,
  placeholder: true,
});

export const CHAPTER_FOUR: ChapterFour = {
  id: "04",
  nextId: "05",
  title: "THE DAY WE BECAME US",
  nextTitle: "OUR LITTLE MIRACLE",
  cue: "Cuộn tiếp",
  top: "Quay lại đầu trang",
  opening: {
    kicker: "CHAPTER 04",
    title: "THE DAY WE BECAME US",
    english:
      "After all the moments that brought us here, we finally stood together, ready to begin the most beautiful chapter of our lives.",
    vietnamese:
      "Sau tất cả những ngày tháng đã đưa chúng ta đến đây, cuối cùng chúng ta cũng đứng cạnh nhau, sẵn sàng bắt đầu một chương mới của cuộc đời.",
  },
  engagement: {
    title: "THE ENGAGEMENT",
    subtitle: "Ngày hai gia đình chính thức trở thành một.",
    lines: [
      "Trước ngày cưới, có một ngày mà mọi thứ dường như trở nên thật hơn bao giờ hết.",
      "Ngày chúng ta chính thức bước vào một chặng đường mới, không chỉ có hai chúng ta, mà còn có gia đình của cả hai bên.",
    ],
    hero: shot("Buổi lễ"),
    photos: [
      shot("Mâm quả", -6),
      shot("Áo dài", 4),
      shot("Chiếc nhẫn", -3),
      shot("Hai gia đình", 5),
      shot("Chuẩn bị", -4),
      shot("Phía sau buổi lễ", 3),
    ],
    captions: [
      "Có những ngày không cần quá nhiều lời nói.",
      "Chỉ cần nhìn nhau, chúng ta đều hiểu rằng mọi thứ đang thật sự bắt đầu.",
    ],
    close: [
      "Chúng ta không chỉ chuẩn bị cho một đám cưới.",
      "Chúng ta đang chuẩn bị cho một cuộc đời cùng nhau.",
    ],
  },
  toWedding: {
    line: "Và rồi... ngày ấy cũng đến.",
    title: "THE WEDDING",
  },
  wedding: {
    title: "THE WEDDING",
    lines: ["Sau bao nhiêu ngày chờ đợi...", "Ngày chúng ta mong chờ cuối cùng cũng đến."],
    hero: shot("Ngày cưới"),
    preparation: {
      photos: [
        shot("Váy cưới", -4),
        shot("Trang điểm", 3),
        shot("Vest", -2),
        shot("Hoa cưới", 5),
        shot("Nhẫn", -3),
        shot("Trước giờ lễ", 2),
      ],
      lines: ["Có một chút hồi hộp.", "Có một chút lo lắng.", "Có rất nhiều cảm xúc.", "Nhưng trên tất cả... là niềm hạnh phúc."],
    },
    ceremony: {
      before: "Và rồi, chúng ta đứng trước tất cả những người mình yêu thương.",
      video: "/video/wedding.mp4",
      still: shot("Lễ cưới"),
      after: [
        "Khoảnh khắc ấy, mọi thứ xung quanh dường như chậm lại.",
        "Chỉ còn em.",
        "Chỉ còn anh.",
        "Và lời hứa mà chúng ta dành cho nhau.",
      ],
      vow: "WE SAID “I DO”",
      lines: ["Và từ ngày hôm ấy...", "Chúng ta chính thức trở thành vợ chồng."],
    },
    memory: {
      photos: [
        shot("Cô dâu", -5),
        shot("Chú rể", 4),
        shot("Hai người", -2),
        shot("Trao nhẫn", 3),
        shot("Gia đình", -4),
        shot("Bạn bè", 5),
        shot("Tiệc cưới", -3),
        shot("Cuối ngày", 2),
      ],
      lines: [
        "Ngày hôm ấy có rất nhiều người.",
        "Rất nhiều lời chúc.",
        "Rất nhiều nụ cười.",
        "Nhưng điều quan trọng nhất...",
        "Là cuối ngày, chúng ta vẫn có nhau.",
      ],
    },
  },
  honeymoon: {
    title: "OUR HONEYMOON",
    subtitle: "Chuyến đi đầu tiên của hai vợ chồng.",
    lead: "Sau tất cả những ngày chuẩn bị, cuối cùng chúng ta cũng có một khoảng thời gian chỉ dành cho nhau.",
    from: shot("Ngày cưới"),
    photos: [
      shot("Hành lý", -4),
      shot("Sân bay", 3),
      shot("Trên máy bay", -2),
      shot("Đường đi", 4),
      shot("Khách sạn", -3),
      shot("Một bữa ăn", 2),
      shot("Đi chơi", -5),
      shot("Selfie", 3),
    ],
    lines: [
      "Không còn lịch trình đám cưới.",
      "Không còn những việc phải chuẩn bị.",
      "Chỉ còn hai đứa.",
      "Cùng nhau đi đến một nơi mới.",
      "Cùng ăn những món mới.",
      "Cùng chụp thật nhiều ảnh.",
      "Và cùng tạo thêm những kỷ niệm mà sau này chúng ta sẽ nhớ.",
    ],
    moment: {
      kicker: "OUR FIRST ADVENTURE AS HUSBAND & WIFE",
      title: "JUST YOU AND ME",
      lines: [
        "Có lẽ hạnh phúc đôi khi chỉ đơn giản như vậy.",
        "Có một người bên cạnh.",
        "Có một nơi để cùng đi.",
        "Và có thật nhiều ngày phía trước để cùng nhau sống.",
      ],
      photo: shot("Tuần trăng mật"),
    },
  },
  finale: {
    photo: shot("Ảnh cưới"),
    pairs: [
      {
        english: "We started as two people who happened to meet.",
        vietnamese: "Chúng ta bắt đầu chỉ là hai người tình cờ gặp nhau.",
      },
      {
        english: "We became two people who chose each other.",
        vietnamese: "Rồi trở thành hai người lựa chọn ở bên nhau.",
      },
      { english: "And now...", vietnamese: "Và bây giờ..." },
    ],
    title: "HUSBAND & WIFE",
    lines: ["Ngày cưới là một ngày.", "Nhưng cuộc hôn nhân là cả một hành trình."],
    close: [
      { english: "We had our wedding.", vietnamese: "Chúng ta đã có một đám cưới." },
      {
        english: "But our story was only beginning.",
        vietnamese: "Nhưng câu chuyện của chúng ta... chỉ vừa mới bắt đầu.",
      },
    ],
  },
  next: {
    kicker: "CHAPTER 05",
    title: "OUR LITTLE MIRACLE",
    subtitle: "Từ một nhịp tim nhỏ, câu chuyện của chúng ta lớn hơn hai người.",
  },
};
