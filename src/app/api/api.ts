import axios from 'axios';

export const url = 'https://fakestoreapi.com';

export const instance = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
