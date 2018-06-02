import React from 'react';
import ReactDOM from 'react-dom';
import {Page, Button, Toolbar, BackButton} from 'react-onsenui';
import {notification} from 'onsenui';

export default class Page2 extends React.Component {
  alertPopup() {
    notification.alert('This is an Onsen UI alert notification test.');
  }

  goBack() {
    this.props.navigator.popPage();
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className="left"><BackButton>Back</BackButton></div>
        <div className='center'>Onsen UI</div>
      </Toolbar>
    );
  }

  render() {
    return (
      <Page renderToolbar={this.renderToolbar}>
        <h3>My First OnsenUI Hybrid App</h3>
         <img src="http://images.all-free-download.com/images/graphicthumb/two_young_cats_189918.jpg"/>
        <div>Page2</div>
        <Button onClick={this.alertPopup}>Click Me!</Button>
        <Button onClick={this.goBack.bind(this)}>Go Back!</Button>
      </Page>
    );
  }
}
