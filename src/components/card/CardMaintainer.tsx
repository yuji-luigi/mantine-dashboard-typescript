import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Stack,
  Avatar,
  Box,
  createStyles,
  rem,
} from '@mantine/core';
import { Icons } from '../../data/icons';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },
  address: {
    cursor: 'pointer',
  },
  avatar: {
    border: `${rem(4)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
  },
  pinIcon: {
    marginRight: -4,
  },
}));

const ICON_SIZE = 16;

export function CardMaintainer({ maintainer }: { maintainer: MaintainerModel }) {
  const { classes, theme } = useStyles();

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section
        component="a"
        sx={{
          backgroundImage: `url(${maintainer.avatar.url})`,
          height: 140,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        // href="https://mantine.dev/"
      ></Card.Section>
      {/* <Image src={maintainer.avatar.url} height={160} alt="Norway" /> */}
      {/* </Card.Section> */}
      <Avatar
        src={maintainer.logo}
        size={80}
        radius={80}
        mx="auto"
        mt={-40}
        className={classes.avatar}
      />
      <Group position="right" align="center">
        <Badge
          color="pink"
          variant="light"
          sx={{ position: 'absolute', transform: 'translate(0, -24px)' }}
        >
          {maintainer.type}
        </Badge>
      </Group>

      <Stack spacing={0}>
        <Text weight={500}>{maintainer.name}</Text>
        <Text color="" weight={500}>
          <Group spacing={0}>
            <Icons.buildings size={ICON_SIZE} />
            {maintainer.company}
          </Group>
        </Text>

        <Group align="center">
          <Icons.mail size={ICON_SIZE} />
          <Text c="dimmed" weight={300}>
            {maintainer.email}
          </Text>
        </Group>
        <Badge title={maintainer.address} sx={{ cursor: 'pointer', paddingBlock: 16 }}>
          <Text truncate weight={300}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box>
                <Icons.mapPin size={ICON_SIZE} />
              </Box>
              {maintainer.address} gaerw gar gare gha
            </Box>
          </Text>
        </Badge>
      </Stack>

      {/* <Text lineClamp={5} size="sm" color="dimmed">
        {maintainer.description}
      </Text> */}

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Details
      </Button>
    </Card>
  );
}
