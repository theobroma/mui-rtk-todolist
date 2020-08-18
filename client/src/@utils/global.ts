import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *,*::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  };
  html {
    font-family: "Nunito Sans", 'Helvetica Neue', sans-serif;
  }
  body {
    background: #fff;
    color: #fff;
    font-size: 1rem;
  }
`;
