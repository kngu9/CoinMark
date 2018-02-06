import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Header, Left, Body, Right, Button, Title, List } from 'native-base';
import { connect } from "react-redux";
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

import { getTicker } from '../api/coinmarketcap';
import { updateCrypto } from '../actions/crypto';
import CryptoListItem from '../components/CryptoListItem';

class HomeScreen extends React.Component {
  state = {
    isLoading: false,
    currentView: 'percent'
  };

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Ionicons name="md-home" size={32} color={tintColor} />
    ),
  };

  async componentDidMount () {
    await this.reloadData()
  }

  async selectItem (item) {
    this.props.navigation.navigate('CryptoDetail', {crypto: item});
  }

  renderCryptoItem({item}) {
    return (
      <CryptoListItem
        item={item}
        currentView={this.state.currentView}
        changeView={() => this.changeView()}
        onSelectItem={(item) => this.selectItem(item)}
      />
    );
  }

  changeView () {
    switch(this.state.currentView) {
      case 'percent':
        this.setState({currentView: 'money'});
        break;
      case 'money':
        this.setState({currentView: 'percent'});
        break;
      default:
        this.setState({currentView: 'percent'});
        break;
    }
  }

  async reloadData () {
    if (moment(this.props.crypto.lastReloaded).diff(new Date(), 'minutes') <= 5) {
      this.setState(
        {
          isLoading: true
        },
        async () => {
          let data = await getTicker();

          this.props.updateCrypto(data);

          this.setState({ isLoading: false });
        }
      );
    }
  }

  renderHeader () {
    return (
      <View style={styles.searchBar}>
      
      </View>
    );
  };

  render () {
    return (
      <View style={styles.container}>
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <Header>
            <Left>
            </Left>
            <Body>
              <Title>Home</Title>
            </Body>
            <Right>
              <Button transparent onPress={() => this.props.navigation.navigate('CryptoSearch')}>
              <Ionicons name="md-search" size={24}/>
              </Button>
            </Right>
          </Header>
          <View style={styles.cryptoList}>
            <FlatList
              refreshing={this.state.isLoading}
              onRefresh={() => this.reloadData()}
              keyExtractor={(item, index) => item.id}
              data={this.props.crypto.data}
              renderItem={(item) => this.renderCryptoItem(item)}
              showsVerticalScrollIndicator={false}
            >
            </FlatList>
          </View>
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  cryptoList: {
    paddingHorizontal: 12
  },
  cryptoItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)'
  },
  coinName: {
    fontSize: 16,
    color: '#333',
    fontWeight: "600"
  },
  coinSymbol: {
    fontSize: 12,
    color: '#7F7F7F'
  },
  cryptoItemStart: {
    paddingVertical: 5
  },
  cryptoItemCenter: {
    alignItems: 'center'
  },
  cryptoItemEnd: {
    alignItems: 'flex-end'
  },
  percentChange: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    paddingVertical: 5,
    borderRadius: 5
  },
  percentText: {
    color: 'white'
  }
});

function mapStateToProps (state) {
  return {
    crypto: state.crypto
  };
}

function mapDispatchToProps (dispatch) {
  return {
    updateCrypto: (newData) => dispatch(updateCrypto(newData))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);