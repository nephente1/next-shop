'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootReducer';
import { ProductData } from '@/redux/cartStore';
import { useRouter } from 'next/navigation';

import dynamic from 'next/dynamic';
const CartItem = dynamic(() => import('../../components/cart/CartItem'), {
  // zapobiega niepotrzebnemu preloadingowi stylów do tego komponentu, które nie są potrzebne od razu
  ssr: false,
});

const CartPage = () => {
  const { cartData } = useSelector((state: RootState) => state.cartReducer);
  const router = useRouter();

  const getTotalCost = React.useMemo(() => {
    const total = cartData.reduce((result, item) => result + item.amount * item.price, 0).toFixed(2);
    return total;
  }, [cartData]);

  const renderCartItems = React.useMemo(() => {
    return cartData.map((product: ProductData) => <CartItem key={product.id} productDetails={product} />);
  }, [cartData]);

  const cartRedirection = () => {
    router.push('/cart');
    alert('Thanks for buying!');
  };

  const handleBackClick = () => {
    router.back();
  };

  return (
    <>
      <div className="flex flex-1 flex-row justify-between w-full">
        <h2 className="text-2xl text-sky-700 capitalize mb-2 font-semibold">Full cart</h2>
        <button className="button" onClick={handleBackClick}>
          back
        </button>
      </div>

      <div>
        <div className="cartItem">
          <div className="itemName">Product name</div>
          <div className="itemAmount">Amount</div>
          <div className="itemPrice">Price</div>
          <div className="removeOption">Remove item</div>
        </div>
        {cartData.length ? (
          <>
            {renderCartItems}
            <div className="cartItem">
              <div className="itemName">
                <b>Sum up value:</b>
              </div>
              <div className="itemAmount" />
              <div className="itemPrice">
                <b>{getTotalCost} $</b>
              </div>
              <div className="removeOption" />
            </div>
            <button onClick={cartRedirection}>Finalize order</button>
          </>
        ) : (
          <p>Basket is empty, add something to cart</p>
        )}
      </div>
    </>
  );
};

export default CartPage;
