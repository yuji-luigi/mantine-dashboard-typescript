import { Group, ActionIcon, createStyles, Menu } from '@mantine/core';
import React, { useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { Icons } from '../../data/icons';
import { FONT_SIZES } from '../../lib/enums';
import { IconBookmark, IconDots, IconHeart, IconSettings, IconShare } from '@tabler/icons-react';
import { useCrudSelectors, useCrudSliceStore } from '../../redux/features/crud/crudSlice';
import { useDrawerContext } from '../../context/DataTableDrawerContext';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  action: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    }),
  },
}));
const MaintenanceEditButton = ({ maintenance }: { maintenance: Maintenance }) => {
  const { user } = useAuth();

  const router = useRouter();

  const { selectCrudDocument, deleteCrudDocument } = useCrudSliceStore();

  const { openDrawer } = useDrawerContext();

  const { classes, cx, theme } = useStyles();
  const handleClicked = () => selectCrudDocument({ document: maintenance, entity: 'maintenances' });
  const handleEditClicked = () => openDrawer();
  // useEffect(() => {
  //   return () => selectCrudDocument({ document: null, entity: 'maintenances' });
  // }, []);
  const handleDeleteClicked = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deleteCrudDocument({ documentId: maintenance._id, entity: 'maintenances' });
      router.push('/dashboard/posts');
    }
  };
  return (
    <>
      {user?._id === maintenance.createdBy._id && (
        <Group position="right" mb={10}>
          <Menu shadow="lg">
            <Menu.Target>
              <ActionIcon onClick={handleClicked}>
                <IconDots />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={handleEditClicked}
                sx={{ fontSize: FONT_SIZES.menuItemsS }}
                icon={<Icons.article size={FONT_SIZES.menuItemsS} />}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                sx={{ fontSize: FONT_SIZES.menuItemsS }}
                icon={<Icons.archive size={FONT_SIZES.menuItemsS} />}
              >
                Mark as draft
              </Menu.Item>
              <Menu.Item
                onClick={handleDeleteClicked}
                sx={{
                  fontSize: FONT_SIZES.menuItemsS,
                  color: 'red',
                  // '&:hover': {
                  //   background:
                  //     theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                  // },
                }}
                icon={<Icons.trash color="red" size={FONT_SIZES.menuItemsS} />}
              >
                Delete
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
        </Group>
      )}
    </>
  );
};

export default MaintenanceEditButton;
