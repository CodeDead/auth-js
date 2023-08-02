import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Copyright = ({ company, link, sx }) => (
  <Typography variant="body2" color="text.secondary" align="center" sx={sx}>
    {'Copyright © '}
    <Link color="inherit" href={link}>
      {company}
    </Link>
    {` ${new Date().getFullYear()}`}
  </Typography>
);

export default Copyright;
