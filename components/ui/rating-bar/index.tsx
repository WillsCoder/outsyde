type Rating = {
  id: string
  score: number
  user: { name: string | null; image: string | null }
  createdAt: Date
}

export const ratingBars = (ratings: Rating[]) => {
  return [5, 4, 3, 2, 1].map((star) => {
    const count = ratings.filter((r) => Math.round(r.score) === star).length;
    const pct = ratings.length ? Math.round((count / ratings.length) * 100) : 0;
    return { star, pct };
  });
};
