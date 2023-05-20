import { Card, Title, Text, createStyles, Box } from '@mantine/core';
import { Icon123 } from '@tabler/icons-react';
import React from 'react';
import { Icons } from '../../../data/icons';
import TextWithIcon from '../../text/TextWithIcon';

const useStyles = createStyles((theme) => ({
  card: {
    borderRadius: 12,
  },
  textsContainer: {
    display: 'flex',
    gap: 9,
    flexDirection: 'column',
  },
}));

const AboutCard = ({
  title = 'About',
  company,
  phone,
  email,
  address,
}: {
  title?: string;
  company?: string;
  phone?: string;
  email?: string;
  address?: string;
}) => {
  const { classes, cx, theme } = useStyles();
  return (
    <Card className={classes.card}>
      {/* <Title mb={8}>{title}</Title> */}
      <Box className={classes.textsContainer} sx={{}}>
        {company && <TextWithIcon icon={<Icons.buildings />} text={company} />}
        {address && <TextWithIcon icon={<Icons.mapPin />} text={address} />}
        {phone && <TextWithIcon icon={<Icons.phoneCall />} text={phone} />}
        {email && <TextWithIcon icon={<Icons.mail />} text={email} />}
      </Box>
    </Card>
  );
};

export default AboutCard;
