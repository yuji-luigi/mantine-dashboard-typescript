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
  Tooltip,
} from '@mantine/core';
import { Icons } from '../../data/icons';
import { IMAGES_ARRAY, PATH_IMAGE } from '../../lib/image-paths';
import { getRandomItemFromArray } from '../../utils/mock-data-functions';
import Link from 'next/link';
import { Sections } from '../../types/general/data/sections-type';
import TextWithIcon from '../text/TextWithIcon';
import BadgeWithToolTip from '../text/BadgeWithToolTip';

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

export function CardMaintainer({
  maintainer,
  entity,
}: {
  maintainer: MaintainerModel;
  entity: Sections;
}) {
  const { classes, theme } = useStyles();
  const dark = theme.colorScheme === 'dark';
  return (
    <Card
      component={Link}
      href={`${entity}/${maintainer._id}`}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      sx={{
        cursor: 'pointer',
        // onhover shadow
        '&:hover': {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
          boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <Card.Section
        component="a"
        sx={{
          backgroundImage: `url(${maintainer.logo?.url || PATH_IMAGE.flatmateLogo1})`,
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
        src={maintainer.avatar?.url || getRandomItemFromArray(IMAGES_ARRAY)}
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

      <Stack spacing={4}>
        <Text size="lg" weight={800}>
          {maintainer.name}
        </Text>
        <TextWithIcon icon={<Icons.buildings size={ICON_SIZE} />} text={maintainer.company} />
        <TextWithIcon
          sx={{ marginBottom: 4 }}
          icon={<Icons.mail size={ICON_SIZE} />}
          text={maintainer.email}
        />
        <BadgeWithToolTip
          icon={<Icons.mapPin size={ICON_SIZE} />}
          text={maintainer.address || 'add address'}
          disabled={!maintainer.address}
        />
      </Stack>

      {/* <Text lineClamp={5} size="sm" color="dimmed">
        {maintainer.description}
      </Text> */}

      {/* <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Details
      </Button> */}
    </Card>
  );
}
