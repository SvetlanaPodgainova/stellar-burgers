import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes } from 'react-router-dom';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <AppHeader />
    <Routes>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route path='*' element={<Feed />} />

      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/profile/orders' element={<ProfileOrders />} />

      <Route
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
      />
    </Routes>
  </div>
);

export default App;
