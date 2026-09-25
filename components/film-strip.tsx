import { FILM_FRAMES } from "@/data/film-frames";

type FilmStripProps = {
  isPaused: boolean;
};

const FRAME_POSES = [
  "translateY(0.00px) rotate(7.16deg)",
  "translateY(28.21px) rotate(5.80deg)",
  "translateY(45.65px) rotate(2.22deg)",
  "translateY(45.65px) rotate(-2.22deg)",
  "translateY(28.21px) rotate(-5.80deg)",
  "translateY(0.00px) rotate(-7.16deg)",
  "translateY(-28.21px) rotate(-5.80deg)",
  "translateY(-45.65px) rotate(-2.22deg)",
  "translateY(-45.65px) rotate(2.22deg)",
  "translateY(-28.21px) rotate(5.80deg)",
  "translateY(0.00px) rotate(7.16deg)",
  "translateY(28.21px) rotate(5.80deg)",
  "translateY(45.65px) rotate(2.22deg)",
  "translateY(45.65px) rotate(-2.22deg)",
  "translateY(28.21px) rotate(-5.80deg)",
  "translateY(0.00px) rotate(-7.16deg)",
  "translateY(-28.21px) rotate(-5.80deg)",
  "translateY(-45.65px) rotate(-2.22deg)",
  "translateY(-45.65px) rotate(2.22deg)",
  "translateY(-28.21px) rotate(5.80deg)",
];

function SprocketRow() {
  return (
    <div
      className="h-5 shrink-0 bg-[#161311] bg-[length:40px_100%] bg-repeat-x"
      style={{
        backgroundImage:
          "radial-gradient(circle at 20px 50%, #0d0c0b 0 4.5px, rgba(185,154,99,0.55) 5px 5.5px, transparent 6px)",
      }}
    />
  );
}

function framePose(index: number) {
  return { transform: FRAME_POSES[index] };
}

function FilmFrames({ hidden }: { hidden?: boolean }) {
  return (
    <>
      {FILM_FRAMES.map((frame, index) => (
        <article
          key={`${hidden ? "loop" : "reel"}-${frame.id}`}
          aria-hidden={hidden ? true : undefined}
          style={framePose(index)}
          className="-ml-px flex h-[200px] w-[240px] shrink-0 flex-col border-y border-[#B99A63]/70 bg-[#161311]"
        >
          <SprocketRow />
          <div className="min-h-0 flex-1 px-1">
            <img
              src={frame.src}
              alt={hidden ? "" : frame.alt}
              width={1200}
              height={800}
              draggable={false}
              className="h-full w-full object-cover"
            />
          </div>
          <SprocketRow />
        </article>
      ))}
    </>
  );
}

export function FilmStrip({ isPaused }: FilmStripProps) {
  return (
    <div className="relative min-w-0 w-full overflow-hidden py-16">
      <div className={`film-track flex w-max ${isPaused ? "is-paused" : ""}`}>
        <FilmFrames />
        <FilmFrames hidden />
      </div>
    </div>
  );
}
