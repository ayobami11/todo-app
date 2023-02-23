import { createGlobalStyle } from 'styled-components';

import { AppContextWrapper } from "./contexts/app";
import { ThemeContextWrapper } from "./contexts/theme";

import Home from "./components/Home";

const ResetStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 1rem;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: ${({theme}) => theme.font.size};
  }

  img {
    height: auto;
    object-fit: cover;
    max-width: 100%;
  }

  button {
    background: transparent;
    border: none;
    cursor: pointer;
  }

  ul {
    list-style: none;
  }

  /* From Tailwind CSS */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`;

const App = () => {

  return (
    <AppContextWrapper>
      <ThemeContextWrapper>
        <ResetStyles />

        <Home />
      </ThemeContextWrapper>
    </AppContextWrapper>

  );
}

export default App;
