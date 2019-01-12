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
    this.data = JSON.parse(localStorage.getItem("courseItem"));
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

  vibratePhone() {
    navigator.vibrate([1000]);
  }

  alertPopup() {
    var vibrate = setInterval(this.vibratePhone.bind(this), 1000);
    notification.alert('DONE!!! GO to the Next Step!').then((response) => {
    // Handle response.
      this.goNext();
      clearInterval(vibrate);
    });
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
    let nextCount = this.state.counter + 1;
    if(nextCount > this.data.program.length - 1) nextCount = this.data.program.length - 1;

    this.setState({
      time: {
        "h" : 0,
        "m" : 0,
        "s" : 0
      }, 
      seconds: 0,
      progress: 0,
      counter: nextCount
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
        <div className='center'>{this.data.title}</div>
      </Toolbar>
    );
  }

  handleChange(e) {
    this.setIndex(e.activeIndex);
  }

  setSeconds(index) {
    let time = Number(this.data.program[index].time) + 1;
    this.setState({
      seconds: time,
      entire: time
    });
  }

  render() {
    let programs = this.data.program;
    const imgStyle = {
      width: '100%'
    };

    const pCenter = {
      textAlign: 'center'
    };

    const buttonStyle = {
      width: '40px'
    };

    const iconSize = {
      default: 30,
      material: 28
    };
    
    const boldStyle = {
      color: 'red',
      fontSize: '20px'
    };

    var backButton = this.state.counter > 0 ? 
      <Button modifier='quiet' onClick={this.goBack.bind(this)} style={buttonStyle}><Icon icon='md-chevron-left' size={iconSize} /></Button> : 
      <Button modifier='quiet' disabled={true} onClick={this.goBack.bind(this)} style={buttonStyle}><Icon icon='md-chevron-left' size={iconSize} /></Button>;
    var nextButton = this.state.counter < 7 ?
      <Button modifier='quiet' onClick={this.goNext.bind(this)} style={buttonStyle}><Icon icon='md-chevron-right' size={iconSize} /></Button> : 
      <Button modifier='quiet' disabled={true} onClick={this.goNext.bind(this)} style={buttonStyle}><Icon icon='md-chevron-right' size={iconSize} /></Button>;
    var startStopButton = this.state.timerStarted == false ? 
     (<Button modifier='large' onClick={this.startTimer.bind(this)}>Play <Icon icon='md-play' /></Button>) : 
     (<Button modifier='large' onClick={this.stopTimer.bind(this)}>Stop <Icon icon='md-stop' /></Button>);
    var timerText = this.state.timerStarted == true ?  
      <p style={pCenter}><b style={boldStyle}>{this.state.time.s} Secs Left!</b></p> :
      <p style={pCenter}><b style={boldStyle}>Press Play button</b></p>;
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
        <img style={imgStyle} src={this.data.titleimg}/>
        <Carousel onPostChange={this.handleChange.bind(this)} index={this.state.counter} swipeable autoScroll overscrollable>
          {programs.map((item, index) => (
            <CarouselItem key={index}>
              <div style={{textAlign: 'center'}}>
                <h3>{programs[index].name}</h3>
                <div style={{
                  position: 'absolute',
                  left: '10px',
                  bottom: '45%'}}>
                {backButton}
                </div>
                <img style={imgStyle} src={programs[index].img}/>
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
