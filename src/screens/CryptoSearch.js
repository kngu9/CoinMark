import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Header, Left, Body, Right, Button, Title, List } from 'native-base';
import { connect } from "react-redux";
import { Ionicons } from '@expo/vector-icons';
import { Column as Col, Row } from 'react-native-flexbox-grid';
import moment from 'moment';

import { getTicker } from '../api/coinmarketcap';
import { updateCrypto } from '../actions/crypto';

class CryptoSearchScreen extends React.Component {
  render () {
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
              <TextInput placeholder="Search" style={styles.searchInput} />
            </Col>
          </Row>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  searchRow: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 20,
    flexDirection: 'column'
  },
  searchMargin: {
    backgroundColor: '#F8F8F8',
    marginTop: 40
  },
  searchInput: {
    height: 30,
    width: '100%',
    backgroundColor: '#ECECEC',
    padding: 5,
    
  }
});

function mapStateToProps (state) {
  return {
  };
}

function mapDispatchToProps (dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CryptoSearchScreen);