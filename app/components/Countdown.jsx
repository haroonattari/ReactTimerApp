var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Controls = require('Controls');

var Countdown = React.createClass({
  getInitialState: function () {
    return {
      count: 0,
      counterStatus: 'stopped'
    };
  },
  componentDidUpdate: function (prevProps, prevState) {
    if (this.state.counterStatus !== prevState.counterStatus) {
      switch (this.state.counterStatus) {
        case 'started':
          this.startTimer();
          break;
        case 'stopped':
          this.setState({count: 0});
        case 'paused':
          clearInterval(this.timer);
          this.timer = undefined;
          break;
      }
    }
  },
  componentWillUnmount: function () {
    clearInterval(this.timer);
    this.timer = undefined;
  },
  startTimer: function () {
    this.timer = setInterval(() => {
      var newCount = this.state.count -1;
      this.setState({
        count: newCount >= 0 ? newCount : 0
      });

      if (newCount === 0) {
        this.setState({counterStatus: 'stopped'});
      }

    }, 1000);
  },
  handleSetCountdown: function (seconds) {
    this.setState({
      count: seconds,
      counterStatus: 'started'
    });
  },
  handleStatusChange: function (newStatus) {
    this.setState({counterStatus: newStatus})
  },
  render: function() {
    var {count, counterStatus} = this.state;
    var renderControlArea = () => {
      if (counterStatus !== 'stopped') {
        return <Controls counterStatus={counterStatus} onStatusChange={this.handleStatusChange}/>
      } else {
        return <CountdownForm onSetCountdown={this.handleSetCountdown}/>
      }
    }
    return (
      <div>
        <h1 className="page-title">Countdown App</h1>
        <Clock totalSeconds={count}/>
        {renderControlArea()}
      </div>
    )
  }
});

module.exports = Countdown;
