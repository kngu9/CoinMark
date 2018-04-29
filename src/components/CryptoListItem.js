import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Column as Col, Row } from 'react-native-flexbox-grid';

export default class CryptoListItem extends React.PureComponent {
  render () {
    // Deconstruct props to get parameters passed
    let { item, currentView, changeView, onSelectItem } = this.props;
    let percent = item.percent_change_24h ? item.percent_change_24h : 0.0;
    let percentColor = '#CCCCCC';

    const percentChanged = this.props.percentage ? this.props.percentage : parseFloat(percent);
    
    if (this.props.percentage)
      percent = this.props.percentage;
    // If percentage changed is negative, then change the color to red else green
    if (percentChanged < 0.0) {
      percentColor = '#F45532';
    } else if (percentChanged > 0.0) {
      percentColor = '#30CC9A';
    }
    
    // Construct the string
    let coinValue = `${percent}%`;
    
    // If the current view is money, change view to USD
    if (currentView === 'money') {
      coinValue = `$${(Math.round(100*parseFloat(item.price_usd))/100).toFixed(2)}`;
    }

    const symbol = item.symbol ?
      <Text style={styles.coinSymbol}>
        { item.symbol }
      </Text>
      :
      <View/>;
    
    // Draw the component
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.cryptoItem}
        onPress={() => onSelectItem(item)}
        onLongPress={() => this.props.longPress(item)}
      >
        <Row size={12}>
          <Col sm={6} md={6} lg={6} style={styles.cryptoItemStart}>
            <Text style={styles.coinName}>
              { item.name }
            </Text>
            { symbol }
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
