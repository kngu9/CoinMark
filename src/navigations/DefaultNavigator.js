import { TabNavigator } from 'react-navigation';

import HomeScreen from '../screens/Home';

export default TabNavigator({
  Home: {
    screen: HomeScreen,
  }
}, {
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});
