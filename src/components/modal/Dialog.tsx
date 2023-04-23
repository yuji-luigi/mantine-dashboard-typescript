import { useDisclosure } from '@mantine/hooks';
import { Dialog, Group, Button, TextInput, Text } from '@mantine/core';

export function DialogDefault() {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <>
      <Group position="center">
        <Button onClick={toggle}>Toggle dialog</Button>
      </Group>

      <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md">
        <Text size="sm" mb="xs" weight={500}>
          Subscribe to email newsletter
        </Text>

        <Group align="flex-end">
          <TextInput placeholder="hello@gluesticker.com" sx={{ flex: 1 }} />
          <Button onClick={close}>Subscribe</Button>
        </Group>
      </Dialog>
    </>
  );
}
