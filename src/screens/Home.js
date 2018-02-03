import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { connect } from "react-redux";
import { Ionicons } from '@expo/vector-icons';
import { Column as Col, Row } from 'react-native-flexbox-grid';
import { LineChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import moment from 'moment';

import { getTicker } from '../api/coinmarketcap';
import { updateCrypto, setLoading } from '../actions/crypto';

class HomeScreen extends React.Component {
  state = {
    isLoading: false
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
    const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ];
    const percentChanged = parseFloat(item.percent_change_24h);

    if (percentChanged < 0.0) {
      percentColor = '#F45532';
    } else if (percentChanged > 0.0) {
      percentColor = '#30CC9A';
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
          <Col sm={4} md={4} lg={3} style={styles.cryptoItemCenter}>
            <LineChart
                    style={{
                      height: 40,
                      width: 100,
                      padding: 5,
                      flex: 1,
                      justifyContent: 'center'
                    }}
                    dataPoints={ data }
                    fillColor={ percentColor }
                    shadowOffset={3}
                    svg={{
                        stroke: percentColor,
                    }}
                    shadowSvg={{
                        stroke: percentColor,
                        strokeWidth: 3,
                    }}
                    contentInset={ { top: 20, bottom: 20 } }
                    curve={shape.curveLinear}
                    showGrid={false}
                />
          </Col>
          <Col sm={4} md={4} lg={3} style={styles.cryptoItemEnd}>
            <View style={[styles.percentChange, {backgroundColor: percentColor}]}>
              <Text style={styles.percentText}>
                {item.percent_change_24h}
              </Text>
            </View>
          </Col>
        </Row>
      </View>
    );
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
    marginTop: 20,
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
    width: 60,
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
    updateCrypto: (newData) => dispatch(updateCrypto(newData)),
    setLoading: (loading) => dispatch(setLoading(loading))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);