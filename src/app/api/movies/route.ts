// app/api/movies/route.ts
import { moviesList } from '@/utils/utils';
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
  const moviesWithCategory = moviesList.map((movie) => ({
    ...movie,
    category: 'movies',
    price: 100,
  }));

  const response = NextResponse.json(moviesWithCategory);
  // Cache-Control na 60 sekund
  response.headers.set('Cache-Control', 'public, max-age=60');
  return response;
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
