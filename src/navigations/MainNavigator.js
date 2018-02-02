import { StackNavigator } from 'react-navigation';

import DefaultNavigator from './DefaultNavigator';

export default StackNavigator({
  Default: {
    screen: DefaultNavigator,
  }
});