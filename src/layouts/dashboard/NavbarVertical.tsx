import { Fragment, useEffect, useState } from 'react';
import { createStyles, Navbar, Group, Code, ScrollArea, Button } from '@mantine/core';
import { TablerIcon } from '@tabler/icons';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useLayoutContext from '../../hooks/useLayoutContext';
import useAuth from '../../hooks/useAuth';
import { sectionData } from '../../data';

import { Icons } from '../../data/icons/index';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon') as string;
  return {
    navbar: {
      zIndex: 5,
    },
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },

    link: {
      textDecoration: 'none',
    },

    linkLabel: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({
          variant: 'light',
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: 'light',
            color: theme.primaryColor,
          }).color,
        },
      },
    },
    button: {
      background: theme.colorScheme === 'dark' ? theme.colors.gray : '',
      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.fn.variant({
                variant: 'light',
                color: theme.primaryColor,
              }).background
            : '',
        // color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
  };
});

type NavbarConfig = { link: string; label: string; icon: TablerIcon };
// const navBarConfig: NavbarConfig[] = [];

// Object.keys(sectionData).forEach((key: string): void => {
//   const typedKey = key as Sections;
//   const config: NavbarConfig = {
//     link: sectionData[typedKey].link,
//     label: sectionData[typedKey].navbarTitle,
//     icon: /*  Icons[sectionData[typedKey].slice as IconsType] || Icons, */ Icons.home,
//   };
//   navBarConfig.push(config);
// });

export function NavbarVertical() {
  const { classes, cx } = useStyles();
  const { logout } = useAuth();
  const [active, setActive] = useState('');
  const { isOpen } = useLayoutContext();
  const { asPath } = useRouter();

  const filteredSectionData = sectionData.filter((data) => data.name !== 'others');

  const links = filteredSectionData.map((section) => {
    return (
      <Fragment key={section.name}>
        <p>{section.name}</p>
        {section.contents.map((navbarContent) => {
          const Icon = Icons[navbarContent.entity as IconIndexTypes] || Icons.home;

          if (navbarContent.hide) {
            return null;
          }

          return (
            <Link
              className={classes.link}
              href={navbarContent.link}
              key={navbarContent.navbarTitle}
              onClick={(event) => {
                setActive(navbarContent.navbarTitle);
              }}
            >
              <div
                className={cx(classes.linkLabel, {
                  [classes.linkActive]: navbarContent.link === active,
                })}
              >
                <Icon className={classes.linkIcon} stroke={1.5} />
                {navbarContent.navbarTitle}
              </div>
            </Link>
          );
        })}
      </Fragment>
    );
  });

  useEffect(() => setActive(asPath), [asPath]);

  return (
    <Navbar
      className={classes.navbar}
      fixed
      hidden={!isOpen}
      hiddenBreakpoint="md"
      width={{ sm: 300 }}
      p="md"
    >
      <ScrollArea>
        <Navbar.Section grow>
          <Group className={classes.header} position="apart">
            {/* <MantineLogo size={28} /> */}
            <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
          </Group>
          {links.map((navbarData) => navbarData)}
        </Navbar.Section>

        <Navbar.Section className={classes.footer}>
          {/* <Button className={classes.button} onClick={(event) => event.preventDefault()}>
            <Icons.switch className={classes.linkIcon} stroke={1.5} />
            <span>Change account</span>
          </Button> */}
          <Button variant="outline" className={classes.button} onClick={logout}>
            <Icons.logout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </Button>
        </Navbar.Section>
      </ScrollArea>
    </Navbar>
  );
}
