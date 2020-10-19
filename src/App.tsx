import React from "react";
import { Provider } from "react-redux";
//import { combineReducers, createStore } from "redux";
//import { devToolsEnhancer } from "redux-devtools-extension";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core"
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Theme from "./Theme";
import PageRegister from "./pages/PageRegister";

const App = () => (
  <BrowserRouter>  
    <Theme>
      <Switch>
        <Route path="/register" component={PageRegister} />                
      </Switch>    
    </Theme>  
  </BrowserRouter>
)

export default App;
