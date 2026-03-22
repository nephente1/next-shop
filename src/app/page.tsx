import Link from 'next/link';
import { getCategories, CategoryType } from './api/api';
import Image from 'next/image';

const categoriesWithImages: Record<string, string> = {
  movies: '/images/st.jpg',
  'womens-dresses': '/images/wom.webp',
  'womens-jewellery': '/images/jew.webp',
  laptops: '/images/electronics.webp',
  'mens-shirts': '/images/men.webp',
};

export const dynamic = 'force-dynamic';

export default async function Home() {
  const categories = await getCategories();
  const allCategories: CategoryType[] = [...categories, { slug: 'movies', name: 'Movies' }];

  const renderCategoriesBoxes = allCategories.map((category: CategoryType, i: number) => {
    const imageSrc =
      categoriesWithImages[category.slug] ??
      `https://dummyjson.com/image/160x160/0ea5e9/ffffff?text=${encodeURIComponent(category.name)}&fontSize=16`;
    return (
      <Link
        prefetch={false}
        key={i}
        href={`/categories/${category.slug}`}
        style={{ textDecoration: 'none' }}
        className="border border-sky-400 p-5 m-2 radius flex flex-wrap flex-col justify-between items-center shadow-lg basis-60 flex-auto cursor-pointer hover:border-pink-600"
      >
        <div
          title={category.name}
          className="text-sky-600 text-xl capitalize text-center text-ellipsis overflow-hidden w-60 line-clamp-2 font-bold"
        >
          {category.name}
        </div>
        <div className="relative max-w-40 max-h-40 w-40 h-40 my-2">
          <Image src={imageSrc} alt={category.name} fill sizes="160px" className="object-contain" priority />
        </div>
      </Link>
    );
  });

  return (
    <>
      <div className="text-center sm:text-left flex flex-col gap-4">
        <h2 className="text-3xl font-semibold text-zinc-700">Shop categories</h2>
        <div className="flex flex-wrap justify-center">{renderCategoriesBoxes}</div>
      </div>
    </>
  );
}
