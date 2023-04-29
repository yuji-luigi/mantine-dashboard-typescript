import { Fragment, useEffect, useState } from 'react';
import {
  createStyles,
  getStylesRef,
  Navbar,
  Group,
  ScrollArea,
  Button,
  Avatar,
  Text,
} from '@mantine/core';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useLayoutContext from '../../../hooks/useLayoutContext';
import useAuth from '../../../hooks/useAuth';
import { sectionData } from '../../data';

import { Icons } from '../../data/icons';
import { useMediaQuery } from '@mantine/hooks';
import { PATH_DASHBOARD } from '../../path/page-paths';
import { ColorSchemeToggle } from '../../components/color-schemeToggle/ColorSchemeToggle';
import { MouseEventHandler } from 'react';

const useStyles = createStyles((theme /* , _params, getRef */) => {
  const icon = getStylesRef('icon') as string;
  return {
    navbar: {
      zIndex: 5,
    },
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: `calc(${theme.spacing.md} * 1.5)`,
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
      // textDecoration: 'none',
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },

    flexVertical: {
      display: 'flex',
      flexDirection: 'column',
    },

    // linkLabel: {
    //   ...theme.fn.focusStyles(),
    //   display: 'flex',
    //   alignItems: 'center',
    //   textDecoration: 'none',
    //   fontSize: theme.fontSizes.sm,
    //   color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    //   padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    //   borderRadius: theme.radius.sm,
    //   fontWeight: 500,

    //   '&:hover': {
    //     backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    //     color: theme.colorScheme === 'dark' ? theme.white : theme.black,

    //     [`& .${icon}`]: {
    //       color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    //     },
    //   },
    // },

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

// type NavbarConfig = { link: string; label: string; icon: TablerIcon };
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
  const { user, logout } = useAuth();
  const [active, setActive] = useState('');
  const { isOpen } = useLayoutContext();
  const { asPath } = useRouter();
  const isMediaScreen = useMediaQuery('(max-width: 750px)');
  const isSuperAdmin = user?.role === 'super_admin';

  const chooseText = isSuperAdmin ? 'Organization' : 'Space';

  const filteredSectionData = sectionData.filter((data) => data.name !== 'others');
  const chooseHref = isSuperAdmin
    ? PATH_DASHBOARD.chooseOrganization
    : PATH_DASHBOARD.chooseRootSpace;
  if (!user) return null;
  const links = sectionData.map((section, i) => {
    return (
      <Fragment key={section.name}>
        {section.roles?.includes(user.role) && (
          <>
            <p>{section.name}</p>
            {section.contents.map((navbarContent) => {
              const Icon = Icons[navbarContent.entity as IconIndexTypes] || Icons.home;
              return (
                <Link
                  className={cx(classes.link, {
                    [classes.linkActive]: `${navbarContent.link}/` === active,
                  })}
                  href={navbarContent.link}
                  key={navbarContent.navbarTitle}
                >
                  <Icon className={classes.linkIcon} stroke={1.5} />
                  {navbarContent.navbarTitle}
                </Link>
              );
            })}
          </>
        )}
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
          <Group className={classes.header} position="left">
            <Avatar size={50} />
            <div className={classes.flexVertical}>
              <Text fw={700}>{user?.name}</Text>
              <Text fw={500}>{user?.email}</Text>
            </div>
          </Group>
        </Navbar.Section>
        {links.map((navbarData) => navbarData)}

        <Navbar.Section className={classes.footer}>
          {/* <Button
            className={cx(classes.button, classes.link)}
            // className={cx(classes.button, classes.link)}
            onClick={(event) => event.preventDefault()}
          >
            <Icons.switch className={classes.linkIcon} stroke={1.5} />
            <span>Change account</span>
          </Button> */}
          <Button variant="outline" className={cx(classes.button, classes.link)} onClick={logout}>
            <Icons.logout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </Button>
          {isMediaScreen && (
            <>
              <Button
                className={cx(classes.button, classes.link)}
                component={Link}
                href={chooseHref}
              >
                Choose {chooseText}
              </Button>
              {/* <ColorSchemeToggle size="lg" /> */}
            </>
          )}
        </Navbar.Section>
      </ScrollArea>
    </Navbar>
  );
}
