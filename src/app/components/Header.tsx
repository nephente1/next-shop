'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootReducer';
import React from 'react';

const Header = () => {
  const getActualCart = useSelector((state: RootState) => state.cartReducer);
  const cartItems = getActualCart.cartData;
  const getProductsAmount = React.useMemo(() => {
    return cartItems.reduce((result, item) => (item.amount ? item.amount : 0) + result, 0);
  }, [cartItems]);

  return (
    <header className="row-start-1 flex justify-center p-2 min-h-16 bg-sky-600 sm:p-0">
      <div className="container text-white justify-between items-center gap-2">
        <Link className="flex gap-4 text-2xl text-white hover:text-pink-600" href="/">
          <div className="self-center relative w-40 h-8">
            <Image src="/next.svg" alt="Next.js logo" fill className="invert" priority />
          </div>
          <div className="flex mt-4">Shop</div>
        </Link>
        <div className="flex gap-6">
          <Link className="nav relative flex" href="/">
            Main Page
          </Link>
          <Link className="nav flex gap-2 w-44" href="/cart">
            Shopping cart
            <div className="rounded-full bg-pink-600 text-white text-center w-7 h-7 text-base leading-[1.8]">
              {getProductsAmount}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
