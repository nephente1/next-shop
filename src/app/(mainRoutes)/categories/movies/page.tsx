import BackButton from '@/app/components/BackButton';
import { MoviesTypes } from '../../../api/movies/route';
import { BoxItem } from '../../../components/BoxItem';
import { config } from '@/config';

// Zamiast dynamic='error' używamy revalidate
export const revalidate = 3600; // Cache na poziomie strony

async function getMovies() {
  try {
    const response = await fetch(`${config.apiUrl}/api/movies`, {
      next: {
        revalidate: 3600, // Cache na poziomie fetch
      },
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Failed to fetch movies:', error);
    return [];
  }
}

const MoviesPage = async () => {
  const moviesList = await getMovies();

  if (!moviesList || moviesList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl text-sky-700 mb-4">No movies available</h2>
        <BackButton />
      </div>
    );
  }

  const displayMovieslist = moviesList.map((el: MoviesTypes) => (
    <BoxItem
      key={Number(el.id)}
      productData={el}
      id={el.id}
      title={el.title}
      price={el.price}
      image={`/images/${el.image}`}
      category={el.category}
    />
  ));

  return (
    <>
      <div className="flex justify-between w-full">
        <h2 className="text-2xl text-sky-700 capitalize mb-2 font-semibold">Movies</h2>
        <BackButton />
      </div>

      <div className="flex flex-wrap justify-center mb-4">{displayMovieslist}</div>
    </>
  );
};

export default MoviesPage;
