import { getCategoryProducts, getCategories } from '@/app/api/api';
import BackButton from '@/app/components/BackButton';
import { BoxItem } from '@/app/components/BoxItem';
import ErrorComponent from '@/app/components/ErrorComponent';
import { ProductData } from '@/redux/cartStore';

export async function generateStaticParams() {
  try {
    console.log('Fetching categories...');

    // Pobieramy kategorie, wymuszając brak cache (aby uniknąć pustych danych)
    const categories: string[] = await getCategories();

    if (!categories || categories.length === 0) {
      console.error('❌ No categories found!');
      return [];
    }

    console.log('✅ Generated categories:', categories);

    return categories.map((category) => ({
      category, // 👈 Poprawna struktura zwracanych wartości
    }));
  } catch (error) {
    console.error('🚨 Error fetching categories:', error);
    return [];
  }
}

// 🔹 NOWE: Next.js 15.1.6 zaleca `revalidate` zamiast `dynamic`
// export const revalidate = false; // Strona generowana statycznie i nie odświeża się automatycznie
export const dynamic = 'error'; // equivalent to getStaticProps() in the pages - force static rendering and cache
export const dynamicParams = false; // ❌ Jeśli kategoria nie istnieje, Next.js zwróci 404

const CategoryPage = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;

  const categoryProducts = await getCategoryProducts(category);
  const categoryName = await decodeURIComponent(category);

  const displayCategoryProducts = categoryProducts.map((el: ProductData) => (
    <BoxItem
      key={Number(el.id)}
      productData={el}
      id={el.id}
      title={el.title}
      price={el.price}
      image={el.image}
      category={el.category}
    />
  ));

  // if (categoryName !== categoryProducts?.map((el: ProductData) => el.category)[0]) {
  //   return <ErrorComponent subject="category" />;
  // }

  return (
    <>
      <div className="flex justify-between w-full">
        <h2 className="text-2xl text-sky-700 capitalize mb-2 font-semibold">{categoryName}</h2>
        <BackButton />
      </div>
      <div className="flex flex-wrap justify-center">{displayCategoryProducts}</div>
    </>
  );
};

export default CategoryPage;
