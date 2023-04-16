import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';
import { PATH_API } from '../../../path/api-routes';
import axiosInstance from '../../../utils/axios-instance';
import { setSession, setSpaceSession } from '../../../utils/jwt';
import { json } from 'stream/consumers';
import { useCurrentSpaceContext } from '../../../context/CurrentSpaceContext';
import Link from 'next/link';

const getSpaceAsCookie = async (spaceId: string) => {
  const res = await axiosInstance.get(`${PATH_API.getSpaceCookie}/${spaceId}`, {
    withCredentials: true,
  });

  return res.data.data;
};

/**
 * in this page todo
 * 1. get spaceId from url
 * 2. get space as jwt from server
 * 3. redirect to dashboard.
 *
 * not using onClick event on button because it will be a link
 * so the component can be used generically
 */

const EnterSpacePage = () => {
  const router = useRouter();
  const { spaceId } = router.query;
  const { setCurrentSpace } = useCurrentSpaceContext();
  const { data, error, isLoading } = useSWR(spaceId, getSpaceAsCookie);
  if (isLoading) return <div>loading</div>;
  if (error) return <div>error</div>;
  if (!data) {
    return <div>no data</div>;
  }
  // set session localStorage. cookie is handled by server
  // redirect to dashboard

  setSpaceSession(data.jwt);
  setCurrentSpace(data.space);
  router.push('/dashboard');
  return <p>loading...</p>;
};

export default EnterSpacePage;
