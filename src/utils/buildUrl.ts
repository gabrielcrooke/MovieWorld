type ContentType = 'movie' | 'tv';

type OrderOption =
  | 'most_popular'
  | 'less_popular'
  | 'top_rated'
  | 'lowest_rated';

interface BuildMovieUrlParams {
  type: ContentType;
  page: number;
  selectedOrder?: OrderOption;
  selectedGenre?: string;
}

export const buildUrl = ({
  type,
  page,
  selectedOrder,
  selectedGenre,
}: BuildMovieUrlParams): string => {
  let url = `https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_video=false&language=en-US&page=${page}`;

  switch (selectedOrder) {
    case 'most_popular':
      url += '&sort_by=popularity.desc';
      break;
    case 'less_popular':
      url += '&sort_by=popularity.asc';
      break;
    case 'top_rated':
      url +=
        '&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200';
      break;
    case 'lowest_rated':
      url +=
        '&sort_by=vote_average.asc&without_genres=99,10755&vote_count.gte=200';
      break;
  }

  if (selectedGenre && selectedGenre !== '') {
    url += `&with_genres=${selectedGenre}`;
  }

  return url;
};
