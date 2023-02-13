import { createStyles, Header, Autocomplete, Group, Burger } from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import Link from 'next/link';
import links from '../../../json/navbar/headerLinks.json';
import useLayoutContext from '../../../hooks/useLayoutContext';
import { ColorSchemeToggle } from '../../components/ColorSchemeToggle/ColorSchemeToggle';
import { LogoBanner } from '../../components/Banner/LogoBanner';

const useStyles = createStyles((theme) => ({
  header: {
    position: 'fixed',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  burger: {
    display: 'none',
    [theme.fn.smallerThan('md')]: {
      display: 'block',
    },
  },
  logo: {
    display: 'none',
    [theme.fn.largerThan('md')]: {
      display: 'block',
    },
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  search: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    textDecoration: 'none',

    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    fontStyle: 'normal',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
}));

// interface HeaderSearchProps {
//     links: { link: string; label: string }[];
// }
export type JSONType = typeof links;

export function HeaderSearch() {
  // const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();
  const { isOpen, toggleBarOpen } = useLayoutContext();

  const items = links.map((link) => (
    <Link key={link.label} className={classes.link} href={link.link}>
      {link.label}
    </Link>
  ));

  return (
    <Header fixed height={56} className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger className={classes.burger} opened={isOpen} onClick={toggleBarOpen} size="sm" />
          {/* <MantineLogo className={classes.logo} size={28} /> */}
          <LogoBanner transparent />
        </Group>
        <Group>
          <Group ml={50} spacing={5} className={classes.links}>
            {items}
          </Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            icon={<IconSearch size={16} stroke={1.5} />}
            data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
          />
          <ColorSchemeToggle size="lg" />
        </Group>
      </div>
    </Header>
  );
}
