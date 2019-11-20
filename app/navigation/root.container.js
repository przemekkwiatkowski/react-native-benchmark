import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { connect } from 'react-redux';
import ReduxNavigation from './reduxNavigation';

import { Container } from './root.styles';
import SnackbarContainer from '../shared/snackbarContainer/snackbarContainer.container';
import { SubscriptionOverlay } from '../shared/subscriptionOverlay/subscriptionOverlay.container';

class RootContainer extends Component {
  render() {
    return (
      <Container>
        <SubscriptionOverlay />
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <ReduxNavigation />
        <SnackbarContainer />
      </Container>
    );
  }
}

const mapDispatchToProps = () => ({});

export default connect(null, mapDispatchToProps)(RootContainer);
