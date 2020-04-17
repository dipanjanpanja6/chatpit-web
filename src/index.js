import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from "@material-ui/core/styles";
import {createMuiTheme} from "@material-ui/core";
const theme = createMuiTheme({palette: {type: "light"}});
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>,
  document.getElementById('root')
);
serviceWorker.register();
