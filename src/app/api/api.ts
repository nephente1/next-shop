import { config } from '@/config';
import axios from 'axios';

export const url = 'https://fakestoreapi.com';

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Getting all categories from fake store API
export const getCategories = async () => {
  try {
    const res = await fetch(`${url}/products/categories`, {
      next: {
        revalidate: 3600, // Cache for 1 hour
        tags: ['categories'], // Add cache tag
      },
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      // Fallback to axios if fetch fails
      const { data } = await axiosInstance.get('/products/categories');
      return data;
    }

    return res.json();
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
};

// Getting all products in a specific category from fake store API
export const getCategoryProducts = async (categoryName: string) => {
  try {
    const res = await fetch(`${url}/products/category/${categoryName}`, {
      next: {
        revalidate: 3600,
        tags: [`category-${categoryName}`], // Add unique cache tag per category
      },
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      // Fallback to axios if fetch fails
      const { data } = await axiosInstance.get(`/products/category/${categoryName}`);
      return data;
    }

    return res.json();
  } catch (error) {
    console.error(`Failed to fetch products for category ${categoryName}:`, error);
    return [];
  }
};

// Getting specific product by id
export const getProduct = async (id: string) => {
  try {
    const res = await fetch(`${url}/products/${id}`, {
      next: {
        revalidate: 3600,
        tags: [`product-${id}`], // Add unique cache tag per product
      },
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      // Fallback to axios if fetch fails
      const { data } = await axiosInstance.get(`/products/${id}`);
      return data;
    }

    return res.json();
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    return null;
  }
};

export async function getMovieProduct(productId: string) {
  try {
    const response = await fetch(`${config.apiUrl}/api/movies/${productId}`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch movie: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching movie:', error);
    return null;
  }
}
