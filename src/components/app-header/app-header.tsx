import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { getUser } from '../../services/user/slice';

export const AppHeader: FC = () => {
  const userName = useSelector(getUser)?.name;
  return <AppHeaderUI userName={userName} />;
};
