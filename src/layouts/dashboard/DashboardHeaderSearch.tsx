import { createStyles, Header, Group, Burger, Select, SelectItem } from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import Link from 'next/link';
import links from '../../../json/navbar/headerLinks.json';
import useLayoutContext from '../../../hooks/useLayoutContext';
import { ColorSchemeToggle } from '../../components/color-schemeToggle/ColorSchemeToggle';
import { LogoBanner } from '../../components/banner/LogoBanner';
import { Icons } from '../../data/icons';
import { HeaderCreationModal } from '../../components/modal/header-creation-modal/HeaderCreationModal';
import useAuth from '../../../hooks/useAuth';
import { PATH_DASHBOARD } from '../../path/page-paths';
// import { useCurrentSpaceContext } from '../../context/CurrentSpaceContext';
import { useCookieContext } from '../../context/CookieContext';
import { lowerFirst, useMediaQuery } from '@mantine/hooks';
import axiosInstance from '../../utils/axios-instance';
import { useEffect, useState } from 'react';
import { PATH_API } from '../../path/api-routes';
import { convertToSelectItems } from '../../utils/helper-functions';
import { getCookies, getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';
import { kMaxLength } from 'buffer';
import OrganizationSpaceSelect from '../../components/select-custom/OrganizationSpaceSelect';

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
    // justifyContent: 'flex-start',
    // alignItems: 'center',
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
  spaceName: {
    maxWidth: 200,
    maxHeight: 56,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    cursor: 'pointer',
    // display: 'inline-block',
    // whiteSpace: 'nowrap',
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

// interface DashboardHeaderSearchProps {
//     links: { link: string; label: string }[];
// }
export type JSONType = typeof links;

export function DashboardHeaderSearch() {
  // const [opened, { toggle }] = useDisclosure(false);
  const [organizations, setOrganizations] = useState<SelectItem[] | []>([]);
  const [spaces, setSpaces] = useState<SelectItem[] | []>([]);
  const router = useRouter();
  const pageEntity = router.query.entity || router.pathname.split('/').pop();
  const {
    setCurrentOrganization,
    setCurrentSpace,
    currentSpace,
    currentOrganization,
    resetCurrentSpace,
  } = useCookieContext();
  const { classes } = useStyles();
  const { isOpen, toggleBarOpen } = useLayoutContext();
  const { user } = useAuth();
  const isSuperAdmin = user?.role === 'super_admin';
  const isMediaScreen = useMediaQuery('(max-width: 750px)');

  const items = links.map((link) => (
    <Link key={link.label} className={classes.link} href={link.link}>
      {link.label}
    </Link>
  ));

  const chooseHref = isSuperAdmin
    ? PATH_DASHBOARD.chooseOrganization
    : PATH_DASHBOARD.chooseRootSpace;
  const chooseText = isSuperAdmin ? 'Organization' : 'Space';

  const getOrganizations = async () => {
    await axiosInstance.delete(`${PATH_API.organizationCookie}`);
    await axiosInstance.delete(PATH_API.spaceCookie);
    setCurrentSpace(null);
    const response = await axiosInstance.get(PATH_API.organization);
    const selectOptions = convertToSelectItems(response.data.data);
    setOrganizations(selectOptions);
  };

  /** get spaces options and reset the cookie of space. show all the info of organization without querying by space. */
  const handleOnSelectOrganization = async (organizationId: string) => {
    try {
      if (organizationId === '') {
        await axiosInstance.delete(`${PATH_API.organizationCookie}`);
        setCurrentOrganization('no organization selected');
        return;
      }
      const response = await axiosInstance.get(`${PATH_API.organizationCookie}/${organizationId}`);
      const selectOptions = convertToSelectItems(response.data.data);
      await axiosInstance.delete(`${PATH_API.spaceCookie}`);
      setCurrentSpace(null);
      setSpaces(selectOptions);
      setCurrentOrganization(organizationId);
    } catch (error: any) {
      console.error(error.message || error);
    }
  };

  const getSpaceCookieFromApi = async (spaceId: string) => {
    console.log(spaceId);
    if (spaceId === '') {
      await axiosInstance.delete(PATH_API.spaceCookie);
      resetCurrentSpace();
      return;
    }
    const response = await axiosInstance.get(`${PATH_API.spaceCookie}/${spaceId}`);
    setCurrentSpace(response.data.data.jwt);
  };

  const handleGetSpaces = async () => {
    try {
      if (isSuperAdmin) return;
      const response = await axiosInstance.get(`${PATH_API.getSpaceSelections}`);
      const selectOptions = convertToSelectItems(response.data.data);
      setSpaces(selectOptions);
    } catch (error) {}
  };

  useEffect(() => {
    const organizationNameCookie = getCookie('organizationName');
    if (typeof organizationNameCookie === 'string') {
      setOrganizations([{ label: organizationNameCookie, value: currentOrganization || '' }]);
    }

    // if (typeof organizationCookie === 'string') {
    //   axiosInstance.get(`${PATH_API.organization}/${organizationCookie}`).then((res) => {
    //     setOrganizations(convertToSelectItems([res.data.data]));
    //     console.log({ convertedData: convertToSelectItems([res.data.data]) });
    //     setCurrentOrganization(organizationCookie);
    // });
    // }
    const spaceNameCookie = getCookie('spaceName');
    if (typeof spaceNameCookie === 'string') {
      const spaceId = currentSpace?._id || '';
      setSpaces([{ label: spaceNameCookie, value: spaceId }]);
    }
    // const spaceCookie = getCookie('space');
    // if (typeof spaceCookie === 'string') {
    //   const space = jwtDecode<CurrentSpace>(spaceCookie);
    //   const spaceOption = [{ value: space._id, label: space.name }];
    //   setCurrentSpace(spaceCookie);
    //   setSpaces(spaceOption);
    // }
  }, []);
  return (
    <Header fixed height={56} className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger className={classes.burger} opened={isOpen} onClick={toggleBarOpen} size="sm" />
          {/* <MantineLogo className={classes.logo} size={28} /> */}
          <LogoBanner transparent />
          {/* // !! Todo: delete */}
          {/* {!isMediaScreen && (
            <Tooltip label={currentSpace?.name}>
              <Text className={classes.spaceName}>{currentSpace?.name}</Text>
            </Tooltip>
          )} */}
          {/* <Autocomplete
            className={classes.search}
            placeholder="Search"
            icon={<IconSearch size={16} stroke={1.5} />}
            data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
          /> */}
          <Group ml={5} spacing={5} className={classes.links}>
            {items}
          </Group>
          <HeaderCreationModal />
        </Group>
        <Group>
          {!isMediaScreen && (
            <>
              <OrganizationSpaceSelect />

              {/* {isSuperAdmin && (
                <Select
                  allowDeselect
                  onClick={getOrganizations}
                  value={currentOrganization || ''}
                  // defaultValue={getCookie('organization')?.toString()}
                  data={organizations}
                  onChange={(value) => {
                    handleOnSelectOrganization(value || '');
                  }}
                />
              )}
              <Select
                allowDeselect
                onClick={handleGetSpaces}
                key={currentOrganization || ''}
                data={spaces}
                value={currentSpace?._id?.toString() || ''}
                onChange={(value) => {
                  getSpaceCookieFromApi(value || '');
                }}
              /> */}

              <ColorSchemeToggle size="lg" />
            </>
          )}
        </Group>
      </div>
    </Header>
  );
}
