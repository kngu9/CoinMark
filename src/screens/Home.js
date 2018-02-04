import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import { Ionicons } from '@expo/vector-icons';
import { Column as Col, Row } from 'react-native-flexbox-grid';
import * as shape from 'd3-shape'
import moment from 'moment';

import { getTicker } from '../api/coinmarketcap';
import { updateCrypto } from '../actions/crypto';

class HomeScreen extends React.Component {
  state = {
    isLoading: false,
    currentView: 'percent'
  };

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Ionicons name="ios-home" size={32} color={tintColor} />
    ),
  };

  async componentDidMount () {
    await this.reloadData()
  }

  renderCryptoItem({item}) {
    let percentColor = '#CCCCCC';
    const percentChanged = parseFloat(item.percent_change_24h);

    if (percentChanged < 0.0) {
      percentColor = '#F45532';
    } else if (percentChanged > 0.0) {
      percentColor = '#30CC9A';
    }

    let coinValue = `${item.percent_change_24h} %`;

    if (this.state.currentView === 'money') {
      coinValue = `$${Math.round(100*parseFloat(item.price_usd))/100}`;
    }

    return (
      <View style={styles.cryptoItem}>
        <Row size={12}>
          <Col sm={4} md={4} lg={3} style={styles.cryptoItemStart}>
            <Text style={styles.coinName}>
              {item.name}
            </Text>
            <Text style={styles.coinSymbol}>
              {item.symbol}
            </Text>
          </Col>
          <Col sm={4} md={2} lg={3} style={styles.cryptoItemCenter}>

          </Col>
          <Col sm={4} md={6} lg={3} style={styles.cryptoItemEnd}>
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.percentChange, {backgroundColor: percentColor}]}
              onPress={() => this.changeView()}>
              <Text style={styles.percentText}>
                { coinValue }
              </Text>
            </TouchableOpacity>
          </Col>
        </Row>
      </View>
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

  render() {
    return (
      <View style={styles.container}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cryptoList: {
    marginTop: 25,
    paddingHorizontal: 5
  },
  cryptoItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 0.5,
    borderBottomColor: '#040D14'
  },
  coinName: {
    fontSize: 13,
    color: '#040D14',
    fontWeight: "600"
  },
  coinSymbol: {
    fontSize: 10,
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