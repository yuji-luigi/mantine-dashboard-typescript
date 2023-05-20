import { GetServerSidePropsContext, NextPage } from 'next';
import { useState, ReactElement, ReactNode } from 'react';
import { AppProps } from 'next/app';
import { getCookie, setCookie } from 'cookies-next';
import Head from 'next/head';
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
  MantineTheme,
  Tuple,
} from '@mantine/core';
import { Provider as ReduxProvider } from 'react-redux';
import { AuthProvider } from '../context/JWTContext';
import reduxStore from '../redux/store';
import { DashboardLayoutContextProvider } from '../context/DashboardLayoutContext';
import { DrawerContextProvider } from '../context/DataTableDrawerContext';
import { PaginationContextProvider } from '../context/PaginationContext';
import { Notifications } from '@mantine/notifications';
import { DeepPartial } from '@reduxjs/toolkit';
import { myColors } from '../lib/custom-colors';
// import { CurrentSpaceContextProvider } from '../context/CurrentSpaceContext';
import { CookieContextProvider } from '../context/CookieContext';
import { _ModalContextProvider } from '../context/modal-context/_ModalContext';
import '../styles/global.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps }: AppPropsWithLayout = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'dark' : 'light');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>Mantine next example</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <AuthProvider>
        <ReduxProvider store={reduxStore}>
          <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider
              theme={{
                colors: myColors,
                primaryColor: 'ocean-blue',
                // primaryColor: 'sw-dark-blue',
                colorScheme,
                fontFamily: 'Lato, sans-serif',
              }}
              withGlobalStyles
              withNormalizeCSS
            >
              <CookieContextProvider>
                <DashboardLayoutContextProvider>
                  <PaginationContextProvider>
                    <DrawerContextProvider>
                      <_ModalContextProvider>
                        <Notifications />
                        {getLayout(<Component {...pageProps} />)}
                      </_ModalContextProvider>
                    </DrawerContextProvider>
                  </PaginationContextProvider>
                </DashboardLayoutContextProvider>
              </CookieContextProvider>
            </MantineProvider>
          </ColorSchemeProvider>
        </ReduxProvider>
      </AuthProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'dark',
});
