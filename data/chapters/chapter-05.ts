import type { StoryPhoto } from "../story";

export type ChapterMonth = {
  label: string;
  note: string;
  ultrasound: boolean;
  photos: StoryPhoto[];
};

export type ChapterMilestone = {
  title: string;
  line: string;
  photo?: StoryPhoto;
};

export type ChapterFive = {
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
    lead: string;
    line: string;
    video: string;
    still: StoryPhoto;
    captions: string[];
  };
  sign: {
    title: string;
    lines: string[];
    photo: StoryPhoto;
    english: string[];
    vietnamese: string[];
  };
  waiting: {
    title: string;
    months: ChapterMonth[];
  };
  milestones: ChapterMilestone[];
  counting: {
    title: string;
    lines: string[];
    photo: StoryPhoto;
    meetInDays: number | null;
  };
  birth: {
    title: string;
    arrive: string[];
    before: string[];
    video: string;
    still: StoryPhoto;
    quiet: string[];
    cry: string;
    photo: StoryPhoto;
    hello: string;
    welcome: string[];
  };
  firstMoment: {
    hero: StoryPhoto;
    photos: StoryPhoto[];
    captions: string[];
    close: string[];
  };
  firstDays: {
    title: string;
    photos: StoryPhoto[];
    lines: string[];
  };
  growth: {
    title: string;
    milestones: { label: string; age: string; note: string; photo?: StoryPhoto }[];
  };
  wall: {
    photos: StoryPhoto[];
    lines: string[];
  };
  today: {
    title: string;
    when: string;
    hero: StoryPhoto;
    photos: StoryPhoto[];
    lines: string[];
  };
  family: {
    photo: StoryPhoto;
    lines: string[];
    title: string;
    after: string[];
  };
  letter: {
    title: string;
    lines: string[];
  };
  ending: {
    photo: StoryPhoto;
    title: string;
    line: string;
  };
  next: {
    kicker: string;
    title: string;
    subtitle: string;
  };
};

const shot = (note: string, rotate = 0): StoryPhoto => ({
  src: "/chapters/05/placeholder.jpg",
  alt: `Ảnh tạm, ${note}`,
  note,
  rotate,
  placeholder: true,
});

export const CHAPTER_FIVE: ChapterFive = {
  id: "05",
  nextId: "06",
  title: "OUR LITTLE MIRACLE",
  nextTitle: "THE LITTLE THINGS",
  cue: "Cuộn tiếp",
  top: "Quay lại đầu trang",
  opening: {
    kicker: "CHAPTER 05",
    title: "OUR LITTLE MIRACLE",
    english:
      "From the moment we heard there was a little heartbeat inside you, our story became bigger than just the two of us.",
    lead: "Có một ngày...",
    line: "Ngày chúng ta nhận ra gia đình nhỏ của mình sắp có thêm một thành viên.",
    video: "/video/pregnancy-news.mp4",
    still: shot("Lúc mới biết có thai"),
    captions: [
      "Lúc ấy, chúng ta vẫn chưa biết cuộc sống phía trước sẽ thay đổi như thế nào.",
      "Chỉ biết rằng...",
      "Có một điều kỳ diệu đang đến với chúng ta.",
    ],
  },
  sign: {
    title: "THE FIRST LITTLE SIGN",
    lines: [
      "Ngày biết tin có em bé, mọi thứ xung quanh vẫn giống như một ngày bình thường.",
      "Nhưng đối với chúng ta, từ khoảnh khắc ấy... chẳng có gì còn bình thường nữa.",
    ],
    photo: shot("Hai vạch"),
    english: ["Two lines.", "Two little lines that changed everything."],
    vietnamese: ["Chỉ hai vạch nhỏ thôi.", "Nhưng đủ để thay đổi cả cuộc đời của chúng ta."],
  },
  waiting: {
    title: "WAITING FOR YOU",
    months: [
      {
        label: "MONTH 01",
        note: "Tháng đầu tiên — chúng ta vẫn còn chưa quen với việc gọi em là em bé.",
        ultrasound: true,
        photos: [shot("Siêu âm tháng đầu")],
      },
      {
        label: "MONTH 02",
        note: "Tháng thứ hai — ngày vẫn như mọi ngày, chỉ lòng đã khác.",
        ultrasound: false,
        photos: [],
      },
      {
        label: "MONTH 03",
        note: "Tháng thứ ba — lần đầu nhìn thấy em rõ hơn trên màn hình.",
        ultrasound: true,
        photos: [shot("Siêu âm tháng ba")],
      },
      {
        label: "MONTH 04",
        note: "Tháng thứ tư — những lần đi khám, và những bữa mẹ thèm.",
        ultrasound: false,
        photos: [shot("Một bữa ăn", -3)],
      },
      {
        label: "MONTH 05",
        note: "Tháng thứ năm — nhịp tim nhỏ hiện rõ hơn trên màn hình.",
        ultrasound: true,
        photos: [shot("Siêu âm tháng năm")],
      },
      {
        label: "MONTH 06",
        note: "Tháng thứ sáu — chiếc bụng của mẹ đã lớn hơn rất nhiều.",
        ultrasound: false,
        photos: [shot("Bụng bầu", 2)],
      },
      {
        label: "MONTH 07",
        note: "Tháng thứ bảy — bố ngồi nói chuyện với em, bụng đã tròn hơn.",
        ultrasound: true,
        photos: [shot("Siêu âm tháng bảy")],
      },
      {
        label: "MONTH 08",
        note: "Tháng thứ tám — quần áo nhỏ và một góc trong nhà đang chờ em.",
        ultrasound: false,
        photos: [shot("Đồ cho em bé", -2), shot("Góc nhỏ", 3)],
      },
      {
        label: "MONTH 09",
        note: "Tháng thứ chín — chỉ còn một chút nữa thôi... chúng ta sẽ được gặp em.",
        ultrasound: true,
        photos: [shot("Siêu âm tháng chín")],
      },
    ],
  },
  milestones: [
    { title: "FIRST ULTRASOUND", line: "Lần đầu tiên nhìn thấy con.", photo: shot("Siêu âm đầu tiên", -4) },
    { title: "FIRST HEARTBEAT", line: "Lần đầu nghe thấy trái tim nhỏ bé ấy.", photo: shot("Nhịp tim", 3) },
    { title: "FIRST KICK", line: "Lần đầu mẹ cảm nhận được con đang cử động.", photo: shot("Cử động đầu", -2) },
    { title: "BABY IS GROWING", line: "Con lớn lên từng ngày.", photo: shot("Con lớn dần", 4) },
    { title: "ALMOST TIME", line: "Và rồi... ngày chúng ta gặp nhau cũng gần đến." },
  ],
  counting: {
    title: "COUNTING THE DAYS",
    lines: [
      "Chúng ta bắt đầu đếm từng ngày.",
      "Đếm từng tuần.",
      "Đếm từng lần con lớn thêm một chút.",
      "Và cũng đếm từng ngày để được nhìn thấy khuôn mặt của con.",
    ],
    photo: shot("Đếm ngày"),
    meetInDays: null,
  },
  birth: {
    title: "THE DAY WE MET YOU",
    arrive: ["Và rồi...", "Ngày ấy cũng đến."],
    before: [
      "Có một chút lo lắng.",
      "Có một chút hồi hộp.",
      "Có rất nhiều cảm xúc mà chúng ta không thể gọi tên.",
      "Nhưng trên tất cả...",
      "Chúng ta biết rằng chỉ còn một chút nữa thôi.",
    ],
    video: "/video/birth.mp4",
    still: shot("Đường đến bệnh viện"),
    quiet: ["Everything went quiet.", "Then...", "A tiny cry."],
    cry: "Rồi chúng ta nghe thấy tiếng khóc đầu tiên của con.",
    photo: shot("Ảnh đầu tiên của con"),
    hello: "HELLO, LITTLE ONE",
    welcome: ["Chào mừng con đến với thế giới.", "Chào mừng con đến với gia đình của chúng ta."],
  },
  firstMoment: {
    hero: shot("Lần đầu gặp con"),
    photos: [
      shot("Bàn tay nhỏ", -5),
      shot("Bàn chân", 4),
      shot("Khuôn mặt", -2),
      shot("Mẹ ôm con", 3),
      shot("Bố ôm con", -3),
      shot("Gia đình", 2),
    ],
    captions: [
      "Lần đầu nhìn thấy con.",
      "Lần đầu được chạm vào bàn tay nhỏ xíu ấy.",
      "Lần đầu được gọi mình là bố.",
      "Lần đầu được gọi mình là mẹ.",
    ],
    close: ["Có những khoảnh khắc chỉ xảy ra một lần.", "Và chúng ta sẽ nhớ khoảnh khắc này cả đời."],
  },
  firstDays: {
    title: "THE FIRST DAYS",
    photos: [
      shot("Ngày đầu", -4),
      shot("Ngủ", 3),
      shot("Ăn", -2),
      shot("Tắm", 4),
      shot("Bế con", -3),
      shot("Nụ cười", 2),
    ],
    lines: [
      "Những ngày đầu tiên không phải lúc nào cũng dễ dàng.",
      "Có những đêm rất dài.",
      "Có những ngày cả hai đều mệt.",
      "Có những lúc chẳng biết mình đang làm đúng hay không.",
      "Nhưng chỉ cần nhìn con...",
      "mọi thứ lại trở nên đáng giá.",
    ],
  },
  growth: {
    title: "WATCHING YOU GROW",
    milestones: [
      { label: "NEWBORN", age: "Những ngày đầu", note: "Con nhỏ đến mức cả bàn tay bố cũng rộng hơn người con.", photo: shot("Sơ sinh", -3) },
      { label: "1 MONTH", age: "Một tháng", note: "Con bắt đầu nhìn theo giọng của mẹ.", photo: shot("Một tháng", 2) },
      { label: "3 MONTHS", age: "Ba tháng", note: "Nụ cười ấy không còn là vô tình nữa.", photo: shot("Ba tháng", -2) },
      { label: "6 MONTHS", age: "Sáu tháng", note: "Con đã biết với tay về phía chúng ta.", photo: shot("Sáu tháng", 3) },
      { label: "9 MONTHS", age: "Chín tháng", note: "Con bò khắp nhà, và nhà trở nên nhỏ hơn." },
      { label: "1 YEAR", age: "Một tuổi", note: "Một vòng quanh mặt trời, cùng con.", photo: shot("Một tuổi", -4) },
      { label: "TODAY", age: "Hôm nay", note: "Con vẫn đang lớn, và chúng ta vẫn đang học.", photo: shot("Hôm nay", 2) },
    ],
  },
  wall: {
    photos: [
      shot("Con ngủ", -6),
      shot("Con cười", 4),
      shot("Con ăn", -3),
      shot("Con chơi", 5),
      shot("Đi chơi", -2),
      shot("Chuyến đi", 3),
      shot("Một ngày lễ", -4),
      shot("Sinh nhật", 2),
      shot("Cả nhà", -3),
      shot("Một buổi bình thường", 4),
    ],
    lines: [
      "Những ngày đầu tiên.",
      "Những bước đi đầu tiên.",
      "Những nụ cười đầu tiên.",
      "Những điều rất nhỏ...",
      "Nhưng đối với chúng ta, tất cả đều rất lớn.",
    ],
  },
  today: {
    title: "TODAY",
    when: "Hôm nay",
    hero: shot("Chúng ta hôm nay"),
    photos: [shot("Bên mẹ", -4), shot("Bên bố", 3), shot("Cả ba", -2), shot("Một góc nhà", 4)],
    lines: ["Và đây là chúng ta của ngày hôm nay.", "Không còn là hai người.", "Mà là một gia đình."],
  },
  family: {
    photo: shot("Gia đình"),
    lines: [
      "Ngày con đến...",
      "chúng ta không chỉ có thêm một thành viên.",
      "Chúng ta có thêm một lý do để yêu cuộc sống này nhiều hơn.",
    ],
    title: "OUR LITTLE FAMILY",
    after: [
      "Con đến và khiến ngôi nhà của chúng ta có thêm tiếng cười.",
      "Có thêm những đêm mất ngủ.",
      "Có thêm rất nhiều điều phải học.",
      "Nhưng cũng có thêm một tình yêu mà trước đây chúng ta chưa từng biết đến.",
    ],
  },
  letter: {
    title: "TO OUR LITTLE ONE",
    lines: [
      "Con có thể chưa hiểu những điều này hôm nay.",
      "Nhưng khi con lớn lên, chúng ta muốn con biết rằng...",
      "Con đã được yêu thương từ rất lâu trước khi chúng ta được nhìn thấy khuôn mặt con.",
      "Con là một phần rất đẹp trong câu chuyện của bố và mẹ.",
      "Và từ ngày con xuất hiện...",
      "câu chuyện ấy đã trở thành một câu chuyện hoàn toàn khác.",
    ],
  },
  ending: {
    photo: shot("Cả gia đình"),
    title: "YOU MADE US A FAMILY",
    line: "Cảm ơn con vì đã đến.",
  },
  next: {
    kicker: "CHAPTER 06",
    title: "THE LITTLE THINGS",
    subtitle: "Và rồi, hạnh phúc nằm trong những điều rất nhỏ mỗi ngày.",
  },
};
