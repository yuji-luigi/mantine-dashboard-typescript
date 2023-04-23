import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export function DeleteAlertModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();

  const isMobile = useMediaQuery('(max-width: 600px)');
  console.log(isMobile);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="You are deleting data"
        overlayProps={{
          color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
        yOffset={!isMobile ? 200 : 0}
        centered={isMobile}
      >
        Are you sure you want to delete this?
      </Modal>

      <Group position="center">
        <Button onClick={open}>Open centered Modal</Button>
      </Group>
    </>
  );
}
