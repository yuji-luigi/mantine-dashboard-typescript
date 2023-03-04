import {
  ActionIcon,
  ActionIconProps,
  Group,
  MantineNumberSize,
  MantineStyleSystemProps,
  SpacingValue,
  SystemProp,
  useMantineColorScheme,
  Variants,
} from '@mantine/core';
import { SunIcon, MoonIcon } from '@modulz/radix-icons';

type Props = {
  variant?: Variants<
    'subtle' | 'filled' | 'outline' | 'light' | 'default' | 'transparent' | 'gradient'
  >;
  mt?: SystemProp<SpacingValue>;
  size?: MantineNumberSize;
};
export function ColorSchemeToggle(props: Props) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group position="center" mt={props.mt}>
      <ActionIcon
        onClick={() => toggleColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
        size={props.size || 'xl'}
        variant={props.variant || 'filled'}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
          borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
        })}
      >
        {colorScheme === 'dark' ? (
          <SunIcon width={20} height={20} />
        ) : (
          <MoonIcon width={20} height={20} />
        )}
      </ActionIcon>
    </Group>
  );
}
