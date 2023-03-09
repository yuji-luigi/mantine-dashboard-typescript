import { Icons } from '../icons';

export const errorNotificationData = (data: string, ms: number = 1000) => {
  return {
    title: 'Error',
    color: 'red',
    icon: <Icons.alert />,
    message: data || 'connection error',
    autoClose: ms,
  };
};
