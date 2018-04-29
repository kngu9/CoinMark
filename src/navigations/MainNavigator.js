import { StackNavigator } from 'react-navigation';

import DefaultNavigator from './DefaultNavigator';
import CryptoSearchScreen from '../screens/CryptoSearch';
import CryptoDetailScreen from '../screens/CryptoDetail';
import PortfolioDetailScreen from '../screens/PortfolioDetail';

export default StackNavigator({
  Default: {
    screen: DefaultNavigator,
  },
  CryptoSearch: {
    screen: CryptoSearchScreen
  },
  CryptoDetail: {
    screen: CryptoDetailScreen
  },
  PortfolioDetail: {
    screen: PortfolioDetailScreen
  }
}, {
  navigationOptions: {
    header: null,
  }
});