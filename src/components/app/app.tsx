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
import { Route, Routes } from 'react-router-dom';
import { OnlyAuth, OnlyUnAuth } from '../protected-route/protected-route';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
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

      {/* <Route
        path='/feed/:number'
        element={<Modal title='' onClose={} children={<OrderInfo />} />}
      />
      <Route
        path='/ingredients/:id'
        element={<Modal title='' onClose={} children={<IngredientDetails />} />}
      />
      <Route
        path='/profile/orders/:number'
        element={<Modal title='' onClose={} children={<OrderInfo />} />}
      /> */}
    </Routes>
  </div>
);

export default App;
