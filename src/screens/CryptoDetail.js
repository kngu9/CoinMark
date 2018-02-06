import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Header, Left, Body, Right, Button, Title, List, Subtitle } from 'native-base';
import { connect } from "react-redux";
import { Ionicons } from '@expo/vector-icons';

class CryptoDetailScreen extends React.Component {
  render () {
    let { name, symbol } = this.props.navigation.state.params.crypto;

    return (
      <View style={styles.container}>
        <Header>
          <Left>
            <Button style={{padding: 5}} transparent onPress={() => this.props.navigation.goBack()}>
              <Ionicons name="ios-arrow-back" size={24}/>
            </Button>
          </Left>
          <Body>
            <Title>
              { name }
            </Title>
            <Subtitle>
              { symbol }
            </Subtitle>
          </Body>
          <Right />
        </Header>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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

export default connect(mapStateToProps, mapDispatchToProps)(CryptoDetailScreen);