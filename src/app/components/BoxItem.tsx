import Image from 'next/image';
import { MoviesTypes } from '../api/movies/route';
import AddToCartButton from './AddToCartButton';
import { ProductData } from '@/redux/cartStore';
import { getBase64 } from '@/utils/getBase64';
import Link from 'next/link';

interface BoxItemPropsType {
  title: string;
  price?: string | number;
  image: string;
  key?: number | string;
  id: number | string;
  productData: ProductData | MoviesTypes;
  category?: string;
}

export const BoxItem = async (props: BoxItemPropsType) => {
  const { id, title, image, price, productData, category } = props;
  const blurDataURL = await getBase64(image);

  return (
    <Link
      href={`/categories/${category}/${id}`}
      style={{ textDecoration: 'none' }}
      className="border border-sky-400 p-5 m-2 radius flex flex-wrap flex-col justify-between items-center shadow-lg basis-60 flex-auto cursor-pointer hover:border-pink-600"
    >
      <div title={title} className="text-sky-600 text-lg text-ellipsis overflow-hidden w-60 line-clamp-2 font-bold">
        {title}
      </div>
      <div className="relative max-w-40 max-h-40 w-40 h-40 my-2">
        <Image
          fill={true}
          sizes="160px"
          className="object-contain"
          placeholder="blur"
          blurDataURL={blurDataURL || undefined}
          alt={title}
          src={image}
          quality={50}
          priority
          loading="eager"
        />
      </div>
      <p className="text-sky-600 text-xl mb-2">
        <b>{price} $</b>
      </p>
      <AddToCartButton productDetails={productData} />
    </Link>
  );
};
