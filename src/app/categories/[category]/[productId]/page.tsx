import { getProduct } from '@/app/api/api';
import Image from 'next/image';
import BackButton from '@/app/components/BackButton';
import { MoviesTypes } from '@/app/api/movies/route';
import { ProductData } from '@/redux/cartStore';
import AddToCartButton from '@/app/components/AddToCartButton';
import ErrorComponent from '@/app/components/ErrorComponent';
import { config } from '@/config';

export const dynamic = 'error'; // equivalent to getStaticProps() in the pages - force static rendering and cache
export const dynamicParams = true;

const ProductDetails = async ({ params }: { params: Promise<{ productId: string; category: string }> }) => {
  const { productId, category } = await params;
  const mainProduct = await getProduct(productId);

  const movieProduct =
    category === 'movies'
      ? await (async () => {
          const movieResponse = await fetch(`${config.apiUrl}/api/movies/${productId}`);
          if (!movieResponse.ok) {
            return <ErrorComponent subject="product" />;
          }
          return movieResponse.json();
        })()
      : null;

  const productDetails: ProductData | MoviesTypes = movieProduct || mainProduct;

  if (!productDetails) {
    return <ErrorComponent subject="product" />;
  }

  return (
    <>
      <div className="flex flex-col text-zinc-700 items-center text-xs sm:flex-row">
        <div className="flex flex-col text-left gap-2 self-start">
          <div className="flex justify-between">
            <div className="text-gray-700 text-2xl capitalize font-semibold">{productDetails.category}</div>
            <BackButton />
          </div>
          <div className="text-2xl mt-4 text-sky-600 capitalize font-semibold">{productDetails.title}</div>
          <div className="text-lg">Description:</div>
          <div className="text-lg">{productDetails.description}</div>
          <div className="text-xl text-sky-600 font-semibold my-2">Price: {productDetails.price} $</div>
        </div>

        <div className="flex flex-col text-left lg:ml-12">
          <div className="h-80 w-80 relative">
            <Image
              fill={true}
              priority={true}
              className="object-contain"
              sizes="(max-width: 320px) 100vw, (max-width: 1200px) 320px"
              title={productDetails.title}
              alt={productDetails.title}
              src={productDetails?.image?.startsWith('http') ? productDetails.image : `/images/${productDetails.image}`}
            />
          </div>
        </div>
      </div>
      <AddToCartButton productDetails={productDetails} />
    </>
  );
};

export default ProductDetails;
