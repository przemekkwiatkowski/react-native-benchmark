import {
  createDrawerNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import { DrawerContent } from '../shared/drawerContent';
import {
  headerStyle,
  headerLeftContainerStyle,
  headerRightContainerStyle,
  headerTitleStyle,
} from '../shared/theme/navigation';

import { CalendarNavigator } from './calendar/calendar.navigator';
import { OrganizationsNavigator } from './organizations/organizations.navigator';
import { TimeTrackerNavigator } from './timeTracker/timeTracker.navigator';
import { LoginNavigator } from './login/login.navigator';
import i18n from '../I18n';

import messages from './root.messages';

const PrimaryNavigator = createDrawerNavigator({
  calendar: {
    screen: CalendarNavigator,
    navigationOptions: {
      headerMode: 'screen',
      drawerLabel: i18n.t(messages.calendarDrawerTitle),
    },
  },
  timeTracker: {
    screen: TimeTrackerNavigator,
    navigationOptions: {
      headerMode: 'screen',
      drawerLabel: i18n.t(messages.timeTrackerDrawerTitle),
    },
  },
  organizations: {
    screen: OrganizationsNavigator,
    navigationOptions: {
      headerMode: 'screen',
      drawerLabel: i18n.t(messages.organizationsDrawerTitle),
    },
  },
}, {
  headerLayoutPreset: 'center',
  initialRouteName: 'calendar',
  drawerWidth: 300,
  contentComponent: DrawerContent,
  defaultNavigationOptions: {
    headerStyle,
    headerLeftContainerStyle,
    headerRightContainerStyle,
    headerTitleStyle,
  },
});

const AppNavigator = createSwitchNavigator({
  login: {
    screen: LoginNavigator,
    navigationOptions: {
      header: null,
    },
  },
  primary: {
    screen: PrimaryNavigator,
  },
}, {
  headerLayoutPreset: 'center',
  headerMode: 'none',
});

export default createAppContainer(AppNavigator);
