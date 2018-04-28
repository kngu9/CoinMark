import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import { Header, Left, Body, Right, Button, Title, List } from 'native-base';
import { connect } from "react-redux";
import { Ionicons } from '@expo/vector-icons';
import { Column as Col, Row } from 'react-native-flexbox-grid';
import moment from 'moment';

import { getTicker } from '../api/coinmarketcap';
import { updateCrypto } from '../actions/crypto';
import CryptoListItem from '../components/CryptoListItem';

class CryptoSearchScreen extends React.Component {
  state = {
    searchedText: '',
    currentView: 'percent',
    results: []
  };

  changedText (text) {
    // This is the handler for everytime a user types in something
    this.setState({searchedText: text}, () => {
      // Deconstructs the searched text out of the current state
      const { searchedText } = this.state;
      
      // Does a linear search in memory to find the substring that the user is looking for
      const results = this.props.crypto.data.filter((crypto) => {
        
        if (crypto.name.toLowerCase().indexOf(searchedText.toLowerCase()) > -1 ||
            crypto.symbol.toLowerCase().indexOf(searchedText.toLowerCase()) > -1)
            return crypto;
      });
      
      // Sets the results found
      this.setState({results});
    });
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

  async selectItem (item) {
    // Handler for when a user selects a crypto item
    this.props.navigation.navigate('CryptoDetail', {crypto: item});
  }

  renderCryptoItem({item}) {
    // Draws the individual crypto menu
    return (
      <CryptoListItem
        item={item}
        currentView={this.state.currentView}
        changeView={() => this.changeView()}
        onSelectItem={(item) => this.selectItem(item)}
      />
    );
  }

  render () {
    // Draws the main search page
    return (
      <View style={styles.container}>
        <View style={styles.searchMargin}>
          <Row
            size={12}
            style={styles.searchRow}
          >
            <Col sm={2} md={2} lg={2}>
              <Button style={{padding: 5}} transparent onPress={() => this.props.navigation.goBack()}>
                  <Ionicons name="ios-arrow-back" size={24}/>
              </Button>
            </Col>
            <Col sm={9} md={9} lg={9} style={{marginTop: 5}}>
              <TextInput
                placeholder="Search"
                style={styles.searchInput} 
                onChangeText={(text) => this.changedText(text)}
                autoCorrect={false}
                />
            </Col>
          </Row>
        </View>

        <View style={styles.cryptoList}>
          <FlatList
            keyExtractor={(item, index) => item.id}
            data={this.state.results}
            renderItem={(item) => this.renderCryptoItem(item)}
            showsVerticalScrollIndicator={false}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  searchRow: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'column'
  },
  searchMargin: {
    marginTop: 40,
    marginBottom: 20
  },
  searchInput: {
    height: 30,
    width: '100%',
    backgroundColor: '#ECECEC',
    padding: 5
  },
  cryptoList: {
    marginTop: 30,
    paddingHorizontal: 12,
    flex: 1,
    flexDirection: 'row'
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

export default connect(mapStateToProps, mapDispatchToProps)(CryptoSearchScreen);
