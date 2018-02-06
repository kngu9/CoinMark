import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Column as Col, Row } from 'react-native-flexbox-grid';

export default class CryptoListItem extends React.PureComponent {
  render () {
    let { item, currentView, changeView, onSelectItem } = this.props;

    let percentColor = '#CCCCCC';
    const percentChanged = parseFloat(item.percent_change_24h);

    if (percentChanged < 0.0) {
      percentColor = '#F45532';
    } else if (percentChanged > 0.0) {
      percentColor = '#30CC9A';
    }

    let coinValue = `${item.percent_change_24h}%`;

    if (currentView === 'money') {
      coinValue = `$${(Math.round(100*parseFloat(item.price_usd))/100).toFixed(2)}`;
    }

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.cryptoItem}
        onPress={() => onSelectItem(item)}
      >
        <Row size={12}>
          <Col sm={6} md={6} lg={6} style={styles.cryptoItemStart}>
            <Text style={styles.coinName}>
              { item.name }
            </Text>
            <Text style={styles.coinSymbol}>
              { item.symbol }
            </Text>
          </Col>
          <Col sm={6} md={6} lg={6} style={styles.cryptoItemEnd}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.percentChange, {backgroundColor: percentColor}]}
              onPress={() => changeView()}>
              <Text style={styles.percentText}>
                { coinValue }
              </Text>
            </TouchableOpacity>
          </Col>
        </Row>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
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
})