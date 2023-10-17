import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../styles/theme";
import { useState } from "react";
import styled from "styled-components";

function Theme() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Div>
        <p>theme</p>
        <button onClick={handleToggleTheme}>toggle theme</button>
      </Div>
    </ThemeProvider>
  );
}

const Div = styled.div`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.color};
`;

export default Theme;
