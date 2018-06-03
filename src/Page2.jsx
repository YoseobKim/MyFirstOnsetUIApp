import React from 'react';
import ReactDOM from 'react-dom';
import {Page, Button, Toolbar, BackButton} from 'react-onsenui';
import {notification} from 'onsenui';

export default class Page2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }

  alertPopup() {
    notification.alert('This is an Onsen UI alert notification test.');
  }

  goBack() {
    this.props.navigator.popPage();
  }

  goNext() {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  renderToolbar() {
    var title = 'Onsen UI ' + this.state.counter;
    return (
      <Toolbar>
        <BackButton className='left'>Back</BackButton>
        <div className='center'>{title}</div>
      </Toolbar>
    );
  }

  render() {
    var imgStyle = {
        width: '100%'
    };
    return (
      <Page renderToolbar={this.renderToolbar.bind(this)}>
        <h3>My First OnsenUI Hybrid App</h3>
        <img style={imgStyle} src="img/two_young_cats_189918.jpg"/>
        <div>Page2</div>
        <Button onClick={this.alertPopup}>Click Me!</Button>
        <Button onClick={this.goBack.bind(this)}>Go Back!</Button>
        <Button onClick={this.goNext.bind(this)}>Go Next!</Button>
      </Page>
    );
  }
}
