import React from 'react';
import ReactDOM from 'react-dom';
import {Page, Button, Toolbar, BackButton, ProgressBar, Icon, Carousel, CarouselItem} from 'react-onsenui';
import {notification} from 'onsenui';

var counter = 0;

export default class Page2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {
        "h" : 0,
        "m" : 0,
        "s" : 0
      }, 
      seconds: 0,
      progress: 0,
      entire: 61,
      counter: 0,
      timerStarted: false
    };
    this.timer = 0;
  }
  
  getInitialState() {
    return {
      time: {
        "h" : 0,
        "m" : 0,
        "s" : 0
      }, 
      seconds: 0,
      progress: 0,
      entire: 61,
      counter: 0,
      timerStarted: false
    };
  }

  alertPopup() {
    notification.alert('DONE!!! GO to the Next Step!');
  }

  goBack() {
    this.stopTimer();

    this.setState({
      time: {
        "h" : 0,
        "m" : 0,
        "s" : 0
      },
      seconds: 0,
      progress: 0,
      counter: this.state.counter - 1
    });
  }

  goNext() {
    this.stopTimer();

    this.setState({
      time: {
        "h" : 0,
        "m" : 0,
        "s" : 0
      }, 
      seconds: 0,
      progress: 0,
      counter: this.state.counter + 1
    });
  }

  setIndex(index) {
    this.stopTimer();
    this.setState({
      time: {
        "h" : 0,
        "m" : 0,
        "s" : 0
      }, 
      seconds: 0,
      progress: 0,
      counter: index
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
      this.setState({timerStarted: true});
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
    if(this.timer != 0) {
      clearInterval(this.timer);
      this.timer = 0;
      this.setState({timerStarted: false});
    }
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

    var imgStyle = {
      width: '100%'
    };

    var pCenter = {
      textAlign: 'center'
    };

    var buttonStyle = {
      width: '40px'
    };

    var iconSize = {
      default: 30,
      material: 28
    };

    var backButton = this.state.counter > 0 ? 
      <Button modifier='quiet' onClick={this.goBack.bind(this)} style={buttonStyle}><Icon icon='md-chevron-left' size={iconSize} /></Button> : 
      <Button modifier='quiet' disabled='true' onClick={this.goBack.bind(this)} style={buttonStyle}><Icon icon='md-chevron-left' size={iconSize} /></Button>;
    var nextButton = this.state.counter < 7 ?
      <Button modifier='quiet' onClick={this.goNext.bind(this)} style={buttonStyle}><Icon icon='md-chevron-right' size={iconSize} /></Button> : 
      <Button modifier='quiet' disabled='true' onClick={this.goNext.bind(this)} style={buttonStyle}><Icon icon='md-chevron-right' size={iconSize} /></Button>;
    var startStopButton = this.state.timerStarted == false ? 
     (<Button modifier='large' onClick={this.startTimer.bind(this)}>Play <Icon icon='md-play' /></Button>) : 
     (<Button modifier='large' onClick={this.stopTimer.bind(this)}>Stop <Icon icon='md-stop' /></Button>);
    var timerText = this.state.timerStarted == true ?  
      <p style={pCenter}><b style={{color: 'red'}}>{this.state.time.s} Secs Left!</b></p> :
      <p style={pCenter}><b style={{color: 'red'}}>Press Play button</b></p>;
    var carouselCursor = (<div style={{
          textAlign: 'center',
          fontSize: '20px',
          position: 'absolute',
          left: '0px',
          right: '0px',
        }}>
          {programs.map((item, index) => (
            <span key={index} style={{cursor: 'pointer'}} onClick={this.setIndex.bind(this, index)}>
              {this.state.counter === index ? '\u25CF' : '\u25CB'}
            </span>
          ))}
        </div>);

    return (
      <Page renderToolbar={this.renderToolbar.bind(this)}>
        <img style={imgStyle} src='img/title.JPG'/>
        <Carousel index={this.state.counter} autoScroll overscrollable>
          {programs.map((item, index) => (
            <CarouselItem key={index}>
              <div style={{textAlign: 'center'}}>
                <h3>{programs[index]}</h3>
                <div style={{
                  position: 'absolute',
                  left: '10px',
                  bottom: '45%'}}>
                {backButton}
                </div>
                <img style={imgStyle} src={images[index]}/>
                <div style={{
                  position: 'absolute',
                  right: '10px',
                  bottom: '45%'}}>
                {nextButton}
                </div>
                <ProgressBar value={this.state.progress} />
                {timerText}
                {startStopButton}
              </div>
            </CarouselItem>
          ))}
        </Carousel>
        {carouselCursor}
      </Page>
    );
  }
}
