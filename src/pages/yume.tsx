import { Box, Button, Stack, Text } from '@mantine/core';
import React, { useState } from 'react';

const nextColors: Record<string, string> = {
  yellow: 'green',
  green: 'pink',
  pink: 'lightblue',
  lightblue: 'red',
  red: 'teal',
  teal: 'black',
  black: 'white',
  white: 'gray',
  gray: 'yellow',
};

const yume = () => {
  const [color, setColor] = useState('yellow');

  const handleClick = () => {
    // alert('夢ボタンが押されました');

    setColor(nextColors[color]);
  };
  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          backgroundColor: color,
          transition: 'background-color 0.5s',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Stack>
          <Text color="blue" weight={900} size={60}>
            yume
          </Text>
          <Button onClick={handleClick}>夢ボタン</Button>
        </Stack>
      </Box>
    </>
  );
};

export default yume;
