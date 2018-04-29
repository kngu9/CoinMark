import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Header, Left, Body, Right, Button, Title, List } from 'native-base';
import { connect } from "react-redux";
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

import { getTicker } from '../api/coinmarketcap';
import CryptoListItem from '../components/CryptoListItem';

class PortfolioDetail extends React.Component {
  state = {
    isLoading: false,
    currentView: 'percent'
  };

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Ionicons name="md-home" size={32} color={tintColor} />
    ),
  };

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
    // This controls what is the next state for the ticker view
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

  render () {
    let { name, coins } = this.props.navigation.state.params.data;

    const data = coins.map((symbol) => {
      return this.props.crypto.data.find((item) => {
        if (item.symbol == symbol) {
          console.log(item);
          return item;
        }
      })
    });

    console.log(data);

    return (
      <View style={styles.container}>
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <Header style={{ backgroundColor: 'white'}}>
            <Left>
              <Button style={{padding: 5}} transparent onPress={() => this.props.navigation.goBack()}>
                <Ionicons name="ios-arrow-back" size={24}/>
              </Button>
            </Left>
            <Body>
              <Title style={{color: 'black'}}>{name}</Title>
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
              keyExtractor={(item, index) => index}
              data={data}
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioDetail);
