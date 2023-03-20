import { Group, ActionIcon, createStyles, Menu } from '@mantine/core';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { Icons } from '../../data/icons';
import { FONT_SIZES } from '../../lib/enums';
import { IconBookmark, IconHeart, IconSettings, IconShare } from '@tabler/icons-react';

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
                <IconSettings />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label sx={{ textAlign: 'center' }}>Create something</Menu.Label>
              <Menu.Item
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
        </Group>
      )}
    </>
  );
};

export default PostEditButton;
