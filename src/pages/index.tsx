import { ReactElement } from 'react';
import Layout from '../layouts';
import { HeroSection } from '../sections/homepage/hero';
import { AboutSection } from '../sections/homepage/AboutSection';
import BannerSection from '../sections/homepage/BannerSection';
import ContactUsSection from '../sections/homepage/ContactUsSection';

export default function HomePage() {
  return (
    <>
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
