import { Drawer } from '@mantine/core';
import FormFields from '../input/FormFields';

export function CrudDrawerDefault({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // const [opened, setOpened] = useState(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="Register"
        padding="xl"
        size="xl"
      >
        <FormFields />
      </Drawer>
    </>
  );
}
