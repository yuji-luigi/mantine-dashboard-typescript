import { showNotification } from '@mantine/notifications';
import { Icons } from '../src/data/icons';

interface Error {
  message: string;
}

type NotificationTypes = 'error' | null;

const useCustomShowNotification = ({
  message,
  type,
  ms,
}: {
  message: string;
  type: NotificationTypes;
  ms: number;
}) => {
  /** define case error for showing notification */
  if (type === 'error') {
    return showNotification({
      title: 'Error',
      color: 'red',
      icon: <Icons.alert />,
      message: /*  data.message || */ message || 'connection error',
      autoClose: 2000,
    });
  }

  return showNotification({ message });
};

export default useCustomShowNotification;
