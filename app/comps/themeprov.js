"use client"
import localFont from 'next/font/local'

import { createTheme, ThemeProvider } from '@mui/material/styles';
const ShoikaRegular = localFont({ src: "../../public/fonts/ShoikaRegular.ttf" })
const Metropolis = localFont({ src: "../../public/fonts/Metropolis-Regular.otf" })
const MetropolisSemiBold = localFont({ src: "../../public/fonts/Metropolis-SemiBold.otf" })
const ShoikaSemiBold = localFont({ src: "../../public/fonts/ShoikaSemiBold.ttf" })


export default function ThemeProv({children}) {
  const theme = createTheme({
    palette:{
      primary: {
        main: '#9f55f5',
      },
      secondary: {
        main: '#f58a55',
      },
      background: {
        main: '#f2f2f2'
      },
    },
    breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 968,
          lg: 1200,
          lgm: 1300,
          xl: 1536,
        },
      },
    typography:{
      h1:{
          fontFamily: ShoikaRegular.style.fontFamily,
          color: "#1a1a1a"
      },
      h2:{
          fontFamily: ShoikaRegular.style.fontFamily,
          color: "#1a1a1a"
      },
      h3:{
          fontFamily: ShoikaRegular.style.fontFamily,
          color: "#1a1a1a"
      },
      h4:{
          fontFamily: ShoikaRegular.style.fontFamily,
          color: "#1a1a1a"
      },
      h5:{
          fontFamily: ShoikaRegular.style.fontFamily,
          color: "#1a1a1a"
      },
      h6:{
          fontFamily: Metropolis.style.fontFamily,
          color: "#1a1a1a"
      },
      subtitle1: {
          fontFamily: Metropolis.style.fontFamily,
          color: "#1a1a1a"
      },
      subtitle2: {
          fontFamily: Metropolis.style.fontFamily,
          color: "#1a1a1a"
      },
      body1: {
          fontFamily: Metropolis.style.fontFamily,
          color: "#1a1a1a"
      },
      body2: {
          fontFamily: Metropolis.style.fontFamily,
          color: "#1a1a1a"
      },
      caption: {
          fontFamily: Metropolis.style.fontFamily,
          color: "#1a1a1a"
      },
      button: {
          fontFamily: ShoikaRegular.style.fontFamily,
          color: "#1a1a1a"
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'MetropolisSemiBold';
            font-style: normal;
            font-display: swap;
            font-weight: 800;
            src: url(${MetropolisSemiBold}) format('otf');
          }
            @font-face {
            font-family: 'ShoikaSemiBold';
            font-style: normal;
            font-display: swap;
            font-weight: 800;
            src: url(${ShoikaSemiBold}) format('ttf');
          }
        `,
      },
    },
  });
  return (
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
  );
}
