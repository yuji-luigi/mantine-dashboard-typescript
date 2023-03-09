import { hideNotification, showNotification, cleanNotifications } from '@mantine/notifications';
import { useEffect } from 'react';
import { errorNotificationData } from '../../src/data/showNofification/notificationObjects';
import { useCrudSelectors } from '../../src/redux/features/crud/crudSlice';
import { sleep } from '../../src/utils/helper-functions';

// const useCrudStatusAlert = (entity) => {

//   const {
//     selectedCrudDocument: selectedDocument,
//     crudStatus,
//     crudError,
//   } = useCrudSelectors(entity);
//     /** runs every time crudStatus changed */
//     useEffect(() => {
//      if (submitting) {
//        if (crudStatus === 'loading') {
//          null;
//        }
//        /** define case for succeed */
//        if (crudStatus === 'succeed') {
//          handleSubmitSucceed();
//        }
//        if (crudError) {
//          hideNotification('submit');
//          showNotification(errorNotificationData(crudError, 5000));
//          setSubmitting(false);
//          sleep(5000).then(() => cleanNotifications());
//        }
//      }
//    }, [crudStatus]);
//  }

// export default useCrudStatusAlert;
