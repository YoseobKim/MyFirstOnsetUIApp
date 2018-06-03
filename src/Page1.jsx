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
        <div className='center'>5 Mins Plank</div>
      </Toolbar>
    );
  }

  render() {
    var imgStyle = {
      width: '100%'
    };
    var pCenter = {
      textAlign: 'center'
    };

    return (
      <Page renderToolbar={this.renderToolbar}>
        <img style={imgStyle} src="img/maxresdefault.jpg" />
        <p style={pCenter}>
          <Button modifier='large' onClick={this.pushPage.bind(this)}>LET&apos;S DO THIS!!</Button>
        </p>
      </Page>
    );
  }
}
