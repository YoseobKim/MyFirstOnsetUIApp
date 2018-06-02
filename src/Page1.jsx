import React from 'react';
import ReactDOM from 'react-dom';
import {Page, Button, Toolbar} from 'react-onsenui';
import {notification} from 'onsenui';

import Page2 from './Page2';

export default class Page1 extends React.Component {
  pushPage() {
    this.props.navigator.pushPage({component: Page2});
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className='center'>Onsen UI</div>
      </Toolbar>
    );
  }

  render() {
    return (
      <Page renderToolbar={this.renderToolbar}>
        <h3>My First OnsenUI Hybrid App</h3>
        <div>Page1</div>
        <Button onClick={this.pushPage.bind(this)}>Click Me!</Button>
      </Page>
    );
  }
}
