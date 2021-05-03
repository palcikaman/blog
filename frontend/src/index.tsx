import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { QueryClientProvider } from "react-query";
import App from "./App";
import queryClient from "./config/query";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import theme from "config/theme";

import "./i18n";

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Suspense fallback="loading">
            <App />
          </Suspense>
          <CssBaseline />
        </BrowserRouter>
      </MuiThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
