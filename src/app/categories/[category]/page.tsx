import { getCategoryProducts } from '@/app/api/api';
import BackButton from '@/app/components/BackButton';
import { BoxItem } from '@/app/components/BoxItem';
import ErrorComponent from '@/app/components/ErrorComponent';
import { ProductData } from '@/redux/cartStore';

// export async function generateStaticParams() {
//   // Pobierz kategorie z API lub innego źródła danych
//   const categories: string[] = await getCategories();

//   // Zwróć tablicę obiektów z parametrami dla każdej kategorii
//   return categories.map((category) => ({
//     params: category
//   }));
// }

export const dynamic = 'auto';
export const dynamicParams = true;

const CategoryPage = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;

  const categoryName = await decodeURIComponent(category);
  const categoryProducts = await getCategoryProducts(category);

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

  if (categoryName !== categoryProducts?.map((el: ProductData) => el.category)[0]) {
    return <ErrorComponent subject="category" />;
  }

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
