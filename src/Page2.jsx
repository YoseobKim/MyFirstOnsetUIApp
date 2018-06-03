import React from 'react';
import ReactDOM from 'react-dom';
import {Page, Button, Toolbar, BackButton, ProgressBar, Icon} from 'react-onsenui';
import {notification} from 'onsenui';

export default class Page2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      time: {}, 
      seconds: 61,
      progress: 0,
      entire: 61
    };
    this.timer = 0;
  }

  alertPopup() {
    notification.alert('DONE!!! GO to the Next Step!');
  }

  goBack() {
    this.stopTimer();

    this.setState({
      counter: this.state.counter - 1,
      time: 0,
      seconds: 0,
      progress: 0
    });
  }

  goNext() {
    this.stopTimer();
    this.setState({
      counter: this.state.counter + 1,
      time: 0,
      seconds: 0,
      progress: 0
    });
  }


  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  startTimer() {
    this.setSeconds(this.state.counter);
    if (this.timer == 0) {
      this.timer = setInterval(this.countDown.bind(this), 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    var seconds_ = this.state.seconds - 1;
    var entire_ = this.state.entire;
    this.setState({
      time: this.secondsToTime(seconds_),
      seconds: seconds_,
      progress: (entire_ - seconds_) / entire_ * 100
    });
    
    // Check if we're at zero.
    if (seconds_ == 0) {
      this.alertPopup();
      this.stopTimer();
    }
  }

  stopTimer() {
    clearInterval(this.timer);
    this.timer = 0;
  }

  renderToolbar() {
    return (
      <Toolbar>
        <BackButton className='left'></BackButton>
        <div className='center'>5 Mins Plank</div>
      </Toolbar>
    );
  }

  setSeconds(index) {
    switch(index) {
      case 0 :
      case 7 :
        this.setState({
          seconds: 61,
          entire: 61
        });
      return;
      default :
        this.setState({
          seconds: 31,
          entire: 31
        });
        return;
    }
  }

  render() {
    const programs = ['Basic Plank (1 min)', 
                      'Elbow Plank (30 secs)',
                      'Left leg raised Plank (30 secs)',
                      'Right leg raised Plank (30 secs)',
                      'Left side Plank (30 secs)',
                      'Right side Plank (30 secs)',
                      'Basic Plank (30 secs)',
                      'Elbow Plank (1 min)'];
    const images = ['img/1.png',
                    'img/2.png',
                    'img/3.png',
                    'img/3.png',
                    'img/4.png',
                    'img/4.png',
                    'img/5.png',
                    'img/6.png'];

    var backButton = this.state.counter > 0 ? 
      <Button modifier='quiet' onClick={this.goBack.bind(this)}>Go Back!</Button> : 
      <Button modifier='quiet' disabled='true' onClick={this.goBack.bind(this)}>Go Back!</Button>;
    var nextButton = this.state.counter < 7 ?
      <Button modifier='quiet' onClick={this.goNext.bind(this)}>Go Next!</Button> : 
      <Button modifier='quiet' disabled='true' onClick={this.goNext.bind(this)}>Go Next!</Button>;
    var startTimer = <Button onClick={this.startTimer.bind(this)}><Icon icon='md-play' /></Button>;
    var stopTimer = <Button onClick={this.stopTimer.bind(this)}><Icon icon='md-stop' /></Button>;

    var imgStyle = {
      width: '100%'
    };

    var pCenter = {
      textAlign: 'center'
    };

    return (
      <Page renderToolbar={this.renderToolbar.bind(this)}>
        <h3>Current Program : {programs[this.state.counter]}</h3>
        <img style={imgStyle} src='img/title.JPG'/>
        <img style={imgStyle} src={images[this.state.counter]}/>
        <ProgressBar value={this.state.progress} />
        <p style={pCenter}><b style={{color: 'red'}}>{this.state.time.s} Secs Left!</b></p>
        <p style={pCenter}>{startTimer} | {stopTimer}</p>
        <p style={pCenter}>{backButton} | {nextButton}</p>
      </Page>
    );
  }
}
