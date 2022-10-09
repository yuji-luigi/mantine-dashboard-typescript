import { forwardRef } from 'react';
// next
import Head from 'next/head';

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = '', meta, ...other }, ref) => (
  <>
    <Head>
      <title>{`${title} | Minimal-UI`}</title>
      {meta}
    </Head>

    <div {...other}>{children}</div>
  </>
));

export default Page;
