import React from 'react';
import { StyleSheet, View, TextInput, Modal, TouchableHighlight, FlatList } from 'react-native';
import { Header, Left, Body, Right, Button, Title, List, Subtitle, Text } from 'native-base';
import { connect } from "react-redux";
import { Ionicons } from '@expo/vector-icons';

import NewPortfolioModal from '../components/NewPortfolioModal';
import CryptoListItem from '../components/CryptoListItem';

import { addPortfolio } from '../actions/portfolio';

class PortfolioScreen extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Ionicons name="md-list" size={32} color={tintColor} />
    ),
  };

  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  addPortfolio(name) {
    this.props.addPortfolio(name);
    this.setModalVisible(false);
  }

  selectItem (item) {
    this.props.navigation.navigate('PortfolioDetail', {data: item});
  }

  renderCryptoItem({item}) {
    let percentage = item.coins.map((symbol) => {
      return this.props.crypto.data.find((item) => {
        if (item.symbol == symbol) {
          return item;
        }
      });
    });

    let aggregate = 0;

    if (item.coins.length > 0) {
      percentage.forEach((item) => {
        aggregate += parseFloat(item.percent_change_24h)
      })

      aggregate /= item.coins.length;
    }

    return (
      <CryptoListItem
        item={item}
        percentage={aggregate}
        currentView={this.state.currentView}
        changeView={() => this.changeView()}
        onSelectItem={(item) => this.selectItem(item)}
        longPress={(item) => console.log(item)}
      />
    );
  }

  render () {
    return (
      <View style={styles.container}>
        <Header>
          <Left />
          <Body>
            <Title>
              Portfolio
            </Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.setModalVisible(true)}>
              <Ionicons name="md-add" size={24}/>
            </Button>
          </Right>
        </Header>

        <View style={styles.cryptoList}>
            <FlatList
              refreshing={this.state.isLoading}
              keyExtractor={(item, index) => index}
              data={this.props.portfolio.portfolios}
              renderItem={(item) => this.renderCryptoItem(item)}
              showsVerticalScrollIndicator={false}
            >
            </FlatList>
        </View>
        
        <NewPortfolioModal
          close={() => this.setModalVisible(false)}
          add={(name) => this.addPortfolio(name)}
          visible={this.state.modalVisible}
        />
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
});

function mapStateToProps (state) {
  return {
    portfolio: state.portfolio,
    crypto: state.crypto
  };
}

function mapDispatchToProps (dispatch) {
  return {
    addPortfolio: (name) => dispatch(addPortfolio(name))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioScreen);