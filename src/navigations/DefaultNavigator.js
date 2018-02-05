import { TabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/Home';

export default TabNavigator({
  Home: {
    screen: HomeScreen
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
