import { Box, Grid } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import classes from './SlideObserver.module.css';

interface SlideObserverProps {
  title: string;
  description: string;
}
const SlideObserver = ({ title, description }: SlideObserverProps) => {
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
    <>
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
          <p>{description}</p>
        </Box>
      </Box>
    </>
  );
};

export default SlideObserver;
