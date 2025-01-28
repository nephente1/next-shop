import Link from 'next/link';
import { getCategories } from './api/api';
import Image from 'next/image';

interface CategoryImage {
  [key: string]: string;
}

const categoriesWithImages: CategoryImage[] = [
  { movies: '/images/st.jpg' },
  { "women's clothing": '/images/wom.webp' },
  { jewelery: '/images/jew.webp' },
  { electronics: '/images/electronics.webp' },
  { "men's clothing": '/images/men.webp' },
];

export default async function Home() {
  const categories = await getCategories();

  const renderCategoriesBoxes = [...categories, 'movies'].map((category: string, i: number) => {
    const categoryImage = categoriesWithImages.find((item: CategoryImage) => Object.keys(item)[0] === category);
    const imageSrc = categoryImage !== undefined ? categoryImage[category] : '';
    return (
      <Link
        prefetch={false}
        key={i}
        href={`/categories/${category}`}
        style={{ textDecoration: 'none' }}
        className="border border-sky-400 p-5 m-2 radius flex flex-wrap flex-col justify-between items-center shadow-lg basis-60 flex-auto cursor-pointer hover:border-pink-600"
      >
        <div
          title={category}
          className="text-sky-600 text-xl capitalize text-center text-ellipsis overflow-hidden w-60 line-clamp-2 font-bold"
        >
          {category}
        </div>
        <div className="relative max-w-40 max-h-40 w-40 h-40 my-2">
          <Image src={imageSrc} alt={category} fill sizes="160px" className="object-contain" priority />
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
