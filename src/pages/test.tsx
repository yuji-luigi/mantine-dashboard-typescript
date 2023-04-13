import { Box, Grid } from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import SlideObserver from '../components/animation/SlideObserver';
import LogosDiffer from '../components/animation/LogosDiffer';

const TestPage = () => {
  const containerRef = useRef(null);
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
    threshold: 1.0,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFn, options);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };

    // const element = document.getElementById('test')
    // if (element) {
    //   observer.observe(element)
    // }
  }, [containerRef, options]);

  return (
    <>
      <SlideObserver
        title="why my product?"
        description="The best product in the world. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />
      <SlideObserver
        title="why my product?"
        description="The best product in the world. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />
      <LogosDiffer title={'So good!'} />
    </>
  );
};

export default TestPage;
