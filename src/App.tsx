import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/themes/Gloobal.styles";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { CycleContextProvider } from "./contexts/cycleContext";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CycleContextProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </CycleContextProvider>
      <GlobalStyle />
    </ThemeProvider>
  );
}
