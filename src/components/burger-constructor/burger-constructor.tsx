import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  getConstructorItems,
  resetBurgerConstructor
} from '../../services/burgerConstructor/slice';
import { getCookie } from '../../utils/cookie';
import { getOrderState, resetOrderState } from '../../services/orders/slice';
import { useNavigate } from 'react-router-dom';
import { addOrder } from '../../services/orders/action';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const constructorItems = useSelector(getConstructorItems);
  const orderRequest = useSelector(getOrderState).orderRequest;
  const orderModalData = useSelector(getOrderState).orderModalData;

  const onOrderClick = () => {
    if (!getCookie('accessToken')) {
      return navigate('/login');
    } else if (!constructorItems.bun || orderRequest) {
      return;
    } else {
      const orderData = [
        constructorItems.bun?._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id)
      ];
      dispatch(addOrder(orderData));
    }
  };
  const closeOrderModal = () => {
    dispatch(resetBurgerConstructor());
    dispatch(resetOrderState());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
