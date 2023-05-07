import { Group, ActionIcon, createStyles, Menu } from '@mantine/core';
import React, { useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { Icons } from '../../data/icons';
import { FONT_SIZES } from '../../lib/enums';
import { IconBookmark, IconDots, IconHeart, IconSettings, IconShare } from '@tabler/icons-react';
import { useCrudSelectors, useCrudSliceStore } from '../../redux/features/crud/crudSlice';
import { useDrawerContext } from '../../context/DataTableDrawerContext';
import { useRouter } from 'next/router';
import { Sections } from '../../types/general/data/sections-type';
import { PATH_DASHBOARD } from '../../path/page-paths';

const useStyles = createStyles((theme) => ({
  action: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    }),
  },
}));
const PostEditButton = ({ data, entity }: { data: AllModels; entity: Sections }) => {
  const { user } = useAuth();

  const router = useRouter();

  const { selectCrudDocument, deleteCrudDocumentWithPagination } = useCrudSliceStore();

  const { openDrawer } = useDrawerContext();

  const { classes, cx, theme } = useStyles();
  const handleClicked = () => selectCrudDocument({ document: data, entity });
  const handleEditClicked = () => openDrawer();
  // useEffect(() => {
  //   return () => selectCrudDocument({ document: null, entity });
  // }, []);
  const handleDeleteClicked = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deleteCrudDocumentWithPagination({ documentId: data._id, entity });
      router.push(PATH_DASHBOARD.posts);
    }
  };
  console.log(user?._id === data.user._id || user?.role === 'super_admin');
  return (
    <>
      {(user?._id === data.user._id || user?.role === 'super_admin') && (
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

export default PostEditButton;
