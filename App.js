import React from "react";
import { Provider } from 'react-redux';
import store from "./src/store/configureStore";
import AppContainer from './src/container/AppContainer';

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
