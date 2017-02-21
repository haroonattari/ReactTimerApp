var React = require('react');
var Clock = require('Clock');
var Controls = require('Controls');

var Timer = React.createClass({
  getInitialState: function () {
    return {
      count: 0,
      counterStatus: 'paused'
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
      this.setState({
        count: this.state.count + 1
      });
    }, 1000);
  },
  handleSetTimer: function (seconds) {
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
    return (
      <div>
        <h1 className="page-title">Timer App</h1>
        <Clock totalSeconds={count}/>
        <Controls counterStatus={counterStatus} onStatusChange={this.handleStatusChange}/>
      </div>
    )
  }
});

module.exports = Timer;
