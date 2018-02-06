import { StackNavigator } from 'react-navigation';

import DefaultNavigator from './DefaultNavigator';
import CryptoSearchScreen from '../screens/CryptoSearch';
import CryptoDetailScreen from '../screens/CryptoDetail';

export default StackNavigator({
  Default: {
    screen: DefaultNavigator,
  },
  CryptoSearch: {
    screen: CryptoSearchScreen
  },
  CryptoDetail: {
    screen: CryptoDetailScreen
  }
}, {
  navigationOptions: {
    header: null,
  }
});