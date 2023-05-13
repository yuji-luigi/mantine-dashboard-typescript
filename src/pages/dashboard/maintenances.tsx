import { createStyles, SimpleGrid, Card, Image, Text, Container, AspectRatio } from '@mantine/core';
import fetch from 'node-fetch';

import { GetServerSidePropsContext } from 'next';
import { ReactElement, useEffect } from 'react';
import Layout from '../../layouts';
import MaintenanceListPageSection from '../../sections/maintenance_list_section/MaintenanceListPageSection';
import axiosInstance from '../../utils/axios-instance';
import { useCrudSliceStore } from '../../redux/features/crud/crudSlice';

export default function MaintenanceListPage({ maintenances }: { maintenances: ThreadModel[] }) {
  const { setCrudDocuments } = useCrudSliceStore();
  useEffect(() => {
    setCrudDocuments({ entity: 'maintenances', documents: maintenances });
  }, [maintenances]);
  return <MaintenanceListPageSection /* maintenances={maintenances} */ />;
}

MaintenanceListPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="dashboard">{page}</Layout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const jwtToken = context.req.cookies.jwt;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/maintenances`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      // 'Content-Type': 'application/x-www-form-urlencoded',
      space: context.req.cookies.space || '',
      organization: context.req.cookies.organization || '',
    },
  });

  const data = (await res.json()) as Record<string, any>;

  const maintenances = data.data || [];

  return {
    props: {
      maintenances,
    },
  };
}
