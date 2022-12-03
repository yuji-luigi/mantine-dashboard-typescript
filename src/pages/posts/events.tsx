import React, { ReactElement } from 'react'
import Layout from '../../layouts';

const EventPage = () => {
  return (
    <div>Events</div>
  )
}

EventPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default EventPage