import { StackNavigator } from 'react-navigation';

import DefaultNavigator from './DefaultNavigator';
import CryptoSearchScreen from '../screens/CryptoSearch';

export default StackNavigator({
  Default: {
    screen: DefaultNavigator,
  },
  CryptoSearch: {
    screen: CryptoSearchScreen
  }
}, {
  navigationOptions: {
    header: null,
  }
});