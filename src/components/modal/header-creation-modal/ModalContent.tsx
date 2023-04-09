import React from 'react';
import HeaderModalForm from './HeaderModalForm';
import PostModalForm from './PostModalForm';

const ModalContent = ({ modalType }: { modalType: ModalType }) => {
  return (
    <>
      {/* {modalType === 'posts' && <PostModalForm />}
      {modalType === 'funds' && <div>funds</div>}
      {modalType === 'maintenances' && <HeaderModalForm entity={modalType} />} */}
      <HeaderModalForm entity={modalType} />
    </>
  );
};

export default ModalContent;
