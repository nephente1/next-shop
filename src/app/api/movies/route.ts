// app/api/movies/route.ts
import { config } from '@/config';
import { NextResponse } from 'next/server';

export type MoviesTypes = {
  title: string;
  description: string;
  year: string;
  image: string;
  id: string;
  category: string;
  price: number;
};

// W Next.js 15 endpointy API muszą eksportować funkcje o nazwach odpowiadających metodom HTTP (GET, POST, PUT, DELETE).

export async function GET() {
  try {
    // Pobierz dane z pliku public/database.json
    const response = await fetch(`${config.apiUrl}/database.json`);
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

    // Zwróć dane jako odpowiedź JSON
    return NextResponse.json(moviesWithCategory);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// export async function getMovies() {
//   const moviesWithCategory = moviesList.map((movie) => ({
//     ...movie,
//     category: 'movies', price: 100,
//   }));

// const response = NextResponse.json(moviesWithCategory);
//   // Cache-Control na 60 sekund
//   response.headers.set('Cache-Control', 'public, max-age=60');
//   return response.json();
// }
