export type FilmFrame = {
  id: string;
  src: string;
  alt: string;
};

export const FILM_FRAMES: FilmFrame[] = Array.from({ length: 20 }, (_, index) => {
  const id = String(index + 1).padStart(2, "0");
  return {
    id,
    src: `/film/${id}.jpg`,
    alt: `Khung thước phim ${id}`,
  };
});
