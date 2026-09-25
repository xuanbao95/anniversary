import type { StoryPhoto } from "../story";

export type ChapterTwo = {
  id: string;
  nextId: string;
  title: string;
  nextTitle: string;
  cue: string;
  top: string;
  somewhere: {
    title: string;
    lines: string[];
    punch: string;
    photo: StoryPhoto;
  };
  dates: {
    title: string;
    lines: string[];
    punch: string;
    photos: StoryPhoto[];
  };
  trips: {
    title: string;
    lines: string[];
    punch: string;
    photos: StoryPhoto[];
  };
  dinner: {
    title: string;
    lines: string[];
    punch: string[];
    photo: StoryPhoto;
  };
  movies: {
    title: string;
    lines: string[];
    punch: string;
    photo: StoryPhoto;
  };
  imperfect: {
    title: string;
    lines: string[];
    question: string;
    photo: StoryPhoto;
  };
  stayed: {
    title: string;
    lines: string[];
    holds: string[];
    photo: StoryPhoto;
  };
  learning: {
    title: string;
    lines: string[];
    punch: string;
    photo: StoryPhoto;
  };
  memories: {
    title: string;
    lines: string[];
    punches: string[];
    photos: StoryPhoto[];
  };
  somehow: {
    title: string;
    lines: string[];
    punch: string[];
    quotes: string[];
  };
};

const place = (src: string, alt: string, note?: string, rotate?: number): StoryPhoto => ({
  src,
  alt,
  note,
  rotate,
  placeholder: true,
});

export const CHAPTER_TWO: ChapterTwo = {
  id: "02",
  nextId: "03",
  title: "Falling in Love",
  nextTitle: "The Day We Said Yes",
  cue: "Cuộn tiếp",
  top: "Quay lại đầu trang",
  somewhere: {
    title: "Somewhere along the Way",
    lines: [
      "Sau chuyến đi ấy, chúng ta bắt đầu nói chuyện với nhau nhiều hơn.",
      "Rồi những cuộc trò chuyện cứ dài thêm một chút.",
      "Một buổi hẹn.",
      "Một bữa ăn.",
      "Một bộ phim.",
      "Một chuyến đi.",
      "Và rồi chẳng biết từ lúc nào...",
    ],
    punch: "em trở thành một phần trong những ngày bình thường của anh.",
    photo: place("/chapters/02/somewhere.jpg", "Ảnh tạm, những ngày bắt đầu nói chuyện nhiều hơn"),
  },
  dates: {
    title: "Our First Dates",
    lines: [
      "Những buổi hẹn đầu tiên chẳng cần phải thật đặc biệt.",
      "Chỉ cần có em.",
      "Có khi là một quán ăn nhỏ.",
      "Có khi chỉ là ngồi cạnh nhau uống một ly nước.",
      "Có những buổi chẳng biết đi đâu...",
      "Nhưng cuối cùng vẫn cứ đi.",
      "Và điều anh thích nhất không phải là chúng ta đã đi đâu,",
      "mà là...",
    ],
    punch: "anh được đi cùng em.",
    photos: [
      place("/chapters/02/first-dates-1.jpg", "Ảnh tạm, buổi hẹn đầu", "Chỉ cần có em.", -6),
      place("/chapters/02/first-dates-2.jpg", "Ảnh tạm, một quán nhỏ", "Một quán ăn nhỏ.", 4),
      place("/chapters/02/first-dates-3.jpg", "Ảnh tạm, ngồi cạnh nhau", "Ngồi cạnh nhau.", -2),
    ],
  },
  trips: {
    title: "Let's Go Somewhere",
    lines: [
      "Rồi chúng ta bắt đầu có những chuyến đi cùng nhau.",
      "Lần đầu cùng nhau khám phá một nơi mới.",
      "Cùng chụp những bức ảnh ngốc nghếch.",
      "Cùng ăn những món chưa từng thử.",
      "Cùng ngắm cảnh. Cùng mệt. Cùng cười.",
      "Và có những khoảnh khắc chẳng cần nói gì...",
      "chỉ cần đứng cạnh nhau là đủ.",
      "Mỗi chuyến đi lại thêm một chút kỷ niệm.",
      "Và mỗi kỷ niệm lại khiến anh nhận ra...",
    ],
    punch: "anh muốn có thêm thật nhiều chuyến đi như thế với em.",
    photos: [
      place("/chapters/02/lets-go-1.jpg", "Ảnh tạm, một nơi mới"),
      place("/chapters/02/lets-go-2.jpg", "Ảnh tạm, trên đường cùng nhau"),
      place("/chapters/02/lets-go-3.jpg", "Ảnh tạm, một món chưa từng thử"),
      place("/chapters/02/lets-go-4.jpg", "Ảnh tạm, đứng cạnh nhau"),
    ],
  },
  dinner: {
    title: "Dinner for Two",
    lines: [
      "Có những ngày chúng ta chẳng đi đâu xa.",
      "Chỉ là một bữa ăn sau giờ làm.",
      "Một quán quen.",
      "Một món ăn yêu thích.",
      "Hai đứa ngồi đối diện nhau và kể đủ thứ chuyện trên đời.",
      "Những chuyện chẳng quan trọng.",
      "Những câu chuyện chẳng ai khác muốn nghe.",
      "Nhưng chúng ta vẫn kể.",
      "Và chúng ta vẫn nghe.",
      "Có lẽ tình yêu cũng lớn lên từ những điều rất nhỏ như thế.",
    ],
    punch: ["Một bữa ăn bình thường.", "Nhưng có đúng người ngồi đối diện."],
    photo: place("/chapters/02/dinner.jpg", "Ảnh tạm, một bữa ăn hai người"),
  },
  movies: {
    title: "Movie Nights",
    lines: [
      "Rồi những buổi đi xem phim.",
      "Đèn tắt.",
      "Màn hình sáng lên.",
      "Cả hai cùng im lặng...",
      "nhưng đôi khi anh lại chẳng nhớ bộ phim nói về gì.",
      "Vì điều anh nhớ hơn...",
      "là người ngồi bên cạnh mình.",
      "Có những lúc chúng ta cùng cười.",
      "Có lúc em sợ rồi nắm lấy tay anh.",
      "Có lúc hai đứa tranh nhau xem phim gì.",
      "Những chuyện rất nhỏ.",
      "Nhưng bây giờ nhìn lại...",
    ],
    punch: "đó lại là những ký ức anh muốn giữ mãi.",
    photo: place("/chapters/02/movie.jpg", "Ảnh tạm, một buổi xem phim"),
  },
  imperfect: {
    title: "Not Every Day Was Perfect",
    lines: [
      "Nhưng...",
      "chuyện tình của chúng ta cũng đâu phải lúc nào cũng đẹp.",
      "Chúng ta đã từng cãi nhau.",
      "Từng giận nhau.",
      "Từng có những lúc cả hai đều nghĩ rằng mình đúng.",
      "Có những cuộc tranh luận bắt đầu từ một chuyện rất nhỏ...",
      "rồi chẳng hiểu sao lại trở thành một cuộc chiến rất lớn.",
      "Có những ngày không ai muốn nói chuyện với ai.",
      "Có những tin nhắn được viết ra...",
      "rồi lại xóa đi.",
      "Có những lần chúng ta khiến nhau buồn.",
      "Và cũng có những lúc anh tự hỏi:",
    ],
    question: "Tại sao yêu nhau lại khó đến vậy?",
    photo: place("/chapters/02/not-perfect.jpg", "Ảnh tạm, một ngày không đẹp"),
  },
  stayed: {
    title: "But We Stayed",
    lines: [
      "Nhưng rồi sau mỗi lần giận...",
      "chúng ta lại tìm cách nói chuyện.",
      "Sau mỗi lần tổn thương...",
      "chúng ta lại học cách hiểu nhau hơn.",
      "Anh hiểu em thêm một chút.",
      "Em hiểu anh thêm một chút.",
      "Chúng ta bắt đầu biết rằng...",
      "yêu một người không có nghĩa là hai người sẽ luôn đồng ý với nhau.",
      "Mà là dù có những lúc không hiểu nhau...",
    ],
    holds: ["vẫn muốn hiểu nhau.", "vẫn muốn quay lại."],
    photo: place("/chapters/02/we-stayed.jpg", "Ảnh tạm, sau một lần làm hòa"),
  },
  learning: {
    title: "We Were Learning",
    lines: [
      "Chúng ta không phải một cặp đôi hoàn hảo.",
      "Chúng ta chỉ là hai người bình thường...",
      "đang học cách yêu một người khác ngoài chính mình.",
      "Học cách nhường nhịn.",
      "Học cách xin lỗi.",
      "Học cách nói ra điều mình nghĩ.",
      "Học cách lắng nghe.",
      "Và quan trọng nhất...",
    ],
    punch: "học cách cùng nhau trưởng thành.",
    photo: place("/chapters/02/learning.jpg", "Ảnh tạm, hai người đang học cách ở bên nhau"),
  },
  memories: {
    title: "All the Little Memories",
    lines: [
      "Nhìn lại khoảng thời gian ấy...",
      "Anh không nhớ chính xác chúng ta đã đi bao nhiêu nơi.",
      "Ăn bao nhiêu bữa.",
      "Xem bao nhiêu bộ phim.",
      "Hay đã cãi nhau bao nhiêu lần.",
      "Anh chỉ nhớ rằng...",
    ],
    punches: ["chúng ta đã có rất nhiều ngày bên nhau.", "Câu chuyện của chúng ta."],
    photos: [
      place("/chapters/02/little-memories-1.jpg", "Ảnh tạm, một ngày rất vui", undefined, -6),
      place("/chapters/02/little-memories-2.jpg", "Ảnh tạm, một ngày rất bình thường", undefined, 5),
      place("/chapters/02/little-memories-3.jpg", "Ảnh tạm, một ngày chẳng vui", undefined, -3),
    ],
  },
  somehow: {
    title: "And Somehow...",
    lines: [
      "Giữa những buổi hẹn.",
      "Những chuyến đi.",
      "Những bữa ăn.",
      "Những bộ phim.",
      "Những tiếng cười.",
      "Những lần giận nhau.",
      "Những lần làm hòa.",
      "Chúng ta đã từng chút một...",
      "trở thành “chúng ta”.",
      "Và có lẽ đó mới là điều đẹp nhất.",
      "Không phải vì mọi ngày đều hoàn hảo.",
      "Mà vì...",
    ],
    punch: ["dù ngày hôm đó vui hay buồn,", "chúng ta vẫn ở bên nhau."],
    quotes: ["We didn't just fall in love.", "We learned how to love each other."],
  },
};
