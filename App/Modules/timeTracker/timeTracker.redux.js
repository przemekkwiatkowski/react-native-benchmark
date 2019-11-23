import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import moment from 'moment';
import 'moment/locale/pl';

export const { Types: TimeTrackerTypes, Creators: TimeTrackerActions } = createActions(
  {
    start: ['benchmark'],
    stop: null,
    reset: null,
    addSample: ['desc'],
    saveResult: ['benchmarkId', 'result'],
  },
  { prefix: 'TIME_TRACKER/' }
);

const INITIAL_STATE = Immutable({
  isActive: false,
  benchmark: null,
  samples: [],
  startedAt: '',
});

const start = (state, benchmark) =>
  state.merge({
    isActive: true,
    benchmark: benchmark.benchmark,
    startedAt: moment()
      .locale('pl')
      .format('LLL'),
    samples: [],
  });

const stop = state =>
  state.merge({
    isActive: false,
  });

const addSample = (state, desc) => {
  return state.set('samples', state.samples.concat([{ saved: performance.now(), desc: desc }]));
};

const reset = () => INITIAL_STATE;

export const reducer = createReducer(INITIAL_STATE, {
  [TimeTrackerTypes.START]: start,
  [TimeTrackerTypes.STOP]: stop,
  [TimeTrackerTypes.ADD_SAMPLE]: addSample,
  [TimeTrackerTypes.RESET]: reset,
});
