import { useDisclosure } from '@mantine/hooks';

import { Menu, Modal, Button, Group, Text, ActionIcon } from '@mantine/core';
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from '@tabler/icons-react';
import { Icons } from '../../../data/icons';
import { allSectionArrayWithRoles } from '../../../data';

import { FONT_SIZES } from '../../../lib/enums';
import ModalContent from './ModalContent';
import { useState } from 'react';
import { useCrudSelectors, useCrudSliceStore } from '../../../redux/features/crud/crudSlice';
import { notifications } from '@mantine/notifications';

export function HeaderCreationModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [section, setSection] = useState<SectionDataJsonWithRoles | null>(null);

  const { setSubmitting } = useCrudSliceStore();
  const { submitting } = useCrudSelectors();
  const handleOpenModal = (type: ModalType) => {
    setSection(allSectionArrayWithRoles.find((section) => section.entity === type) || null);
    setModalType(type);
    open();
    // if (submitting) {
    //   notifications.hide('submit');
    //   notifications.show({
    //     title: 'Upload is cancelled',
    //     message: 'Upload cancelled because you opened a popup',
    //   });
    // }
    // setSubmitting(false);
  };
  const handleClose = () => {
    // setSection(allSectionArrayWithRoles.find((section) => section.entity === type) || null);
    // setModalType(type);
    close();
    if (submitting) {
      notifications.hide('submit');
      notifications.show({
        title: 'Upload is cancelled',
        message: 'Upload cancelled because you closed a popup',
      });
    }
    setSubmitting(false);
  };
  return (
    <>
      <Menu shadow="lg">
        <Menu.Target>
          <ActionIcon>
            <Icons.plus />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label sx={{ textAlign: 'center' }}>Create something</Menu.Label>
          <Menu.Item
            onClick={() => handleOpenModal('threads')}
            sx={{ fontSize: FONT_SIZES.menuItems }}
            icon={<Icons.article size={FONT_SIZES.menuItems} />}
          >
            New post
          </Menu.Item>
          <Menu.Item
            sx={{ fontSize: FONT_SIZES.menuItems }}
            onClick={() => handleOpenModal('maintenances')}
            icon={<Icons.maintenance size={FONT_SIZES.menuItems} />}
          >
            Add maintenance
          </Menu.Item>
          <Menu.Item
            sx={{ fontSize: FONT_SIZES.menuItems }}
            icon={<Icons.messageDots size={FONT_SIZES.menuItems} />}
          >
            Send message
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      {modalType && (
        <Modal opened={opened} onClose={handleClose} size="lg" title={section?.createButton}>
          <ModalContent modalType={modalType} />
        </Modal>
      )}
    </>
  );
}
