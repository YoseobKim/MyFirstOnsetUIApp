import React from 'react';
import ReactDOM from 'react-dom';
import {Page, Button, Toolbar, Card} from 'react-onsenui';
import {notification} from 'onsenui';

import Page2 from './Page2';

export default class Page1 extends React.Component {
  constructor(props) {
    super(props);

    this.data = require("./data.json");
  }

  pushPage(index) {
    localStorage.setItem("courseItem", JSON.stringify(this.data[index]));
    this.props.navigator.pushPage({component: Page2});
  }

  renderToolbar() {
    return (
      <Toolbar>
        <div className='center'>Plank Workouts!!!</div>
      </Toolbar>
    );
  }

  render() {
    const imgStyle = {
      width: '100%',
      maxHeight: '150px',
      objectFit: "cover"
    };
    const pCenter = {
      textAlign: 'center'
    };

    let content = [];

    for(let i = 0; i < this.data.length; i++) {
      let d = this.data[i];
      let item = (
        <Card key={"item-" + i}>
          <img style={imgStyle} src={d.img} />
          <p style={pCenter}>
            <Button modifier="large" onClick={this.pushPage.bind(this, i)}>{d.title}</Button>
          </p>
        </Card>
      );
      content.push(item);
    }

    return (
      <Page renderToolbar={this.renderToolbar}>
        {content}
      </Page>
    );
  }
}
