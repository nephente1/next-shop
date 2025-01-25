import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

export const url = 'https://fakestoreapi.com';

export const instance = setupCache(
  axios.create({
    baseURL: url,
    headers: {
      'Content-Type': 'application/json',
    },
  }),
  {
    ttl: 1000 * 60 * 5, // Cache ważny przez 5 minut
  },
);

// Getting all categories from fake store API
export const getCategories = async () => {
  const { data } = await instance.get(`/products/categories`);
  return data;
};

// Getting all produts in a specfic category from fake store API
export const getCategoryProducts = async (categoryName: string) => {
  const { data } = await instance.get(`/products/category/${categoryName}`);
  return data;
};

// Getting specific product by id
export const getProduct = async (id: string) => {
  const { data } = await instance.get(`/products/${id}`);
  return data;
};
