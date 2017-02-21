var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Timer = require('Timer');

describe('Timer', () => {
  it('should exist', () => {
    expect(Timer).toExist();
  });

  describe('handleSetTimer', () => {
    it('should set state to started and countup', (done) => {
      var countup = TestUtils.renderIntoDocument(<Timer/>);
      countup.handleSetTimer(10);

      expect(countup.state.count).toBe(10);
      expect(countup.state.counterStatus).toBe('started');

      setTimeout(() => {
        expect(countup.state.count).toBe(9);
        done();
      }, 1001)
    });

    it('should never set count less than zero', (done) => {
      var countup = TestUtils.renderIntoDocument(<Timer/>);
      countup.handleSetTimer(1);

      setTimeout(() => {
        expect(countup.state.count).toBe(0);
        done();
      }, 3001);
    });

    it('should pause countup on paused status', () => {
      var countup = TestUtils.renderIntoDocument(<Timer />);
      countup.handleSetTimer(3);
      countup.handleStatusChange('paused');

      setTimeout(() => {
        expect(countup.state.count).toBe(3);
        expect(countup.state.counterStatus).toBe('paused');
        done();
      }, 1001);
    });

    it('should reset count on stopped', () => {
      var countup = TestUtils.renderIntoDocument(<Timer />);
      countup.handleSetTimer(3);
      countup.handleStatusChange('stopped');

      setTimeout(() => {
        expect(countup.state.count).toBe(0);
        expect(countup.state.counterStatus).toBe('stopped');
        done();
      }, 1001);
    });
  });
});
