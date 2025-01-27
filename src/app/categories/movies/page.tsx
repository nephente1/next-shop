import BackButton from '@/app/components/BackButton';
import { MoviesTypes } from '../../api/movies/route';
import { BoxItem } from '../../components/BoxItem';
import { config } from '@/config';

export const dynamic = 'error'; // equivalent to getStaticProps() in the pages - force static rendering and cache

const MoviesPage = async () => {
  const response = await fetch(`${config.apiUrl}/api/movies`, {
    cache: 'force-cache',
  }); // wywołanie poprzez api/movies/route
  const moviesList = await response.json();

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

      <div className={'flex flex-wrap justify-center mb-4'}>{displayMovieslist}</div>
    </>
  );
};

export default MoviesPage;
