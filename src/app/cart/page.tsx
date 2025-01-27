'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/rootReducer';
import { ProductData } from '@/redux/cartStore';
import { useRouter } from 'next/navigation';
import CartItem from '../components/cart/CartItem';
import styles from './CartPage.module.css';

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
      <div className="flex justify-between w-full">
        <h2 className="text-2xl text-sky-700 capitalize mb-2 font-semibold">Full cart</h2>
        <button className="button" onClick={handleBackClick}>
          back
        </button>
      </div>

      <div>
        <div className={styles.cartItem}>
          <div className={styles.itemName}>Product name</div>
          <div className={styles.itemAmount}>Amount</div>
          <div className={styles.itemPrice}>Price</div>
          <div className={styles.removeOption}>Remove item</div>
        </div>
        {cartData.length ? (
          <>
            {renderCartItems}
            <div className={styles.cartItem}>
              <div className={styles.itemName}>
                <b>Sum up value:</b>
              </div>
              <div className={styles.itemAmount} />
              <div className={styles.itemPrice}>
                <b>{getTotalCost} $</b>
              </div>
              <div className={styles.removeOption} />
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
