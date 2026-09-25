import { AnniversaryWheelPage } from "@/components/anniversary-wheel-page";
import { ChapterPager } from "@/components/story/chapter-pager";
import { MemoryFilm } from "@/components/story/memory-film";
import { MemoryFilmThree } from "@/components/story/memory-film-three";
import { MemoryFilmTwo } from "@/components/story/memory-film-two";

export default function Home() {
  return (
    <>
      <ChapterPager />
      <AnniversaryWheelPage />
      <MemoryFilm />
      <MemoryFilmTwo />
      <MemoryFilmThree />
    </>
  );
}
