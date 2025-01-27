import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['fakestoreapi.com'], // Dodaj hostname'y, z których chcesz ładować obrazy
  },
  experimental: {
    optimizeCss: true, // Optymalizuje obsługę CSS
  },
  compress: true, // Włącza kompresję dla lepszej wydajności
  optimizeFonts: true,
};

export default nextConfig;
