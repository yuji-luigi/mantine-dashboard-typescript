import React from 'react';
import PostModalForm from './PostModalForm';

const ModalContent = ({ modalType = null }: { modalType?: ModalType | null }) => {
  return (
    <>
      {modalType === 'posts' && <PostModalForm />}
      {modalType === 'funds' && <div>funds</div>}
    </>
  );
};

export default ModalContent;
