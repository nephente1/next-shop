import { getCategoryProducts, getCategories } from '@/app/api/api';
import BackButton from '@/app/components/BackButton';
import { BoxItem } from '@/app/components/BoxItem';
import ErrorComponent from '@/app/components/ErrorComponent';
import { ProductData } from '@/redux/cartStore';

// 🔹 NOWE: Next.js 15.1.6 zaleca `revalidate` zamiast `dynamic`
export const revalidate = 3600; // 1 hour cache // Strona generowana statycznie i nie odświeża się automatycznie
// export const dynamic = 'error'; // equivalent to getStaticProps() in the pages - force static rendering and cache

// Konfiguracja cachowania
export const fetchCache = 'force-cache'; // Wymusza użycie cache
export const dynamicParams = false; // ❌ Jeśli kategoria nie istnieje, Next.js zwróci 404

// Typ dla props
type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  try {
    const categories = await getCategories();

    if (!Array.isArray(categories) || categories.length === 0) {
      return [];
    }

    return categories.map((category) => ({
      category: category.toLowerCase(),
    }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  try {
    const resolvedParams = await params;
    const categoryName = decodeURIComponent(resolvedParams.category);

    const categoryProducts = await getCategoryProducts(categoryName);

    if (!categoryProducts?.length) {
      return <ErrorComponent subject="category" />;
    }

    const displayCategoryProducts = categoryProducts.map((el: ProductData) => (
      <BoxItem
        key={el.id}
        productData={el}
        id={el.id}
        title={el.title}
        price={el.price}
        image={el.image}
        category={el.category}
      />
    ));

    return (
      <>
        <div className="flex justify-between w-full">
          <h2 className="text-2xl text-sky-700 capitalize mb-2 font-semibold">{categoryName}</h2>
          <BackButton />
        </div>
        <div className="flex flex-wrap justify-center">{displayCategoryProducts}</div>
      </>
    );
  } catch (error) {
    console.error('Error loading category:', error);
    return <ErrorComponent subject="category" />;
  }
};

export default CategoryPage;
