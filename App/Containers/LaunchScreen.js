import React, { Component } from 'react'
import { createStructuredSelector } from 'reselect';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { BatteryTestScreen as BatteryTest } from './BatteryTestScreen/BatteryTestScreen';
import { RenderingTestScreen as RenderingTest } from './RenderingTestScreen/RenderingTestScreen';
import { GeolocationTestScreen as GeolocationTest } from './GeolocationTestScreen/GeolocationTestScreen';
import { renderWhenTrue } from '../Utils/rendering';
import { TimeTrackerActions } from '../Modules/timeTracker/timeTracker.redux'
import { Container, Button, ButtonText, ButtonsContainer } from './Styles/LaunchScreenStyles'
import {
  selectBenchmark,
  selectIsActive,
  selectSamples,
  selectStartedAt,
} from '../Modules/timeTracker/timeTracker.selectors'


class LaunchScreen extends Component {
  static propTypes = {
    start: PropTypes.func.isRequired,
    stop: PropTypes.func.isRequired,
    addSample: PropTypes.func.isRequired,
    saveResult: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
    benchmark: PropTypes.string,
    startedAt: PropTypes.string,
    samples: PropTypes.array,
  };

  navigate = route => this.props.navigation.navigate(route);

  startBenchmark = benchmark => {
    this.props.start(benchmark);
  };

  handleSaveResult = () => {
    const { benchmark, startedAt, samples } = this.props;
    this.props.saveResult(benchmark, { startedAt, samples });
  };

  handleTestButton = benchmark => {
    const { isActive, stop } = this.props;

    isActive ? stop() : this.startBenchmark(benchmark);
  };

  renderBatteryTest = renderWhenTrue(() => {
    const { stop, addSample} = this.props;
    return <BatteryTest stop={stop} saveResult={this.handleSaveResult} addSample={addSample} />;
  });

  renderRenderingTest = renderWhenTrue(() => {
    const { stop, addSample} = this.props;
    return <RenderingTest stop={stop} saveResult={this.handleSaveResult} addSample={addSample} />;
  });

  renderGeolocationTest = renderWhenTrue(() => {
    const { stop, addSample} = this.props;
    return <GeolocationTest stop={stop} saveResult={this.handleSaveResult} addSample={addSample} />;
  });

  renderButtons = renderWhenTrue(() => {
    return (
      <ButtonsContainer>
        <Button onPress={() => this.handleTestButton('battery')}>
          <ButtonText>
            Battery test
          </ButtonText>
        </Button>
        <Button onPress={() => this.handleTestButton('rendering')}>
          <ButtonText>
            Rendering test
          </ButtonText>
        </Button>
        <Button onPress={() => this.handleTestButton('geolocation')}>
          <ButtonText>
            Geolocation test
          </ButtonText>
        </Button>
      </ButtonsContainer>
    );
  });

  render () {
    const { isActive, benchmark } = this.props;
    return (
      <Container>
        {this.renderButtons(!isActive)}
        {this.renderBatteryTest(isActive && benchmark === 'battery')}
        {this.renderRenderingTest(isActive && benchmark === 'rendering')}
        {this.renderGeolocationTest(isActive && benchmark === 'geolocation')}
      </Container>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  isActive: selectIsActive,
  benchmark: selectBenchmark,
  startedAt: selectStartedAt,
  samples: selectSamples,
});

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      start: TimeTrackerActions.start,
      stop: TimeTrackerActions.stop,
      addSample: TimeTrackerActions.addSample,
      saveResult: TimeTrackerActions.saveResult,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen);
