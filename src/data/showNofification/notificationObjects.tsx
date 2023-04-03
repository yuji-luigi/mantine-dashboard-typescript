import { Icons } from '../icons';

export const errorNotificationData = (data: string, ms: number = 1000, id: string = 'error') => {
  return {
    id,
    title: 'Error',
    color: 'red',
    icon: <Icons.alert />,
    message: data || 'connection error',
    autoClose: ms,
  };
};
