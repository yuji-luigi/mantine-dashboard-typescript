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
import { Icons } from '../../data/icons';
import { allSectionArrayWithRoles } from '../../data';

import { FONT_SIZES } from '../../lib/enums';
import ModalContent from './ModalContent';
import { useState } from 'react';

export function HeaderCreationModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [section, setSection] = useState<SectionDataJsonWithRoles | null>(null);

  const handleOpenModal = (type: ModalType) => {
    setSection(allSectionArrayWithRoles.find((section) => section.entity === type) || null);
    setModalType(type);
    open();
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
            onClick={() => handleOpenModal('posts')}
            sx={{ fontSize: FONT_SIZES.menuItems }}
            icon={<Icons.article size={FONT_SIZES.menuItems} />}
          >
            New post
          </Menu.Item>
          <Menu.Item
            sx={{ fontSize: FONT_SIZES.menuItems }}
            icon={<Icons.funds size={FONT_SIZES.menuItems} />}
          >
            New fund
          </Menu.Item>
          <Menu.Item
            sx={{ fontSize: FONT_SIZES.menuItems }}
            icon={<Icons.messageDots size={FONT_SIZES.menuItems} />}
          >
            Send message
          </Menu.Item>
          {/* <Menu.Item
          icon={<IconSearch size={14} />}
          rightSection={
            <Text size="xs" color="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item> */}

          <Menu.Divider />

          {/* <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item icon={<IconArrowsLeftRight size={14} />}>Transfer my data</Menu.Item>
        <Menu.Item color="red" icon={<IconTrash size={14} />}>
          Delete my account
        </Menu.Item> */}
        </Menu.Dropdown>
      </Menu>
      <Modal opened={opened} onClose={close} size="lg" title={section?.createButton}>
        <ModalContent modalType={modalType} />
      </Modal>
    </>
  );
}
