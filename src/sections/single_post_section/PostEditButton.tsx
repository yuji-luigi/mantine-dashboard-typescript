import { Group, ActionIcon, createStyles, Menu } from '@mantine/core';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { Icons } from '../../data/icons';
import { FONT_SIZES } from '../../lib/enums';
import { IconBookmark, IconDots, IconHeart, IconSettings, IconShare } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  action: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    }),
  },
}));
const PostEditButton = ({ thread }: { thread: Thread }) => {
  const { user } = useAuth();
  const { classes, cx, theme } = useStyles();
  return (
    <>
      {user?._id === thread.createdBy._id && (
        <Group position="right" mb={10}>
          <Menu shadow="lg">
            <Menu.Target>
              <ActionIcon>
                <IconDots />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
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
                sx={{
                  fontSize: FONT_SIZES.menuItemsS,
                  '&:hover': {
                    background: theme.colors.red[7],
                  },
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
