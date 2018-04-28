import { TabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/Home';
import PortfolioScreen from '../screens/Portfolio';

export default TabNavigator({
  Home: {
    screen: HomeScreen
  },
  Portfolio: {
    screen: PortfolioScreen
  }
}, {
  animationEnabled: true,
  tabBarOptions: {
    showLabel: false,
    activeTintColor: '#040D14',
    style: {
      backgroundColor: '#FBFBFB',
    },
    labelStyle: {
      fontWeight: 'bold'
    },
    indicatorStyle: {
      backgroundColor: '#535353',
    }
  },
});
