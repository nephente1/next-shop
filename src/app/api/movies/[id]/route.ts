import { config } from '@/config';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

// Add caching configuration
export const revalidate = 3600; // Cache for 1 hour

export async function GET(request: NextRequest) {
  try {
    // Get ID from the URL
    const id = request.url.split('/').pop();

    if (!id) {
      return NextResponse.json({ error: 'Movie ID is required' }, { status: 400 });
    }

    // Read the JSON file from public directory
    const jsonPath = path.join(process.cwd(), 'public', 'database.json');
    const fileContents = await fs.readFile(jsonPath, 'utf8');
    const data = JSON.parse(fileContents);

    if (!data.moviesList || !Array.isArray(data.moviesList)) {
      throw new Error('Invalid database structure');
    }

    // Find the specific movie
    const movie = data.moviesList.find((movie: any) => movie.id === id);

    if (!movie) {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }

    // Add category and price to the movie
    const movieWithDetails = {
      ...movie,
      category: 'movies',
      price: 100,
    };

    // Return the response with cache headers
    const response = NextResponse.json(movieWithDetails);
    response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    
    return response;

  } catch (error) {
    console.error('Error fetching movie:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}
