import React from 'react';
import ReactDOM from 'react-dom';
import {Page, Button, Toolbar} from 'react-onsenui';
import {notification} from 'onsenui';
import {Navigator} from 'react-onsenui';

import Page1 from './Page1';

export default class App extends React.Component {
  renderPage(route, navigator) {
    const props = route.props || {};
    props.navigator = navigator;

    return React.createElement(route.component, props);
  }

  render() {
    return (<Navigator initialRoute={{component: Page1}} renderPage={this.renderPage} />);
  }
}
