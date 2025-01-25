// GET /api/movies/:id
import { config } from '@/config';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.url;
  const id = url.split('/').pop(); // Pobiera ostatni element z URL

  try {
    // Pobierz dane z pliku public/database.json
    const response = await fetch(`${config.apiUrl}/database.json`, {
      cache: 'force-cache',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    const moviesList = data.moviesList; // Zakładamy, że dane są w formacie { movies: [...] }

    // Dodaj kategorię i cenę do każdego filmu
    const moviesWithCategory = moviesList.map((movie) => ({
      ...movie,
      category: 'movies',
      price: 100,
    }));

    const movieItem = moviesWithCategory.find((movie) => movie.id === id);

    // Zwróć dane jako odpowiedź JSON
    return NextResponse.json(movieItem, {
      headers: { 'Cache-Control': 'public, max-age=0, must-revalidate' },
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }

  // // Dodaj kategorię i cenę do każdego filmu
  // const moviesWithCategory = moviesList.map((movie) => ({
  //   ...movie,
  //   category: 'movies',
  //   price: 100,
  // }));

  // const movieItem = moviesWithCategory.find((movie) => movie.id === id);

  // // Jeśli film nie został znaleziony, zwróć błąd 404 - w tym wypadku obsługuje to plikiem error.tsx w folderze [productId]
  // // if (!movieItem) {
  // //   return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
  // // }

  // const response = NextResponse.json(movieItem);
  // response.headers.set('Cache-Control', 'public, max-age=60');
  // return response;
}
