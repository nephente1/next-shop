import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['fakestoreapi.com'], // Dodaj hostname'y, z których chcesz ładować obrazy
  },
  compress: true, // Włącza kompresję dla lepszej wydajności
};

export default nextConfig;
