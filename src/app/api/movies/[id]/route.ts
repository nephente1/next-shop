import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET(request: NextRequest) {
  const url = request.url;
  const id = url.split('/').pop();

  try {
    // Read the JSON file from the public directory
    const jsonPath = path.join(process.cwd(), 'public', 'database.json');
    const fileContents = await fs.readFile(jsonPath, 'utf8');
    const data = JSON.parse(fileContents);

    const moviesList = data.moviesList;
    const moviesWithCategory = moviesList.map((movie: any) => ({
      ...movie,
      category: 'movies',
      price: 100,
    }));

    const movieItem = moviesWithCategory.find((movie: any) => movie.id === id);

    if (!movieItem) {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }

    // Add cache headers for better performance
    const response = NextResponse.json(movieItem);
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    return response;
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
