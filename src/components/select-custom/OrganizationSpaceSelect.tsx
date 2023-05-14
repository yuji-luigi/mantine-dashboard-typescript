import { Select, SelectItem, Sx } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axios-instance';
import { PATH_API } from '../../path/api-routes';
import { useRouter } from 'next/router';
import { useCookieContext } from '../../context/CookieContext';
import { convertToSelectItems } from '../../utils/helper-functions';
import useAuth from '../../../hooks/useAuth';
import useLayoutContext from '../../../hooks/useLayoutContext';
import { useMediaQuery } from '@mantine/hooks';
import { getCookie } from 'cookies-next';
import { UseFormReturnType } from '@mantine/form';

interface OrganizationSpaceSelectProps {
  sx?: Sx;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  labels?: { organization: string; space: string };
  form?: UseFormReturnType<Record<string, unknown>> | null;
  // organizationsLabel?: string;
  // spacesLabel?: string;
}

const OrganizationSpaceSelect = ({
  sx,
  size = 'xs',
  labels,
  form = null,
}: OrganizationSpaceSelectProps) => {
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
  const { user } = useAuth();
  const isSuperAdmin = user?.role === 'super_admin';

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
    const spaceNameCookie = getCookie('spaceName');
    if (typeof spaceNameCookie === 'string') {
      const spaceId = currentSpace?._id || '';
      setSpaces([{ label: spaceNameCookie, value: spaceId }]);
    }
  }, []);
  return (
    <>
      {isSuperAdmin && (
        <Select
          name="organization"
          size={size}
          label={labels?.organization}
          allowDeselect
          onClick={getOrganizations}
          value={currentOrganization || ''}
          // defaultValue={getCookie('organization')?.toString()}
          data={organizations}
          onChange={(value) => {
            handleOnSelectOrganization(value || '');
            if (form) {
              form.setFieldValue('organization', value || '');
            }
          }}
          sx={sx}
        />
      )}
      <Select
        name="space"
        size={size}
        allowDeselect
        label={labels?.space}
        onClick={handleGetSpaces}
        key={currentOrganization || ''}
        data={spaces}
        value={currentSpace?._id?.toString() || ''}
        onChange={(value) => {
          getSpaceCookieFromApi(value || '');
          if (form) {
            form.setFieldValue('space', value || '');
          }
        }}
        sx={sx}
      />
    </>
  );
};

export default OrganizationSpaceSelect;
