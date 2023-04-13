import React, { useEffect, useRef, useState } from 'react';
import classes from './LogosDiffer.module.css';
import { Box } from '@mantine/core';
import Image from 'next/image';

const LogosDiffer = ({ title }: { title: string }) => {
  const containerRef = useRef(null);
  const containerRef2 = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackFn = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    console.log(entry.isIntersecting);
    setIsVisible(entry.isIntersecting);
    entries.forEach((entry) => {
      //
    });
  };

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFn, options);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);
  return (
    <Box ref={containerRef}>
      <Box
        className={isVisible ? classes.show : classes.hide}
        sx={{
          display: 'grid',
          placeItems: 'center',
          alignContent: 'center',
          minHeight: '100vh',
        }}
      >
        <h1>{title}</h1>
        <Box className={classes.logos}>
          <Image
            // className={classes.logo}
            className={isVisible ? classes.logo : classes.logoHide}
            height={100}
            width={100}
            src={'/images/flatmate_circle_logo_yellow.png'}
            alt="logo"
          />
          <Image
            // className={classes.logo}
            className={isVisible ? classes.logo : classes.logoHide}
            height={100}
            width={100}
            src={'/images/flatmate_circle_logo_yellow.png'}
            alt="logo"
          />
          <Image
            // className={classes.logo}
            className={isVisible ? classes.logo : classes.logoHide}
            height={100}
            width={100}
            src={'/images/flatmate_circle_logo_yellow.png'}
            alt="logo"
          />
          <Image
            // className={classes.logo}
            className={isVisible ? classes.logo : classes.logoHide}
            height={100}
            width={100}
            src={'/images/flatmate_circle_logo_yellow.png'}
            alt="logo"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default LogosDiffer;
