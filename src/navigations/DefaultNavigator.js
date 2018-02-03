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
    activeTintColor: '#E91E63',
    style: {
      // backgroundColor: '#252525',
    },
    labelStyle: {
      fontWeight: 'bold'
    },
    indicatorStyle: {
      backgroundColor: '#E91E63',
    }
  },
});
