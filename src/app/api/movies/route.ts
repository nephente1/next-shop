// app/api/movies/route.ts
import { config } from '@/config';
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

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
    // Read the JSON file directly instead of using fetch
    const jsonPath = path.join(process.cwd(), 'public', 'database.json');
    const fileContents = await fs.readFile(jsonPath, 'utf8');
    const data = JSON.parse(fileContents);

    const moviesList = data.moviesList;
    const moviesWithCategory = moviesList.map((movie) => ({
      ...movie,
      category: 'movies',
      price: 100,
    }));

    return NextResponse.json(moviesWithCategory, {
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error loading movies:', error);
    return NextResponse.json(
      { error: 'Failed to load movies' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
