import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { connect } from "react-redux";
import moment from 'moment';

import { getTicker } from '../api/coinmarketcap';
import { updateCrypto, setLoading } from '../actions/crypto';

class HomeScreen extends React.Component {
  state = {
    isLoading: false
  };

  async componentDidMount () {
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

  renderCryptoItem({item}) {
    return (
      <View style={styles.cryptoItem}>
        <Text style={styles.coinName}>
          {item.name}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cryptoList}>
          <FlatList
            keyExtractor={(item, index) => item.id}
            data={this.props.crypto.data}
            renderItem={(item) => this.renderCryptoItem(item)}
          >
          </FlatList>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040D14'
  },
  cryptoList: {
    marginTop: 20,
    paddingHorizontal: 5
  },
  cryptoItem: {
    paddingVertical: 30,
    borderBottomWidth: 0.5,
    borderBottomColor: '#D6D7DA'
  },
  coinName: {
    fontSize: 14,
    color: '#D6D7DA',
    fontWeight: "600"
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