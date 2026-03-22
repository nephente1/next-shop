import { config } from '@/config';

export const url = 'https://dummyjson.com';

export type CategoryType = {
  slug: string;
  name: string;
};

type RawDummyProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
};

// Normalize DummyJSON product shape to match our ProductData interface
const normalizeProduct = (product: RawDummyProduct) => ({
  id: String(product.id),
  title: product.title,
  description: product.description,
  category: product.category,
  price: product.price,
  image: product.thumbnail,
});

// Getting all categories from DummyJSON API
export const getCategories = async (): Promise<CategoryType[]> => {
  try {
    const res = await fetch(`${url}/products/categories`, {
      next: { revalidate: 60, tags: ['categories'] },
    });

    if (!res.ok) return [];

    const data: Array<{ slug: string; name: string; url: string }> = await res.json();
    return data.map(({ slug, name }) => ({ slug, name }));
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
};

// Getting all products in a specific category from DummyJSON API
export const getCategoryProducts = async (categoryName: string) => {
  try {
    // limit=100 aby pobrać wszystkie produkty (domyślny limit DummyJSON to 30)
    const res = await fetch(`${url}/products/category/${categoryName}?limit=100`, {
      next: { revalidate: 60, tags: [`category-${categoryName}`] },
    });

    if (!res.ok) return [];

    const data = await res.json();
    return (data.products || []).map(normalizeProduct);
  } catch (error) {
    console.error(`Failed to fetch products for category ${categoryName}:`, error);
    return [];
  }
};

// Getting specific product by id
export const getProduct = async (id: string) => {
  try {
    const res = await fetch(`${url}/products/${id}`, {
      next: { revalidate: 60, tags: [`product-${id}`] },
    });

    if (!res.ok) return null;

    const data = await res.json();
    return normalizeProduct(data);
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
