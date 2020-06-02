import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import { APP_TITLE } from '@constants/app';
import { theme } from '@constants/theme';

class Main extends App {
  public render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>{APP_TITLE}</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}

export default Main;
