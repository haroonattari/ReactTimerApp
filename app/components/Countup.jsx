var React = require('react');
var Clock = require('Clock');
var Controls = require('Controls');

var Countup = React.createClass({
  getInitialState: function () {
    console.log('Countup getInitialState');
    return {
      count: 0,
      counterStatus: 'paused'
    };
  },
  componentDidUpdate: function (prevProps, prevState) {
    console.log('Countup componentDidUpdate');
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
    console.log('Countup componentWillUnmount');
    clearInterval(this.timer);
    this.timer = undefined;
  },
  startTimer: function () {
    console.log('Countup startTimer');
    this.timer = setInterval(() => {
      this.setState({
        count: this.state.count + 1
      });
    }, 1000);
  },
  handleSetCountup: function (seconds) {
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
    console.log('Countup render ');
    console.log({count});
    console.log({counterStatus});
    return (
      <div>
        <h1 className="page-title">Countup App</h1>
        <Clock totalSeconds={count}/>
        <Controls counterStatus={counterStatus} onStatusChange={this.handleStatusChange}/>
      </div>
    )
  }
});

module.exports = Countup;
