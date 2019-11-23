import { createSelector } from 'reselect';
import { prop } from 'ramda';

const selectTimeTrackerDomain = prop('timeTracker');

export const selectIsActive = createSelector(
  selectTimeTrackerDomain,
  prop('isActive')
);

export const selectBenchmark = createSelector(
  selectTimeTrackerDomain,
  prop('benchmark')
);

export const selectStartedAt = createSelector(
  selectTimeTrackerDomain,
  prop('startedAt')
);

export const selectEndedAt = createSelector(
  selectTimeTrackerDomain,
  prop('endedAt')
);

export const selectSamples = createSelector(
  selectTimeTrackerDomain,
  prop('samples')
);
