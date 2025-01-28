import { useDispatch } from 'react-redux';
import { ADD_TO_CART, REDUCE_PRODUCT, REMOVE_FROM_CART } from '@/redux/cartStore';
import { itemsPrice } from '@/utils/utils';
import { ProductData } from '@/redux/cartStore';
import { Trash2, SquarePlus, SquareMinus } from 'lucide-react';
import styles from './CartItem.module.css';

export default function CartItem({ productDetails }: { productDetails: ProductData }) {
  const dispatch = useDispatch();
  const { id, price, amount, title } = productDetails;

  return (
    <div className={styles.cartItem} key={id}>
      <div className={styles.itemName}>{title}</div>
      <div className={styles.itemAmount}>
        {amount} pcs.
        <SquarePlus className="text-sky-600 cursor-pointer ml-1" onClick={() => dispatch(ADD_TO_CART(productDetails))} />
        <SquareMinus className="text-sky-600 cursor-pointer" onClick={() => dispatch(REDUCE_PRODUCT(productDetails))} />
      </div>
      <div className={styles.itemPrice}>{itemsPrice(price, amount)} $</div>
      <div className={styles.removeOption}>
        <Trash2 onClick={() => dispatch(REMOVE_FROM_CART(productDetails))} />
      </div>
    </div>
  );
}
