import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { checkUserAuth } from '../../services/user/actions';

import { getIsAuthChecked, getUser } from '../../services/user/slice';
import { getIngredients } from '../../services/ingredients/actions';
// import { getConstructorItem } from '../../services/constructor/slice';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // const data = useSelector(getConstructorItems);
  const background = location.state?.background;

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredients());
    // console.log(data);
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='*' element={<NotFound404 />} />

        <Route path='/login' element={<OnlyUnAuth component={<Login />} />} />
        <Route
          path='/register'
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route path='/profile' element={<OnlyAuth component={<Profile />} />} />
        <Route
          path='/profile/orders'
          element={<OnlyAuth component={<ProfileOrders />} />}
        />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />

        {/* <Route
        path='/feed/:number'
        element={<Modal title='' onClose={} children={<OrderInfo />} />}
      />
      <Route
        path='/profile/orders/:number'
        element={<Modal title='' onClose={} children={<OrderInfo />} />}
      /> */}
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title=''
                onClose={() => navigate('/')}
                children={<IngredientDetails />}
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
