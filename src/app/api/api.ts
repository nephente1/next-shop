import Axios, { AxiosInstance } from 'axios';
import { setupCache } from 'axios-cache-interceptor';

export const url = 'https://fakestoreapi.com';

// Tworzymy instancję axiosa z cache
export const instance: AxiosInstance = Axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axios = setupCache(instance, { ttl: 1000 * 60 * 30 });

// Dodajemy adapter cache do instancji axiosa
// instance.defaults.adapter = (cache as any).adapter;

// Getting all categories from fake store API
export const getCategories = async () => {
  // const res = await fetch(`${url}/products/categories`, {
  //   cache: 'force-cache',
  // });
  // const data = await res.json();
  const { data } = await axios.get(`/products/categories`);
  return data;
};

// Getting all produts in a specfic category from fake store API
export const getCategoryProducts = async (categoryName: string) => {
  const { data } = await axios.get(`/products/category/${categoryName}`);
  // const res = await fetch(`${url}/products/category/${categoryName}`, {
  //   cache: 'force-cache',
  // });
  // const data = await res.json();
  return data;
};

// Getting specific product by id
export const getProduct = async (id: string) => {
  const { data } = await axios.get(`/products/${id}`);
  return data;
};
