import { ReactElement } from 'react';
import Head from 'next/head';
import Layout from '../layouts';
import { HeroSection } from '../sections/homepage/hero';
import { AboutSection } from '../sections/homepage/AboutSection';
import BannerSection from '../sections/homepage/BannerSection';
import ContactUsSection from '../sections/homepage/ContactUsSection';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>FlatMates© | Top</title>
        <meta
          name="description"
          content="Flatmates where you can create group of people and their social media or platform where manage all kinds of communications."
        />
      </Head>
      <HeroSection />
      <AboutSection />
      <BannerSection />
      <ContactUsSection />
    </>
  );
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout variant="main">{page}</Layout>;
};
