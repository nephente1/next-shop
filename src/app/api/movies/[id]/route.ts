// GET /api/movies/:id
import { moviesList } from '@/utils/utils';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = await params;

  // Dodaj kategorię i cenę do każdego filmu
  const moviesWithCategory = moviesList.map((movie) => ({
    ...movie,
    category: 'movies',
    price: 100,
  }));

  // Znajdź film po ID
  const movieItem = moviesWithCategory.find((movie) => movie.id === id);

  // Jeśli film nie został znaleziony, zwróć błąd 404 - w tym wypadku obsługuje to plikiem error.tsx w folderze [productId]
  // if (!movieItem) {
  //   return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
  // }

  // Zwróć znaleziony film
  const response = NextResponse.json(movieItem);
  // Ustaw nagłówek Cache-Control na 60 sekund
  response.headers.set('Cache-Control', 'public, max-age=60');
  return response;
}
